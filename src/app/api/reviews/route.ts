import { env } from 'cloudflare:workers';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const reviewSchema = z.object({
  customerName: z.string().trim().min(2).max(80),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(10).max(600),
});

export async function GET() {
  try {
    const result = await env.DB.prepare(
      `SELECT id, customer_name AS customerName, rating, comment, created_at AS createdAt
       FROM reviews WHERE approved = 1 ORDER BY created_at DESC LIMIT 12`,
    ).all();
    return NextResponse.json({ reviews: result.results });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(request: Request) {
  try {
    const parsed = reviewSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Check your name, rating and review.' }, { status: 400 });
    const reviewId = `REV-${nanoid(7).toUpperCase()}`;
    await env.DB.prepare(
      `INSERT INTO reviews (id, customer_name, rating, comment, approved, created_at)
       VALUES (?, ?, ?, ?, 0, ?)`,
    ).bind(reviewId, parsed.data.customerName, parsed.data.rating, parsed.data.comment, Date.now()).run();
    return NextResponse.json({ reviewId, status: 'pending' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'The review service is temporarily unavailable.' }, { status: 500 });
  }
}
