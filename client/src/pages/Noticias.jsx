import { useState, useEffect } from 'react'

const NOTICIAS_FALLBACK = [
  { id: 1, titulo: "Rede D'Or avança em negociações para nova aquisição hospitalar em SP", resumo: "Maior rede hospitalar do Brasil estuda aquisição de grupo regional avaliado em R$800M, segundo fontes próximas ao processo. Due diligence teria sido iniciada.", fonte: "Valor Econômico", fonte_tier: 1, url: "#", data: "2025-04-05", categoria: "Rumor", entidades: { alvo: "Grupo Hospitalar SP", adquirente: "Rede D'Or", valor_estimado: "R$800M", setor: "Saúde" } },
  { id: 2, titulo: "SoftBank confirma follow-on de US$150M em agtech brasileira", resumo: "Fundo japonês confirma aporte em empresa de tecnologia agrícola com valuation implícito de US$800M.", fonte: "Brazil Journal", fonte_tier: 1, url: "#", data: "2025-04-04", categoria: "PE/VC", entidades: { adquirente: "SoftBank", valor_estimado: "US$150M", setor: "Agtech" } },
  { id: 3, titulo: "CADE aprova fusão no setor de energia com desinvestimento obrigatório", resumo: "Conselho administrativo de defesa econômica aprova operação condicionada ao desinvestimento de ativos em dois estados brasileiros.", fonte: "Valor Econômico", fonte_tier: 1, url: "#", data: "2025-04-03", categoria: "Regulatório", entidades: { setor: "Energia" } },
  { id: 4, titulo: "Hapvida anuncia aquisição de rede regional no Nordeste por R$420M", resumo: "Maior operadora de planos de saúde do Brasil expande presença no Nordeste com deal bolt-on.", fonte: "Exame", fonte_tier: 2, url: "#", data: "2025-04-02", categoria: "Anúncio Oficial", entidades: { adquirente: "Hapvida", valor_estimado: "R$420M", setor: "Saúde", tipo_deal: "Aquisição" } },
  { id: 5, titulo: "Embraer cogita venda de participação em subsidiária de defesa", resumo: "Empresa analisa desinvestimento de até 30% de divisão de defesa para reduzir endividamento.", fonte: "Reuters Brasil", fonte_tier: 3, url: "#", data: "2025-04-01", categoria: "Rumor", entidades: { alvo: "Embraer Defesa", valor_estimado: "R$2B", setor: "Aeroespacial" } },
  { id: 6, titulo: "Totvs fecha aquisição de startup de IA por R$180M", resumo: "Maior empresa de software do Brasil adquire startup especializada em inteligência artificial para gestão empresarial.", fonte: "Infomoney", fonte_tier: 2, url: "#", data: "2025-03-30", categoria: "Fechamento", entidades: { adquirente: "TOTVS", valor_estimado: "R$180M", setor: "Tecnologia", tipo_deal: "Aquisição" } },
  { id: 7, titulo: "Advent International avalia nova aquisição no setor de saúde", resumo: "PE global analisa target no segmento de diagnósticos, valuation estimado em R$600M segundo fontes.", fonte: "Pipeline Valor", fonte_tier: 1, url: "#", data: "2025-03-28", categoria: "PE/VC", entidades: { adquirente: "Advent International", valor_estimado: "R$600M", setor: "Saúde" } },
  { id: 8, titulo: "Fusão no varejo de pet cancelada após CADE emitir parecer negativo", resumo: "Regulador de concorrência entende que a união criaria monopólio prejudicial aos consumidores.", fonte: "Folha de S.Paulo", fonte_tier: 2, url: "#", data: "2025-03-25", categoria: "Cancelamento", entidades: { setor: "Consumo", status: "Cancelado" } },
  { id: 9, titulo: "BTG Pactual mandatado para venda de ativos de logística", resumo: "Banco de investimentos conduz processo de desinvestimento de rede de armazéns e centros de distribuição.", fonte: "Brazil Journal", fonte_tier: 1, url: "#", data: "2025-03-22", categoria: "Rumor", entidades: { setor: "Logística", tipo_deal: "Desinvestimento" } },
  { id: 10, titulo: "Vale conclui JV com parceiro asiático para exploração de nióbio", resumo: "Maior mineradora do Brasil fecha acordo de joint venture avaliado em US$1.2B para desenvolvimento de ativos de nióbio.", fonte: "Valor Econômico", fonte_tier: 1, url: "#", data: "2025-03-20", categoria: "Fechamento", entidades: { adquirente: "Vale", valor_estimado: "US$1.2B", setor: "Mat. Básicos", tipo_deal: "Cross-border" } },
]

const CATEGORIAS = ['TODOS', 'Rumor', 'Anúncio Oficial', 'Fechamento', 'Regulatório', 'PE/VC', 'Cancelamento']
const TIERS = ['Todos', 'Tier 1', 'Tier 2', 'Tier 3']

const CATEGORIA_COLORS = {
  'Rumor': { bg: 'rgba(234,179,8,0.15)', color: '#eab308' },
  'Anúncio Oficial': { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6' },
  'Fechamento': { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
  'Regulatório': { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
  'PE/VC': { bg: 'rgba(139,92,246,0.15)', color: '#8b5cf6' },
  'Cancelamento': { bg: 'rgba(107,114,128,0.15)', color: '#6b7280' },
}

const TIER_COLORS = {
  1: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e', label: 'Tier 1' },
  2: { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6', label: 'Tier 2' },
  3: { bg: 'rgba(107,114,128,0.15)', color: '#9ca3af', label: 'Tier 3' },
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

function NewsCard({ noticia, onAlerta, onPipeline }) {
  const catStyle = CATEGORIA_COLORS[noticia.categoria] || { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8' }
  const tierStyle = TIER_COLORS[noticia.fonte_tier] || TIER_COLORS[3]
  const ent = noticia.entidades || {}

  return (
    <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ background: tierStyle.bg, color: tierStyle.color, borderRadius: 9999, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>
          {tierStyle.label}
        </span>
        <span style={{ background: tierStyle.bg, color: tierStyle.color, borderRadius: 9999, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
          {noticia.fonte}
        </span>
        <span style={{ background: catStyle.bg, color: catStyle.color, borderRadius: 9999, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>
          {noticia.categoria}
        </span>
        <span style={{ color: '#64748b', fontSize: 11, marginLeft: 'auto' }}>{formatDate(noticia.data)}</span>
      </div>

      {/* Title */}
      <a
        href={noticia.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15, textDecoration: 'none', lineHeight: 1.4, display: 'block' }}
        onMouseEnter={e => e.currentTarget.style.color = '#3b82f6'}
        onMouseLeave={e => e.currentTarget.style.color = '#f1f5f9'}
      >
        {noticia.titulo}
      </a>

      {/* Summary */}
      <p style={{ color: '#94a3b8', fontSize: 13, margin: 0, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {noticia.resumo}
      </p>

      {/* Entity pills */}
      {(ent.alvo || ent.adquirente || ent.valor_estimado) && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ent.alvo && (
            <span style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderRadius: 9999, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
              Alvo: {ent.alvo}
            </span>
          )}
          {ent.adquirente && (
            <span style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', borderRadius: 9999, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
              Adquirente: {ent.adquirente}
            </span>
          )}
          {ent.valor_estimado && (
            <span style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', borderRadius: 9999, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
              Valor: {ent.valor_estimado}
            </span>
          )}
          {ent.setor && (
            <span style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', borderRadius: 9999, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
              {ent.setor}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button
          onClick={() => onAlerta(ent.adquirente || ent.alvo || noticia.titulo.split(' ').slice(0, 3).join(' '))}
          style={{ background: 'rgba(234,179,8,0.1)', color: '#eab308', border: '1px solid rgba(234,179,8,0.3)', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(234,179,8,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(234,179,8,0.1)' }}
        >
          🔔 Criar Alerta
        </button>
        <button
          onClick={() => onPipeline(noticia)}
          style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)' }}
        >
          + Adicionar ao Pipeline
        </button>
      </div>
    </div>
  )
}

export default function Noticias() {
  const [noticias, setNoticias] = useState(NOTICIAS_FALLBACK)
  const [loading, setLoading] = useState(true)
  const [categoria, setCategoria] = useState('TODOS')
  const [tier, setTier] = useState('Todos')
  const [search, setSearch] = useState('')
  const [alertas, setAlertas] = useState(() => {
    try { return JSON.parse(localStorage.getItem('visionma_alertas') || '[]') } catch { return [] }
  })
  const [alertasOpen, setAlertasOpen] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetch('/api/noticias-ma')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setNoticias(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const handleAlerta = (empresa) => {
    if (!empresa) return
    const current = JSON.parse(localStorage.getItem('visionma_alertas') || '[]')
    if (!current.includes(empresa)) {
      const updated = [...current, empresa]
      localStorage.setItem('visionma_alertas', JSON.stringify(updated))
      setAlertas(updated)
      showToast(`Alerta criado para "${empresa}"`)
    } else {
      showToast(`Já existe alerta para "${empresa}"`)
    }
  }

  const removeAlerta = (empresa) => {
    const updated = alertas.filter(a => a !== empresa)
    localStorage.setItem('visionma_alertas', JSON.stringify(updated))
    setAlertas(updated)
  }

  const handlePipeline = (noticia) => {
    showToast(`"${noticia.titulo.slice(0, 40)}..." adicionado ao pipeline`)
  }

  const filtered = noticias.filter(n => {
    if (categoria !== 'TODOS' && n.categoria !== categoria) return false
    if (tier !== 'Todos') {
      const tierNum = parseInt(tier.replace('Tier ', ''))
      if (n.fonte_tier !== tierNum) return false
    }
    if (search) {
      const q = search.toLowerCase()
      return n.titulo.toLowerCase().includes(q) || n.resumo.toLowerCase().includes(q) || n.fonte.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', padding: '24px 32px', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative' }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: '#1a1f2e', border: '1px solid #22c55e', borderRadius: 10, padding: '12px 18px', color: '#22c55e', fontSize: 13, fontWeight: 600, zIndex: 9999, boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ color: '#f1f5f9', fontSize: 26, fontWeight: 800, margin: 0 }}>Monitor de Notícias M&A</h1>
            <p style={{ color: '#64748b', fontSize: 14, margin: '4px 0 0' }}>Acompanhe rumores, anúncios e fechamentos em tempo real</p>
          </div>

          {/* Search */}
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Buscar por empresa, título ou fonte..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 8, padding: '10px 14px', color: '#f1f5f9', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Tier filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            {TIERS.map(t => (
              <button
                key={t}
                onClick={() => setTier(t)}
                style={{
                  background: tier === t ? 'rgba(6,182,212,0.15)' : 'transparent',
                  color: tier === t ? '#06b6d4' : '#64748b',
                  border: `1px solid ${tier === t ? '#06b6d4' : '#2a2f42'}`,
                  borderRadius: 8,
                  padding: '5px 14px',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
            {CATEGORIAS.map(cat => {
              const isActive = categoria === cat
              const catStyle = CATEGORIA_COLORS[cat] || { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6' }
              return (
                <button
                  key={cat}
                  onClick={() => setCategoria(cat)}
                  style={{
                    background: isActive ? (cat === 'TODOS' ? 'rgba(59,130,246,0.2)' : catStyle.bg) : 'transparent',
                    color: isActive ? (cat === 'TODOS' ? '#3b82f6' : catStyle.color) : '#64748b',
                    border: `1px solid ${isActive ? (cat === 'TODOS' ? '#3b82f6' : catStyle.color) : '#2a2f42'}`,
                    borderRadius: 8,
                    padding: '6px 16px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Results count */}
          <div style={{ color: '#64748b', fontSize: 12, marginBottom: 16 }}>
            {loading ? 'Carregando...' : `${filtered.length} notícia${filtered.length !== 1 ? 's' : ''} encontrada${filtered.length !== 1 ? 's' : ''}`}
          </div>

          {/* News grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {filtered.map(n => (
              <NewsCard key={n.id} noticia={n} onAlerta={handleAlerta} onPipeline={handlePipeline} />
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 60, color: '#64748b' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Nenhuma notícia encontrada</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>Tente ajustar os filtros</div>
              </div>
            )}
          </div>
        </div>

        {/* Alertas sidebar */}
        <div style={{ width: 260, flexShrink: 0 }}>
          <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, overflow: 'hidden', position: 'sticky', top: 24 }}>
            <div
              onClick={() => setAlertasOpen(o => !o)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', cursor: 'pointer', borderBottom: alertasOpen ? '1px solid #2a2f42' : 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>🔔</span>
                <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 14 }}>Meus Alertas</span>
                {alertas.length > 0 && (
                  <span style={{ background: '#eab308', color: '#000', borderRadius: 9999, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>
                    {alertas.length}
                  </span>
                )}
              </div>
              <span style={{ color: '#64748b', fontSize: 12 }}>{alertasOpen ? '▲' : '▼'}</span>
            </div>

            {alertasOpen && (
              <div style={{ padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {alertas.length === 0 ? (
                  <div style={{ color: '#64748b', fontSize: 13, textAlign: 'center', padding: '16px 0' }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>🔕</div>
                    Nenhum alerta criado
                  </div>
                ) : (
                  alertas.map(a => (
                    <div key={a} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: 8, padding: '8px 12px' }}>
                      <span style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 500 }}>{a}</span>
                      <button
                        onClick={() => removeAlerta(a)}
                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 14, padding: 0, lineHeight: 1 }}
                        title="Remover alerta"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
                {alertas.length > 0 && (
                  <button
                    onClick={() => { localStorage.setItem('visionma_alertas', '[]'); setAlertas([]) }}
                    style={{ background: 'none', border: '1px solid #2a2f42', color: '#64748b', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer', marginTop: 4 }}
                  >
                    Limpar todos
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Tips */}
          <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: '14px 18px', marginTop: 16 }}>
            <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Legenda de Tiers</div>
            {[1, 2, 3].map(t => {
              const ts = TIER_COLORS[t]
              const desc = t === 1 ? 'Alta credibilidade, fontes primárias' : t === 2 ? 'Credibilidade média, verificar' : 'Fontes secundárias'
              return (
                <div key={t} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                  <span style={{ background: ts.bg, color: ts.color, borderRadius: 9999, padding: '1px 8px', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>T{t}</span>
                  <span style={{ color: '#64748b', fontSize: 11 }}>{desc}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
