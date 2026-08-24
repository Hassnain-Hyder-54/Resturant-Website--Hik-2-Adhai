import { z } from 'zod';

export const contactSchema = z.object({
  customerName: z.string().trim().min(2, 'Enter your name').max(80),
  email: z.string().trim().email('Enter a valid email').max(120),
  phone: z.string().trim().max(30),
  subject: z.string().trim().min(3, 'Tell us what this is about').max(100),
  message: z.string().trim().min(10, 'Please add a little more detail').max(1200),
});
