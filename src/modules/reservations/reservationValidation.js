import { z } from 'zod';

const phonePattern = /^[+0-9][0-9\s-]{8,16}$/;

export const reservationSchema = z.object({
  customerName: z.string().trim().min(2, 'Enter your full name').max(80),
  phone: z.string().trim().regex(phonePattern, 'Enter a valid phone number'),
  email: z.string().trim().email('Enter a valid email').max(120).or(z.literal('')),
  reservationDate: z.string().min(1, 'Choose a date'),
  reservationTime: z.string().min(1, 'Choose a time'),
  guestCount: z.coerce.number().int().min(1).max(30),
  occasion: z.string().trim().max(60),
  seating: z.string().trim().max(60),
  notes: z.string().trim().max(500),
});
