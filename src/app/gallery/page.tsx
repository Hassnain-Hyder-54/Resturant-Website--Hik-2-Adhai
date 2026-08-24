import type { Metadata } from 'next';
import Gallery from '@/src/pages/Gallery';

export const metadata: Metadata = { title: 'Gallery', description: 'Explore the food, restaurant and Jamshoro dining experience.' };

export default function GalleryPage() { return <Gallery />; }
