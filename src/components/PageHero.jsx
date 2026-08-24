import Image from 'next/image';

export default function PageHero({ eyebrow, title, description, image = '/images/gallery/interior.jpg' }) {
  return (
    <section className="page-hero">
      <Image src={image} alt="" aria-hidden="true" width={1800} height={900} sizes="100vw" priority />
      <div className="container page-hero-content">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <span>{description}</span>
      </div>
    </section>
  );
}
