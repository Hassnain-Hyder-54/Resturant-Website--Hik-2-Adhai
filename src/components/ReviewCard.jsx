import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }, (_, index) => <Star size={17} fill="currentColor" key={index} />)}
      </div>
      <blockquote>“{review.quote}”</blockquote>
      <div>
        <strong>{review.name}</strong>
        <span>{review.occasion}</span>
      </div>
    </article>
  );
}
