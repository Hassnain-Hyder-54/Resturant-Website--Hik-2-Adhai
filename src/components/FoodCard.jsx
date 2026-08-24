'use client';

import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { toast } from 'sonner';
import { formatPrice } from '@/src/utils/formatPrice';
import { useCartStore } from '@/src/store/cartStore';

export default function FoodCard({ item, priority = false }) {
  const addItem = useCartStore((state) => state.addItem);

  function handleAdd() {
    addItem(item);
    toast.success(`${item.name} added to your cart`);
  }

  return (
    <motion.article className="food-card" whileHover={{ y: -5 }} transition={{ duration: 0.18 }}>
      <Image src={item.image} alt={item.name} width={900} height={650} sizes="(max-width: 620px) 100vw, (max-width: 920px) 50vw, 33vw" priority={priority} />
      <div className="food-card-body">
        <div className="food-card-meta">
          <span>{item.category}</span>
          <span>{item.spice} spice</span>
        </div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="food-card-footer">
          <span className="price">{formatPrice(item.price)}</span>
          <button className="button" type="button" onClick={handleAdd} aria-label={`Add ${item.name} to cart`}>
            <Plus size={17} /> Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
