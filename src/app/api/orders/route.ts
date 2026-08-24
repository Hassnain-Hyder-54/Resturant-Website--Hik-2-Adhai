import { env } from 'cloudflare:workers';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getChatGPTUser } from '@/src/app/chatgpt-auth';
import { menuItems } from '@/src/modules/menu/menuData';

const orderSchema = z.object({
  customerName: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^[+0-9][0-9\s-]{8,16}$/),
  orderType: z.enum(['pickup', 'dine-in']),
  notes: z.string().trim().max(300),
  items: z.array(z.object({ id: z.string().max(80), quantity: z.number().int().min(1).max(20) })).min(1).max(30),
});

export async function POST(request: Request) {
  try {
    const parsed = orderSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Check the order and customer details.' }, { status: 400 });

    const submittedItems = parsed.data.items.map((entry) => {
      const menuItem = menuItems.find((item) => item.id === entry.id);
      return menuItem ? { ...menuItem, quantity: entry.quantity } : null;
    });
    if (submittedItems.some((item) => !item)) {
      return NextResponse.json({ error: 'One of the selected dishes is no longer available.' }, { status: 400 });
    }

    const verifiedItems = submittedItems.filter((item): item is NonNullable<typeof item> => Boolean(item));
    const total = verifiedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderId = `HJ-${nanoid(7).toUpperCase()}`;
    const user = await getChatGPTUser();
    const statements = [
      env.DB.prepare(
        `INSERT INTO orders
          (id, customer_name, phone, order_type, notes, total, status, user_id, created_at)
         VALUES (?, ?, ?, ?, ?, ?, 'received', ?, ?)`,
      ).bind(orderId, parsed.data.customerName, parsed.data.phone, parsed.data.orderType, parsed.data.notes, total, user?.userId ?? null, Date.now()),
      ...verifiedItems.map((item) => env.DB.prepare(
        `INSERT INTO order_items
          (id, order_id, menu_item_id, item_name, unit_price, quantity)
         VALUES (?, ?, ?, ?, ?, ?)`,
      ).bind(nanoid(), orderId, item.id, item.name, item.price, item.quantity)),
    ];
    await env.DB.batch(statements);

    return NextResponse.json({ orderId, total, status: 'received' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'The order service is temporarily unavailable.' }, { status: 500 });
  }
}
