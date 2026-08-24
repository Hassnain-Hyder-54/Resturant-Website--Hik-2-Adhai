import { Clock3, MapPin, Phone } from 'lucide-react';
import BookingForm from '@/src/components/BookingForm';
import MainLayout from '@/src/layouts/MainLayout';
import PageHero from '@/src/components/PageHero';
import { RESTAURANT } from '@/src/utils/constants';

export default function Reservation() {
  return (
    <MainLayout>
      <PageHero eyebrow="Reservations" title="Your table is waiting" description="Tell us when you are coming and what the occasion needs. We will call to confirm your table." image="/images/gallery/interior.jpg" />
      <section className="reservation-section container">
        <div className="reservation-details">
          <p className="eyebrow">Before you arrive</p>
          <h2 className="section-heading">Easy plans, properly arranged</h2>
          <p>For groups above 12, wedding BBQ or a private family setup, call us so the team can prepare the right space and menu.</p>
          <div className="contact-list">
            <span><MapPin size={19} /><strong>Address</strong>{RESTAURANT.location}</span>
            <span><Clock3 size={19} /><strong>Hours</strong>{RESTAURANT.hours}</span>
            <span><Phone size={19} /><strong>Phone</strong>{RESTAURANT.phone}</span>
          </div>
        </div>
        <BookingForm />
      </section>
    </MainLayout>
  );
}
