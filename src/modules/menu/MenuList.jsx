'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import MenuCard from '@/src/components/MenuCard';
import MenuFilter from './MenuFilter';
import { menuItems } from './menuData';

export default function MenuList() {
  const categories = ['All', ...new Set(menuItems.map((item) => item.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const filteredItems = useMemo(() => menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const search = query.trim().toLowerCase();
    const matchesQuery = !search || `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(search);
    return matchesCategory && matchesQuery;
  }), [activeCategory, query]);

  return (
    <>
      <MenuFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        query={query}
        onQueryChange={setQuery}
      />
      <div className="menu-result-count">Showing {filteredItems.length} dishes</div>
      <motion.div className="food-grid menu-grid" layout>
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MenuCard item={item} priority={index === 0} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {!filteredItems.length && <div className="empty-result"><h2>No dish found</h2><p>Try a different name or category.</p></div>}
    </>
  );
}
