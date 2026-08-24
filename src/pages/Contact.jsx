import { Clock3, MapPin, MessageCircle, Phone } from 'lucide-react';
import MainLayout from '@/src/layouts/MainLayout';
import PageHero from '@/src/components/PageHero';
import ContactForm from '@/src/modules/contact/ContactForm';
import { RESTAURANT } from '@/src/utils/constants';

export default function Contact() {
  return (
    <MainLayout>
      <PageHero eyebrow="Contact" title="Talk to the restaurant" description="Questions about catering, a large booking, an order or your visit? Reach the team here." />
      <section className="contact-section container">
        <div className="contact-panel">
          <p className="eyebrow">HiIK-2 in Jamshoro</p>
          <h2 className="section-heading">We are close by</h2>
          <p>Call during opening hours for urgent table and order questions. Use the message form for catering and event details.</p>
          <a href={`tel:${RESTAURANT.phone.replace(/\s/g, '')}`}><Phone size={20} /><span><strong>Call us</strong>{RESTAURANT.phone}</span></a>
          <div><MapPin size={20} /><span><strong>Find us</strong>{RESTAURANT.location}</span></div>
          <div><Clock3 size={20} /><span><strong>Opening hours</strong>{RESTAURANT.hours}</span></div>
          <a href="https://wa.me/923062229369" target="_blank" rel="noreferrer"><MessageCircle size={20} /><span><strong>WhatsApp</strong>Message the restaurant</span></a>
        </div>
        <ContactForm />
      </section>
    </MainLayout>
  );
}
