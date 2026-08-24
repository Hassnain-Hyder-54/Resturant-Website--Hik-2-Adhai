import MenuList from '@/src/modules/menu/MenuList';
import MainLayout from '@/src/layouts/MainLayout';
import PageHero from '@/src/components/PageHero';

export default function Menu() {
  return (
    <MainLayout>
      <PageHero
        eyebrow="Cooked fresh in Jamshoro"
        title="The complete dastarkhwan"
        description="Karahi by the kilogram, charcoal BBQ, rice, tandoor, desserts and drinks. Add dishes to your order as you browse."
        image="/images/menu/seekh-kebab.jpg"
      />
      <section className="menu-page-section">
        <div className="container"><MenuList /></div>
      </section>
    </MainLayout>
  );
}
