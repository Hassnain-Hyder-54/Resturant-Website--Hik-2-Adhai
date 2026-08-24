import type { Metadata } from 'next';
import App from '@/src/App';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3001'),
  title: {
    default: 'HiIK-2-ADHAI-JAMSHORO | Rawati Food in Jamshoro',
    template: '%s | HiIK-2-ADHAI-JAMSHORO',
  },
  description:
    'A full-stack Jamshoro restaurant experience for Pakistani BBQ, karahi, biryani, reservations and online ordering.',
  openGraph: {
    title: 'HiIK-2-ADHAI-JAMSHORO',
    description: 'Rawati food, BBQ, karahi and Sindhi dastarkhwan dining in Jamshoro.',
    images: [{ url: '/images/social-preview.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HiIK-2-ADHAI-JAMSHORO',
    description: 'Rawati food, BBQ, karahi and Sindhi dastarkhwan dining in Jamshoro.',
    images: ['/images/social-preview.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><App>{children}</App></body>
    </html>
  );
}
