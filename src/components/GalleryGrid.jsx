const galleryItems = [
  { src: '/images/gallery/interior.jpg', alt: 'Warm dining room with hanging lights', className: 'gallery-wide' },
  { src: '/images/menu/seekh-kebab.jpg', alt: 'Seekh kebabs over charcoal', className: 'gallery-tall' },
  { src: '/images/menu/chicken-karahi.jpg', alt: 'Freshly cooked chicken karahi' },
  { src: '/images/menu/sindhi-biryani.jpg', alt: 'Sindhi biryani ready to serve' },
  { src: '/images/menu/tandoori-chai.jpg', alt: 'Traditional clay cups of chai' },
  { src: '/images/menu/gajjar-halwa.jpg', alt: 'Gajjar halwa in serving bowls', className: 'gallery-wide' },
];

export default function GalleryGrid() {
  return (
    <div className="gallery-grid">
      {galleryItems.map((item) => (
        <figure className={item.className || ''} key={item.src}>
          <Image src={item.src} alt={item.alt} width={1200} height={900} sizes="(max-width: 620px) 100vw, 50vw" />
        </figure>
      ))}
    </div>
  );
}
import Image from 'next/image';
