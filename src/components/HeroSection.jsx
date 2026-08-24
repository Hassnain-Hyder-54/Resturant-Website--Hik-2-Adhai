import { Clock3, MapPin, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import { RESTAURANT } from '@/src/utils/constants';

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        className="hero-image"
        src="/images/hero-food.jpg"
        alt="Warm restaurant dining room prepared for guests"
        width={1800}
        height={1200}
        sizes="100vw"
        priority
      />
      <div className="container hero-content">
        <div>
          <p className="hero-kicker"><UtensilsCrossed size={17} /> Rawati food, served in Jamshoro</p>
          <h1 id="hero-title" aria-label={RESTAURANT.name}>
            <span>HiIK-2-</span><span>ADHAI-</span><span>JAMSHORO</span>
          </h1>
          <p className="hero-copy">
            Fire-led BBQ, honest karahi and generous Sindhi dastarkhwan dining,
            made for family tables and late-night Jamshoro gatherings.
          </p>
          <div className="hero-actions">
            <a className="button" href="/menu">Explore the Menu</a>
            <a className="button-outline" href="/reservation">Reserve Your Table</a>
          </div>
          <div className="hero-meta">
            <span><MapPin size={16} /> Jamshoro, Sindh</span>
            <span><Clock3 size={16} /> {RESTAURANT.hours}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
