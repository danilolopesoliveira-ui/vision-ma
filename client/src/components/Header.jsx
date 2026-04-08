import { useLocation } from 'react-router-dom'
import { Search, Bell } from 'lucide-react'

const pageTitles = {
  '/': 'Dashboard',
  '/radar': 'Radar de Deals',
  '/pipeline': 'Pipeline Ativo',
  '/mercado': 'Mercado de M&A',
  '/multiplos': 'Múltiplos de Mercado',
  '/assessores': 'Assessores',
  '/cases': 'Cases de M&A',
  '/noticias': 'Monitor de Notícias',
  '/inteligencia': 'Inteligência Setorial',
  '/relatorio': 'Relatório M&A',
}

export default function Header() {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] || 'Vision M&A'
  const now = new Date()
  const dateStr = now.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <header style={{
      height: 58, background: '#0f1117', borderBottom: '1px solid #2a2f42',
      display: 'flex', alignItems: 'center', padding: '0 24px',
      gap: 16, flexShrink: 0
    }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ color: '#e2e8f0', fontSize: 17, fontWeight: 700, margin: 0 }}>{title}</h1>
        <div style={{ color: '#64748b', fontSize: 11 }}>{dateStr}</div>
      </div>

      {/* Live badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
        borderRadius: 20, padding: '4px 10px'
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
          animation: 'pulse 2s infinite'
        }} />
        <span style={{ color: '#22c55e', fontSize: 11, fontWeight: 600 }}>AO VIVO</span>
      </div>

      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 6 }}>
        <Search size={18} />
      </button>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 6 }}>
        <Bell size={18} />
      </button>
    </header>
  )
}
