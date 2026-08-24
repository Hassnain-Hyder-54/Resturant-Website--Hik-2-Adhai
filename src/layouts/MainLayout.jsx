import Footer from '@/src/components/Footer';
import Navbar from '@/src/components/Navbar';
import WhatsAppButton from '@/src/components/WhatsAppButton';

export default function MainLayout({ children, headerVariant = 'inner' }) {
  return (
    <>
      <Navbar variant={headerVariant} />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
