const STATUS_COLORS = {
  'Rumor': { bg: 'rgba(107,114,128,0.2)', color: '#9ca3af', border: '#6b7280' },
  'Anunciado': { bg: 'rgba(234,179,8,0.15)', color: '#eab308', border: '#eab308' },
  'Em Andamento': { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '#3b82f6' },
  'CADE': { bg: 'rgba(139,92,246,0.15)', color: '#8b5cf6', border: '#8b5cf6' },
  'Fechado': { bg: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '#22c55e' },
  'Cancelado': { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '#ef4444' },
}

export default function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS['Rumor']
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: s.bg, color: s.color,
      border: `1px solid ${s.border}40`,
      borderRadius: 9999, padding: '2px 10px',
      fontSize: 11, fontWeight: 700, letterSpacing: '0.03em',
      whiteSpace: 'nowrap'
    }}>
      {status}
    </span>
  )
}
