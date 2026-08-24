'use client';

import { CalendarCheck, ClipboardList, LogOut, Mail, WalletCards } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatPrice } from '@/src/utils/formatPrice';

export default function AdminDashboard({ user, data, signOutPath }) {
  const cards = [
    { label: 'Orders', value: data.orderCount, icon: ClipboardList },
    { label: 'Reservations', value: data.reservationCount, icon: CalendarCheck },
    { label: 'New messages', value: data.messageCount, icon: Mail },
    { label: 'Recorded sales', value: formatPrice(data.salesTotal), icon: WalletCards },
  ];

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div><span>Restaurant management</span><h1>Good to see you, {user.displayName}</h1></div>
        <a className="button-outline" href={signOutPath}><LogOut size={18} /> Sign out</a>
      </header>
      <section className="admin-metrics" aria-label="Restaurant totals">
        {cards.map(({ label, value, icon: Icon }) => <article key={label}><Icon size={21} /><span>{label}</span><strong>{value}</strong></article>)}
      </section>
      <section className="admin-grid">
        <article className="admin-panel chart-panel">
          <div><span>Last seven days</span><h2>Order activity</h2></div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.orderActivity} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ded7cb" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f2ebdf' }} />
                <Bar dataKey="orders" fill="#174f3b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="admin-panel">
          <div><span>Kitchen queue</span><h2>Recent orders</h2></div>
          <div className="admin-list">
            {data.recentOrders.length ? data.recentOrders.map((order) => (
              <div key={order.id}><span><strong>{order.id}</strong>{order.customerName}</span><span>{formatPrice(order.total)}<small>{order.status}</small></span></div>
            )) : <p>No orders have arrived yet.</p>}
          </div>
        </article>
        <article className="admin-panel admin-wide">
          <div><span>Front of house</span><h2>Upcoming table requests</h2></div>
          <div className="reservation-table" role="table">
            {data.recentReservations.length ? data.recentReservations.map((reservation) => (
              <div role="row" key={reservation.id}><strong>{reservation.customerName}</strong><span>{reservation.reservationDate}</span><span>{reservation.reservationTime}</span><span>{reservation.guestCount} guests</span><small>{reservation.status}</small></div>
            )) : <p>No reservation requests have arrived yet.</p>}
          </div>
        </article>
      </section>
    </main>
  );
}
