import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Radar, GitBranch, TrendingUp, BarChart2,
  Users, BookOpen, Newspaper, Brain, FileText
} from 'lucide-react'

export default function Sidebar() {
  return (
    <aside style={{
      width: 240,
      minHeight: '100vh',
      background: '#0f1117',
      borderRight: '1px solid #2a2f42',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #2a2f42' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 700, color: 'white'
          }}>M</div>
          <div>
            <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px' }}>Vision M&A</div>
            <div style={{ color: '#64748b', fontSize: 10, letterSpacing: '0.05em' }}>FUSÕES & AQUISIÇÕES BR</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        <SidebarNav />
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #2a2f42' }}>
        <div style={{ color: '#374151', fontSize: 11 }}>Vision M&A v1.0 · 2025</div>
        <div style={{ color: '#374151', fontSize: 10, marginTop: 2 }}>Dados de mercado BR</div>
      </div>
    </aside>
  )
}

function SidebarNav() {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard', section: 'VISÃO GERAL', end: true },
    { to: '/radar', icon: Radar, label: 'Radar de Deals', section: 'ANÁLISE' },
    { to: '/pipeline', icon: GitBranch, label: 'Pipeline Ativo' },
    { to: '/mercado', icon: TrendingUp, label: 'Mercado de M&A' },
    { to: '/multiplos', icon: BarChart2, label: 'Múltiplos' },
    { to: '/assessores', icon: Users, label: 'Assessores', section: 'DADOS' },
    { to: '/cases', icon: BookOpen, label: 'Cases de M&A' },
    { to: '/noticias', icon: Newspaper, label: 'Notícias' },
    { to: '/inteligencia', icon: Brain, label: 'Inteligência Setorial' },
    { to: '/relatorio', icon: FileText, label: 'Relatório M&A', section: 'OUTPUTS' },
  ]

  return (
    <>
      {navItems.map((item) => (
        <div key={item.to}>
          {item.section && (
            <div style={{
              color: '#374151', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.1em', padding: '16px 8px 6px',
              textTransform: 'uppercase'
            }}>{item.section}</div>
          )}
          <NavLink
            to={item.to}
            end={item.end}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', borderRadius: 8,
              marginBottom: 2, textDecoration: 'none',
              color: isActive ? '#3b82f6' : '#94a3b8',
              background: isActive ? 'rgba(59,130,246,0.12)' : 'transparent',
              borderLeft: isActive ? '2px solid #3b82f6' : '2px solid transparent',
              fontSize: 13.5, fontWeight: isActive ? 600 : 400,
              transition: 'all 0.15s'
            })}
          >
            {({ isActive }) => (
              <>
                <item.icon size={16} color={isActive ? '#3b82f6' : '#64748b'} />
                {item.label}
              </>
            )}
          </NavLink>
        </div>
      ))}
    </>
  )
}
