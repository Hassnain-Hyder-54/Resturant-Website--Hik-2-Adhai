'use client';

import { Search } from 'lucide-react';
import clsx from 'clsx';

export default function MenuFilter({ categories, activeCategory, onCategoryChange, query, onQueryChange }) {
  return (
    <div className="menu-filter">
      <label className="menu-search">
        <Search size={18} />
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search dishes" aria-label="Search menu" />
      </label>
      <div className="category-tabs" role="tablist" aria-label="Menu categories">
        {categories.map((category) => (
          <button
            className={clsx(activeCategory === category && 'active')}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            onClick={() => onCategoryChange(category)}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
