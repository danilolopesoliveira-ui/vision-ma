const LEVELS = {
  1: { label: 'Frio', emoji: '❄️', color: '#6b7280', pct: 10 },
  2: { label: 'Morno', emoji: '🌤️', color: '#60a5fa', pct: 35 },
  3: { label: 'Ativo', emoji: '☀️', color: '#eab308', pct: 60 },
  4: { label: 'Aquecido', emoji: '🔥', color: '#f97316', pct: 80 },
  5: { label: 'Ebulição', emoji: '🚀', color: '#ef4444', pct: 100 },
}

export default function Termometro({ nivel = 3, showLabel = true, size = 'md' }) {
  const lv = LEVELS[nivel] || LEVELS[3]
  const barHeight = size === 'sm' ? 4 : 6
  const fontSize = size === 'sm' ? 11 : 12

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {showLabel && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize, color: lv.color, fontWeight: 600 }}>
          <span>{lv.emoji}</span>
          <span>{lv.label}</span>
        </div>
      )}
      <div style={{ background: '#2a2f42', borderRadius: 9999, height: barHeight, width: '100%', overflow: 'hidden' }}>
        <div style={{
          width: `${lv.pct}%`, height: '100%',
          background: `linear-gradient(90deg, #3b82f6, ${lv.color})`,
          borderRadius: 9999, transition: 'width 0.5s ease'
        }} />
      </div>
    </div>
  )
}
