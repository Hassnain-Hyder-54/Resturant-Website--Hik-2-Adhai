import type { Metadata } from 'next';
import Reservation from '@/src/pages/Reservation';

export const metadata: Metadata = { title: 'Reservations', description: 'Request a table for family dining, birthdays and group events in Jamshoro.' };

export default function ReservationPage() { return <Reservation />; }
