'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ReviewCard from '@/src/components/ReviewCard';
import { reviewsData } from './reviewsData';

export default function ReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });

  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="section-topline">
          <div>
            <p className="eyebrow">Around our tables</p>
            <h2 className="section-heading" id="reviews-heading">Guests say it best</h2>
          </div>
          <div className="carousel-actions">
            <button className="icon-button" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous review"><ArrowLeft size={19} /></button>
            <button className="icon-button" onClick={() => emblaApi?.scrollNext()} aria-label="Next review"><ArrowRight size={19} /></button>
          </div>
        </div>
        <div className="embla" ref={emblaRef}>
          <div className="embla-track">
            {reviewsData.map((review) => <div className="embla-slide" key={review.id}><ReviewCard review={review} /></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
