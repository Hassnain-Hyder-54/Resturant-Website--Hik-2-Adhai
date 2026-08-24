import type { Metadata } from 'next';
import Contact from '@/src/pages/Contact';

export const metadata: Metadata = { title: 'Contact', description: 'Contact HiIK-2-ADHAI-JAMSHORO for catering, bookings, orders and feedback.' };

export default function ContactPage() { return <Contact />; }
