import { Clock3, Instagram, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { NAV_LINKS, RESTAURANT } from '@/src/utils/constants';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image className="brand-mark" src="/images/logo.png" alt="" width={96} height={96} />
          <h2>{RESTAURANT.name}</h2>
          <p>Center of Rawati Foods in Jamshoro.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <nav className="footer-links" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
            <a href="/contact">Contact</a>
          </nav>
        </div>
        <div>
          <h3>Visit</h3>
          <p><MapPin size={17} /> {RESTAURANT.location}</p>
          <p><Clock3 size={17} /> {RESTAURANT.hours}</p>
          <a className="footer-contact" href={`tel:${RESTAURANT.phone.replace(/\s/g, '')}`}>
            <Phone size={17} /> {RESTAURANT.phone}
          </a>
        </div>
        <div>
          <h3>Follow the kitchen</h3>
          <p>Fresh dishes, event tables and late-night specials from Jamshoro.</p>
          <a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <Instagram size={18} /> Instagram
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 {RESTAURANT.name}</span>
        <a href="/admin">Restaurant management</a>
      </div>
    </footer>
  );
}
