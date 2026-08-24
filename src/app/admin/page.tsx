import { env } from 'cloudflare:workers';
import AdminDashboard from '@/src/components/AdminDashboard';
import { chatGPTSignOutPath, requireChatGPTUser } from '@/src/app/chatgpt-auth';

export const dynamic = 'force-dynamic';

type CountRow = { count: number };
type SalesRow = { total: number | null };

export default function AdminPage() {
  return <AdminContent />;
}

async function AdminContent() {
  const user = await requireChatGPTUser('/admin');
  const data = await loadDashboard();
  return <AdminDashboard user={user} data={data} signOutPath={chatGPTSignOutPath('/')} />;
}

async function loadDashboard() {
  try {
    const [ordersResult, reservationsResult, messagesResult, salesResult, recentOrdersResult, recentReservationsResult, activityResult] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) AS count FROM orders').first<CountRow>(),
      env.DB.prepare('SELECT COUNT(*) AS count FROM reservations').first<CountRow>(),
      env.DB.prepare("SELECT COUNT(*) AS count FROM contact_messages WHERE status = 'new'").first<CountRow>(),
      env.DB.prepare('SELECT COALESCE(SUM(total), 0) AS total FROM orders').first<SalesRow>(),
      env.DB.prepare('SELECT id, customer_name AS customerName, total, status FROM orders ORDER BY created_at DESC LIMIT 6').all(),
      env.DB.prepare('SELECT id, customer_name AS customerName, reservation_date AS reservationDate, reservation_time AS reservationTime, guest_count AS guestCount, status FROM reservations ORDER BY created_at DESC LIMIT 8').all(),
      env.DB.prepare("SELECT strftime('%Y-%m-%d', created_at / 1000, 'unixepoch') AS orderDay, COUNT(*) AS orders FROM orders WHERE created_at >= ? GROUP BY orderDay ORDER BY orderDay ASC").bind(Date.now() - 6 * 86_400_000).all(),
    ]);

    const activityMap = new Map((activityResult.results as Array<{ orderDay: string; orders: number }>).map((row) => [row.orderDay, row.orders]));
    const orderActivity = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(Date.now() - (6 - index) * 86_400_000);
      const key = date.toISOString().slice(0, 10);
      return { day: date.toLocaleDateString('en-PK', { weekday: 'short' }), orders: activityMap.get(key) ?? 0 };
    });

    return {
      orderCount: ordersResult?.count ?? 0,
      reservationCount: reservationsResult?.count ?? 0,
      messageCount: messagesResult?.count ?? 0,
      salesTotal: salesResult?.total ?? 0,
      recentOrders: recentOrdersResult.results,
      recentReservations: recentReservationsResult.results,
      orderActivity,
    };
  } catch {
    return {
      orderCount: 0, reservationCount: 0, messageCount: 0, salesTotal: 0,
      recentOrders: [], recentReservations: [],
      orderActivity: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => ({ day, orders: 0 })),
    };
  }
}
