import FoodCard from './FoodCard';

export default function MenuCard({ item, priority = false }) {
  return <FoodCard item={item} priority={priority} />;
}
