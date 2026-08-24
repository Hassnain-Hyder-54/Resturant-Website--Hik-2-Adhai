import { Flame, HeartHandshake, Leaf } from 'lucide-react';
import Image from 'next/image';
import MainLayout from '@/src/layouts/MainLayout';
import PageHero from '@/src/components/PageHero';

export default function About() {
  return (
    <MainLayout>
      <PageHero eyebrow="Our story" title="Jamshoro hospitality, cooked over fire" description="A family restaurant shaped by the open kitchen, the shared platter and the unhurried dastarkhwan." />
      <section className="story-section container">
        <div className="story-copy">
          <p className="eyebrow">Rooted here</p>
          <h2 className="section-heading">A restaurant made for gathering</h2>
          <p>HiIK-2-ADHAI-JAMSHORO brings together Sindhi generosity and the bold flavours of the northern dera. We cook karahi when it is ordered, keep the tandoor moving, and let charcoal do the work on our BBQ.</p>
          <p>The room is arranged for the way Jamshoro eats: students sharing a late meal, families celebrating, colleagues meeting over lunch and travellers stopping beside the Indus Highway.</p>
        </div>
        <Image src="/images/gallery/interior.jpg" alt="Warm restaurant interior with prepared tables" width={1200} height={900} sizes="(max-width: 920px) 100vw, 50vw" />
      </section>
      <section className="values-band">
        <div className="container values-grid">
          <article><Flame size={28} /><h3>Fire first</h3><p>Charcoal, tandoor and karahi cooking bring depth without hiding the ingredients.</p></article>
          <article><Leaf size={28} /><h3>Fresh daily</h3><p>Herbs, yoghurt, ginger, chillies and marinades are prepared by the kitchen each day.</p></article>
          <article><HeartHandshake size={28} /><h3>Made to share</h3><p>Generous platters and thoughtful service keep the whole table included.</p></article>
        </div>
      </section>
    </MainLayout>
  );
}
