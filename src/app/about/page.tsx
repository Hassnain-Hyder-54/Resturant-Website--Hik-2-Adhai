import type { Metadata } from 'next';
import About from '@/src/pages/About';

export const metadata: Metadata = { title: 'Our Story', description: 'Meet the Jamshoro restaurant built around rawati food, fire and shared tables.' };

export default function AboutPage() { return <About />; }
