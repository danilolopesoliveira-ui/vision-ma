const TIPO_COLORS = {
  'Aquisição': { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6' },
  'Fusão': { bg: 'rgba(139,92,246,0.15)', color: '#8b5cf6' },
  'Desinvestimento': { bg: 'rgba(249,115,22,0.15)', color: '#f97316' },
  'PE/VC': { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
  'Distressed': { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
  'Cross-border': { bg: 'rgba(6,182,212,0.15)', color: '#06b6d4' },
}

export default function TipoBadge({ tipo }) {
  const t = TIPO_COLORS[tipo] || TIPO_COLORS['Aquisição']
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: t.bg, color: t.color,
      borderRadius: 9999, padding: '2px 10px',
      fontSize: 11, fontWeight: 700, letterSpacing: '0.03em',
      whiteSpace: 'nowrap'
    }}>
      {tipo}
    </span>
  )
}
