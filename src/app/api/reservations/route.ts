import { env } from 'cloudflare:workers';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';
import { reservationSchema } from '@/src/modules/reservations/reservationValidation';

export async function POST(request: Request) {
  try {
    const parsed = reservationSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid reservation details.' }, { status: 400 });
    }

    const value = parsed.data;
    const reservationId = `RSV-${nanoid(7).toUpperCase()}`;
    await env.DB.prepare(
      `INSERT INTO reservations
        (id, customer_name, phone, email, reservation_date, reservation_time, guest_count, occasion, seating, notes, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
    ).bind(
      reservationId, value.customerName, value.phone, value.email || null,
      value.reservationDate, value.reservationTime, value.guestCount,
      value.occasion, value.seating, value.notes, Date.now(),
    ).run();

    return NextResponse.json({ reservationId, status: 'pending' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'The reservation service is temporarily unavailable.' }, { status: 500 });
  }
}
