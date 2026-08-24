import { env } from 'cloudflare:workers';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';
import { contactSchema } from '@/src/modules/contact/contactValidation';

export async function POST(request: Request) {
  try {
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid message.' }, { status: 400 });
    const value = parsed.data;
    const messageId = `MSG-${nanoid(7).toUpperCase()}`;
    await env.DB.prepare(
      `INSERT INTO contact_messages
        (id, customer_name, email, phone, subject, message, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'new', ?)`,
    ).bind(messageId, value.customerName, value.email, value.phone || null, value.subject, value.message, Date.now()).run();
    return NextResponse.json({ messageId }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'The message service is temporarily unavailable.' }, { status: 500 });
  }
}
