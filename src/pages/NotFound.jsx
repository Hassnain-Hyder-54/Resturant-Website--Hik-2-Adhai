import Link from 'next/link';
import MainLayout from '@/src/layouts/MainLayout';

export default function NotFound() {
  return (
    <MainLayout>
      <section className="not-found container"><span>404</span><h1>This table is not on our floor plan.</h1><p>The page may have moved, but the kitchen is still open.</p><Link className="button" href="/">Return home</Link></section>
    </MainLayout>
  );
}
