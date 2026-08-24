'use client';

import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { formatPrice } from '@/src/utils/formatPrice';
import { useCartStore } from '@/src/store/cartStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, setQuantity, removeItem, clearCart } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const [customer, setCustomer] = useState({ customerName: '', phone: '', orderType: 'pickup', notes: '' });
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function submitOrder(event) {
    event.preventDefault();
    if (!items.length) return;
    setSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...customer, items: items.map(({ id, quantity }) => ({ id, quantity })) }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Order could not be placed.');
      toast.success(`Order ${result.orderId} received — ${formatPrice(result.total)}`);
      clearCart();
      setCustomer({ customerName: '', phone: '', orderType: 'pickup', notes: '' });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="drawer-layer" role="presentation">
      <button className="drawer-backdrop" onClick={closeCart} aria-label="Close cart" />
      <aside className="cart-drawer" aria-label="Your order" aria-modal="true" role="dialog">
        <div className="drawer-header">
          <div><span>Your order</span><h2>{items.length ? `${items.length} selected dishes` : 'Cart is empty'}</h2></div>
          <button className="icon-button" onClick={closeCart} aria-label="Close cart"><X size={20} /></button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart"><ShoppingBag size={35} /><p>Add a dish from the menu to start your order.</p><a className="button" href="/menu" onClick={closeCart}>Browse menu</a></div>
          ) : items.map((item) => (
            <article className="cart-item" key={item.id}>
              <Image src={item.image} alt="" width={112} height={112} sizes="72px" />
              <div><h3>{item.name}</h3><span>{formatPrice(item.price)}</span>
                <div className="quantity-control">
                  <button onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name}`}><Minus size={15} /></button>
                  <strong>{item.quantity}</strong>
                  <button onClick={() => setQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name}`}><Plus size={15} /></button>
                </div>
              </div>
              <button className="remove-item" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={17} /></button>
            </article>
          ))}
        </div>
        {items.length > 0 && (
          <form className="cart-checkout" onSubmit={submitOrder}>
            <div className="cart-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div>
            <input required minLength="2" maxLength="80" placeholder="Your name" value={customer.customerName} onChange={(e) => setCustomer({ ...customer, customerName: e.target.value })} />
            <input required pattern="[+0-9][0-9\s-]{8,16}" placeholder="Phone number" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
            <select value={customer.orderType} onChange={(e) => setCustomer({ ...customer, orderType: e.target.value })}>
              <option value="pickup">Pickup from restaurant</option>
              <option value="dine-in">Prepare for dine-in</option>
            </select>
            <textarea maxLength="300" rows="2" placeholder="Order notes (optional)" value={customer.notes} onChange={(e) => setCustomer({ ...customer, notes: e.target.value })} />
            <button className="button" type="submit" disabled={submitting}>{submitting ? 'Placing order...' : 'Place order'}</button>
          </form>
        )}
      </aside>
    </div>
  );
}
