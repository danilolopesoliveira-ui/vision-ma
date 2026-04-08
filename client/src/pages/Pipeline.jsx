import { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import TipoBadge from '../components/TipoBadge'
import DealModal from '../components/DealModal'

const PIPELINE_DEALS = [
  {
    id: 1,
    data_anuncio: '2024-10-04',
    alvo: 'Grupo Soma',
    adquirente: 'Arezzo',
    setor: 'Consumo Cíclico',
    valor_est: 'R$ 11,0B',
    valor_num: 11.0,
    tipo: 'Fusão',
    status: 'Em Andamento',
    dias_fase: 142,
    assessor_fin_comprador: 'BTG Pactual',
    assessor_fin_vendedor: 'Itaú BBA',
    prev_fechamento: '2025-06-30',
    ev_ebitda: '16,7x',
    tese_estrategica: 'Criação de um conglomerado de moda e lifestyle líder na América Latina, reunindo marcas como Farm, Hering e Arezzo.',
    status_cade: 'Em análise',
    links: { cvm: '#', cade: '#' }
  },
  {
    id: 2,
    data_anuncio: '2024-11-18',
    alvo: 'Multiplan',
    adquirente: 'Allos',
    setor: 'Imobiliário',
    valor_est: 'R$ 12,0B',
    valor_num: 12.0,
    tipo: 'Fusão',
    status: 'CADE',
    dias_fase: 98,
    assessor_fin_comprador: 'Morgan Stanley',
    assessor_fin_vendedor: 'Bradesco BBI',
    prev_fechamento: '2025-04-30',
    ev_ebitda: '21,4x',
    tese_estrategica: 'Combinação dos dois maiores players de shopping centers do Brasil, criando um REIT de classe mundial.',
    status_cade: 'Em análise — fase 2',
    links: { cvm: '#', cade: '#' }
  },
  {
    id: 3,
    data_anuncio: '2024-07-15',
    alvo: 'Positivo Tecnologia',
    adquirente: 'Multilaser',
    setor: 'Tecnologia',
    valor_est: 'R$ 1,8B',
    valor_num: 1.8,
    tipo: 'Fusão',
    status: 'CADE',
    dias_fase: 67,
    assessor_fin_comprador: 'Goldman Sachs',
    assessor_fin_vendedor: 'Credit Suisse',
    prev_fechamento: '2025-05-15',
    ev_ebitda: '8,9x',
    status_cade: 'Em análise — preocupações concorrenciais',
    links: { cade: '#' }
  },
  {
    id: 4,
    data_anuncio: '2025-02-27',
    alvo: 'Deal Energia A (confidencial)',
    adquirente: '—',
    setor: 'Energia',
    valor_est: 'R$ 3,5B',
    valor_num: 3.5,
    tipo: 'Aquisição',
    status: 'Anunciado',
    dias_fase: 28,
    assessor_fin_comprador: 'BTG Pactual',
    assessor_fin_vendedor: '',
    prev_fechamento: '2025-08-31',
    links: {}
  },
  {
    id: 5,
    data_anuncio: '2024-12-20',
    alvo: 'Deal Saúde B (confidencial)',
    adquirente: '—',
    setor: 'Saúde',
    valor_est: 'R$ 1,2B',
    valor_num: 1.2,
    tipo: 'PE/VC',
    status: 'Em Andamento',
    dias_fase: 85,
    assessor_fin_comprador: 'Morgan Stanley',
    assessor_fin_vendedor: '',
    prev_fechamento: '2025-07-31',
    links: {}
  },
  {
    id: 6,
    data_anuncio: '2025-03-19',
    alvo: 'Grupo Carrefour / Assaí (negociação)',
    adquirente: '—',
    setor: 'Consumo NC',
    valor_est: 'R$ 2,4B',
    valor_num: 2.4,
    tipo: 'Desinvestimento',
    status: 'Rumor',
    dias_fase: 12,
    assessor_fin_comprador: 'Goldman Sachs',
    assessor_fin_vendedor: '',
    prev_fechamento: '2025-09-30',
    links: {}
  },
  {
    id: 7,
    data_anuncio: '2025-01-31',
    alvo: 'Vale / JV Mineração',
    adquirente: 'Sócio Estrangeiro',
    setor: 'Mat. Básicos',
    valor_est: 'R$ 5,8B',
    valor_num: 5.8,
    tipo: 'Cross-border',
    status: 'Anunciado',
    dias_fase: 45,
    assessor_fin_comprador: 'Rothschild',
    assessor_fin_vendedor: '',
    prev_fechamento: '2025-10-31',
    links: { cvm: '#' }
  },
  {
    id: 8,
    data_anuncio: '2024-12-08',
    alvo: 'Fintech Consolidação X',
    adquirente: '—',
    setor: 'Financeiro',
    valor_est: 'R$ 800M',
    valor_num: 0.8,
    tipo: 'PE/VC',
    status: 'Em Andamento',
    dias_fase: 112,
    assessor_fin_comprador: 'Vinci Partners',
    assessor_fin_vendedor: '',
    prev_fechamento: '2025-06-30',
    links: {}
  },
  {
    id: 9,
    data_anuncio: '2024-10-24',
    alvo: 'Grupo Educação Y',
    adquirente: '—',
    setor: 'Educação',
    valor_est: 'R$ 600M',
    valor_num: 0.6,
    tipo: 'Aquisição',
    status: 'Em Andamento',
    dias_fase: 178,
    assessor_fin_comprador: 'UBS BB',
    assessor_fin_vendedor: '',
    prev_fechamento: '2025-05-31',
    links: {}
  },
  {
    id: 10,
    data_anuncio: '2025-01-08',
    alvo: 'Infraestrutura Z / Patria',
    adquirente: 'Pátria Investimentos',
    setor: 'Infraestrutura',
    valor_est: 'R$ 4,2B',
    valor_num: 4.2,
    tipo: 'PE/VC',
    status: 'Em Andamento',
    dias_fase: 54,
    assessor_fin_comprador: 'Bradesco BBI',
    assessor_fin_vendedor: '',
    prev_fechamento: '2025-12-31',
    links: {}
  }
]

const SETORES = ['Todos', 'Saúde', 'Tecnologia', 'Energia', 'Consumo Cíclico', 'Consumo NC', 'Financeiro', 'Imobiliário', 'Mat. Básicos', 'Infraestrutura', 'Educação']
const TIPOS = ['Todos', 'Aquisição', 'Fusão', 'Desinvestimento', 'PE/VC', 'Distressed', 'Cross-border']
const STATUSES_FILTER = ['Em Andamento', 'CADE', 'Anunciado', 'Rumor']

function diasBadge(dias) {
  if (dias < 30) return { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' }
  if (dias < 90) return { bg: 'rgba(234,179,8,0.15)', color: '#eab308' }
  if (dias < 180) return { bg: 'rgba(249,115,22,0.15)', color: '#f97316' }
  return { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' }
}

function formatVolume(num) {
  return `R$ ${num.toFixed(1).replace('.', ',')}B`
}

export default function Pipeline() {
  const [setorFiltro, setSetorFiltro] = useState('Todos')
  const [tipoFiltro, setTipoFiltro] = useState('Todos')
  const [statusFiltros, setStatusFiltros] = useState([])
  const [selectedDeal, setSelectedDeal] = useState(null)

  const toggleStatus = s => setStatusFiltros(prev =>
    prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
  )

  const filtered = PIPELINE_DEALS.filter(d => {
    if (setorFiltro !== 'Todos' && d.setor !== setorFiltro) return false
    if (tipoFiltro !== 'Todos' && d.tipo !== tipoFiltro) return false
    if (statusFiltros.length > 0 && !statusFiltros.includes(d.status)) return false
    return true
  })

  // KPI calculations
  const emAndamento = filtered.length
  const volumeTotal = filtered.reduce((sum, d) => sum + d.valor_num, 0)
  const mediaDias = filtered.length > 0
    ? Math.round(filtered.reduce((sum, d) => sum + d.dias_fase, 0) / filtered.length)
    : 0

  const hoje = new Date()
  const em30dias = filtered.filter(d => {
    if (!d.prev_fechamento) return false
    const diff = (new Date(d.prev_fechamento) - hoje) / (1000 * 60 * 60 * 24)
    return diff >= 0 && diff <= 30
  }).length

  const kpiCards = [
    { label: 'Em Andamento', value: emAndamento, sub: 'deals ativos', color: '#3b82f6' },
    { label: 'Volume em Jogo', value: formatVolume(volumeTotal), sub: 'valor estimado total', color: '#22c55e' },
    { label: 'Média Dias na Fase', value: `${mediaDias}d`, sub: 'tempo médio atual', color: '#eab308' },
    { label: 'Fechando em 30 dias', value: em30dias, sub: 'previsão de fechamento', color: '#f97316' }
  ]

  const thStyle = {
    padding: '10px 14px',
    color: '#64748b',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    textAlign: 'left',
    borderBottom: '1px solid #2a2f42',
    whiteSpace: 'nowrap'
  }

  const tdStyle = {
    padding: '12px 14px',
    color: '#e2e8f0',
    fontSize: 13,
    borderBottom: '1px solid rgba(42,47,66,0.5)',
    verticalAlign: 'middle'
  }

  return (
    <div style={{ padding: '28px 32px', background: '#0f1117', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#e2e8f0', fontSize: 22, fontWeight: 700, margin: 0 }}>Pipeline Ativo</h1>
        <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
          Deals em andamento — atualizado em tempo real
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 28
      }}>
        {kpiCards.map(card => (
          <div key={card.label} style={{
            background: '#1a1f2e',
            border: '1px solid #2a2f42',
            borderRadius: 12,
            padding: '20px 22px'
          }}>
            <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>
              {card.label}
            </div>
            <div style={{ color: card.color, fontSize: 28, fontWeight: 800, lineHeight: 1 }}>
              {card.value}
            </div>
            <div style={{ color: '#475569', fontSize: 11, marginTop: 6 }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{
        background: '#1a1f2e',
        border: '1px solid #2a2f42',
        borderRadius: 12,
        padding: '16px 20px',
        marginBottom: 20,
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        alignItems: 'flex-start'
      }}>
        {/* Setor dropdown */}
        <div>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Setor</div>
          <select
            value={setorFiltro}
            onChange={e => setSetorFiltro(e.target.value)}
            style={{
              background: '#0f1117',
              border: '1px solid #2a2f42',
              borderRadius: 8,
              color: '#e2e8f0',
              padding: '7px 12px',
              fontSize: 13,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {SETORES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Tipo pills */}
        <div>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Tipo</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {TIPOS.map(t => (
              <button
                key={t}
                onClick={() => setTipoFiltro(t)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 9999,
                  border: tipoFiltro === t ? '1px solid #3b82f6' : '1px solid #2a2f42',
                  background: tipoFiltro === t ? 'rgba(59,130,246,0.15)' : 'transparent',
                  color: tipoFiltro === t ? '#3b82f6' : '#94a3b8',
                  fontSize: 12,
                  fontWeight: tipoFiltro === t ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Status checkboxes */}
        <div>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Status</div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {STATUSES_FILTER.map(s => (
              <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={statusFiltros.includes(s)}
                  onChange={() => toggleStatus(s)}
                  style={{ accentColor: '#3b82f6', cursor: 'pointer' }}
                />
                <span style={{ color: '#94a3b8', fontSize: 12 }}>{s}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline Table */}
      <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(15,17,23,0.6)' }}>
                <th style={thStyle}>Data Anúncio</th>
                <th style={thStyle}>Alvo</th>
                <th style={thStyle}>Adquirente</th>
                <th style={thStyle}>Setor</th>
                <th style={thStyle}>Valor Est.</th>
                <th style={thStyle}>Tipo</th>
                <th style={thStyle}>Status</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Dias na Fase</th>
                <th style={thStyle}>Assessor Líder</th>
                <th style={thStyle}>Prev. Fechamento</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ ...tdStyle, textAlign: 'center', color: '#64748b', padding: '40px 14px' }}>
                    Nenhum deal encontrado com os filtros aplicados.
                  </td>
                </tr>
              ) : filtered.map(deal => {
                const dBadge = diasBadge(deal.dias_fase)
                return (
                  <tr
                    key={deal.id}
                    onClick={() => setSelectedDeal(deal)}
                    style={{ cursor: 'pointer', transition: 'background 0.1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ ...tdStyle, color: '#64748b', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {new Date(deal.data_anuncio).toLocaleDateString('pt-BR')}
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#e2e8f0', whiteSpace: 'nowrap' }}>
                      {deal.alvo}
                    </td>
                    <td style={{ ...tdStyle, color: '#94a3b8' }}>{deal.adquirente}</td>
                    <td style={{ ...tdStyle, color: '#94a3b8' }}>{deal.setor}</td>
                    <td style={{ ...tdStyle, color: '#3b82f6', fontWeight: 700, whiteSpace: 'nowrap' }}>
                      {deal.valor_est}
                    </td>
                    <td style={tdStyle}><TipoBadge tipo={deal.tipo} /></td>
                    <td style={tdStyle}><StatusBadge status={deal.status} /></td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 56,
                        padding: '3px 10px',
                        borderRadius: 9999,
                        background: dBadge.bg,
                        color: dBadge.color,
                        fontSize: 12,
                        fontWeight: 700
                      }}>
                        {deal.dias_fase}d
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: '#94a3b8', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {deal.assessor_fin_comprador || deal.assessor_fin_vendedor || '—'}
                    </td>
                    <td style={{ ...tdStyle, color: '#64748b', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {deal.prev_fechamento
                        ? new Date(deal.prev_fechamento).toLocaleDateString('pt-BR')
                        : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDeal && (
        <DealModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      )}
    </div>
  )
}
