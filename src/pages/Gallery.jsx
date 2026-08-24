import GalleryGrid from '@/src/components/GalleryGrid';
import MainLayout from '@/src/layouts/MainLayout';
import PageHero from '@/src/components/PageHero';

export default function Gallery() {
  return (
    <MainLayout>
      <PageHero eyebrow="Inside the dera" title="Food, fire and full tables" description="A look at the dishes and spaces that shape an evening with us." image="/images/menu/chicken-karahi.jpg" />
      <section className="gallery-section container">
        <div className="section-topline"><div><p className="eyebrow">From our kitchen</p><h2 className="section-heading">The Jamshoro table</h2></div><p>Fresh batches, live charcoal and a dining room ready for family occasions.</p></div>
        <GalleryGrid />
      </section>
    </MainLayout>
  );
}
