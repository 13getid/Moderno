import * as Icons from 'lucide-react'
import { stats, recentOrders } from '../data/dashboardStats'

const statusStyle = {
  delivered:  "bg-green-100 text-green-700",
  processing: "bg-yellow-100 text-yellow-700",
  shipped:    "bg-blue-100 text-blue-700",
}

function getIcon(name) {
  const Icon = Icons[name]
  return Icon ? <Icon size={22} /> : null
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-ink-light p-8">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Dashboard</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((s) => (
          <div key={s.id} className="bg-white dark:bg-ink-light rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-stone-500 dark:text-stone-400">{s.label}</p>
              <span className="text-[#8B6C42]">{getIcon(s.icon)}</span>
            </div>
            <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{s.value}</p>
            {/* FIX 1 — added missing } after the closing backtick */}
            <p className={`text-xs mt-1 ${s.positive ? 'text-green-600' : 'text-red-500'}`}>
              {s.change}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-ink-light rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-700">
          <h2 className="text-sm font-semibold text-stone-800 dark:text-stone-100">Recent Orders</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-stone-50 dark:bg-ink-light text-xs text-stone-500 dark:text-stone-400 uppercase">
            <tr>
              {['Order', 'Customer', 'Product', 'Amount', 'Status'].map(h => (
                <th key={h} className="px-6 py-3 text-left tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-700">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-stone-50 dark:hover:bg-ink-light">
                <td className="px-6 py-4 font-mono text-stone-700 dark:text-stone-300">{order.id}</td>
                <td className="px-6 py-4 text-stone-800 dark:text-stone-100">{order.customer}</td>
                <td className="px-6 py-4 text-stone-600 dark:text-stone-300">{order.product}</td>
                <td className="px-6 py-4 font-semibold">{order.amount}</td>
                <td className="px-6 py-4">
                  {/* FIX 2 — same fix, added missing } after closing backtick */}
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyle[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}