import { ArrowRight, CalendarDays, UsersRound } from 'lucide-react';
import Image from 'next/image';
import FoodCard from '@/src/components/FoodCard';
import HeroSection from '@/src/components/HeroSection';
import MainLayout from '@/src/layouts/MainLayout';
import { menuItems } from '@/src/modules/menu/menuData';
import ReviewsSection from '@/src/modules/reviews/ReviewsSection';

export default function Home() {
  const featuredItems = menuItems.filter((item) => item.featured);

  return (
    <MainLayout headerVariant="overlay">
      <HeroSection />
      <section className="container home-intro" aria-labelledby="welcome-heading">
        <div>
          <p className="eyebrow">Center of Rawati Foods in Jamshoro</p>
          <h2 className="section-heading" id="welcome-heading">Come hungry.</h2>
        </div>
        <p>
          From the first hiss of charcoal to the last cup of tandoori chai,
          every table is arranged around generous portions, fresh cooking and
          the easy hospitality Jamshoro is known for.
        </p>
      </section>
      <section className="featured-menu" aria-labelledby="featured-heading">
        <div className="container">
          <div className="section-topline">
            <div>
              <p className="eyebrow">Dera favourites</p>
              <h2 className="section-heading" id="featured-heading">Most ordered</h2>
            </div>
            <a className="text-link" href="/menu">
              View complete menu <ArrowRight size={17} />
            </a>
          </div>
          <div className="food-grid">
            {featuredItems.map((item) => <FoodCard item={item} key={item.id} />)}
          </div>
        </div>
      </section>
      <section className="home-story">
        <div className="container">
          <Image src="/images/gallery/interior.jpg" alt="Restaurant dining room with warm pendant lighting" width={1200} height={900} sizes="(max-width: 920px) 100vw, 50vw" />
          <div>
            <p className="eyebrow">A room for every gathering</p>
            <h2 className="section-heading">Stay for the whole evening</h2>
            <p>Drop in after university, bring the family for dinner, or let us arrange a full dastarkhwan for the occasion. The food is generous and the pace is yours.</p>
            <a className="text-link" href="/about">Read our story <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>
      <ReviewsSection />
      <section className="event-band">
        <div className="container event-band-grid">
          <div><p className="eyebrow">Catering and celebrations</p><h2>Bring the Dera table to your event.</h2><p>Wedding BBQ, corporate lunch and family dastarkhwan menus built around your guest count.</p></div>
          <div className="event-stat"><UsersRound size={25} /><strong>20–300</strong><span>guest plans</span></div>
          <a className="button" href="/contact"><CalendarDays size={19} /> Plan an event</a>
        </div>
      </section>
    </MainLayout>
  );
}
