'use client';

import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { NAV_LINKS, RESTAURANT } from '@/src/utils/constants';
import { useCartStore } from '@/src/store/cartStore';

export default function Navbar({ variant = 'overlay' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={clsx('site-header', variant === 'inner' && 'inner-header')}>
      <div className="container nav-shell">
        <Link className="brand" href="/" aria-label={`${RESTAURANT.name} home`}>
          <Image className="brand-mark" src="/images/logo.png" alt="" width={96} height={96} priority />
          <span className="brand-name">{RESTAURANT.name}</span>
        </Link>
        <nav className={clsx('nav-links', mobileOpen && 'mobile-nav-open')} aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <Link href={link.href} key={link.href} onClick={() => setMobileOpen(false)}>{link.label}</Link>
          ))}
          <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
        </nav>
        <div className="nav-actions">
          <button className="icon-button cart-button" onClick={openCart} aria-label={`Open cart with ${itemCount} items`}>
            <ShoppingBag size={19} />
            {itemCount > 0 && <span>{itemCount}</span>}
          </button>
          <Link className="button nav-book" href="/reservation">Book a Table</Link>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
