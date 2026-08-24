import type { Metadata } from 'next';
import Menu from '@/src/pages/Menu';

export const metadata: Metadata = { title: 'Menu', description: 'Browse karahi, BBQ, biryani, desserts and drinks, then place your order online.' };

export default function MenuPage() { return <Menu />; }
