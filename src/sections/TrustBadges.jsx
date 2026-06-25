import * as Icons from 'lucide-react'
import { badges } from '../data/trustBadges'

function getIcon(name) {
  const key = name
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join('')
  const Icon = Icons[key]
  return Icon ? <Icon size={24} /> : null
}

export default function TrustBadges() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-stone-200 dark:border-stone-700 bg-cream dark:bg-ink">
      {badges.map((badge) => (
        <div key={badge.id} className="flex items-center gap-3 p-5 border-r border-stone-200 dark:border-stone-700 last:border-r-0">
          <span className="text-brown shrink-0">{getIcon(badge.icon)}</span>
          <div>
            <p className="text-xs font-semibold text-stone-800 dark:text-stone-100">{badge.title}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{badge.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  )
}