import { useState, useEffect } from 'react'
import StatusBadge from '../components/StatusBadge'
import TipoBadge from '../components/TipoBadge'
import DealModal from '../components/DealModal'

const TIPOS = ['TODOS', 'Aquisição', 'Fusão', 'Desinvestimento', 'PE/VC', 'Distressed', 'Cross-border']

const SETORES = [
  'Todos os Setores', 'Saúde', 'Tecnologia', 'Energia', 'Consumo Cíclico', 'Consumo NC',
  'Financeiro', 'Imobiliário', 'Transportes', 'Telecom', 'Agro', 'Infraestrutura',
  'Materiais Básicos', 'Educação'
]

const STATUSES = ['Rumor', 'Anunciado', 'Em Andamento', 'CADE', 'Fechado', 'Cancelado']

const FALLBACK_DEALS = [
  {
    id: 1,
    alvo: "SulAmérica",
    adquirente: "Rede D'Or",
    setor: "Saúde",
    valor_est: "R$ 12,0B",
    tipo: "Aquisição",
    status: "Fechado",
    assessor_fin_comprador: "Goldman Sachs",
    assessor_fin_vendedor: "BTG Pactual",
    data_anuncio: "2022-03-07",
    tese_estrategica: "Integração vertical de hospital e seguradora, criando um ecossistema de saúde integrado no Brasil.",
    percentual_adquirido: "100%",
    forma_pagamento: "Dinheiro + Ações",
    ev_ebitda: "12,4x",
    status_cade: "Aprovado com restrições",
    links: { cvm: "#", cade: "#" }
  },
  {
    id: 2,
    alvo: "Unidas",
    adquirente: "Localiza",
    setor: "Transportes",
    valor_est: "R$ 9,4B",
    tipo: "Fusão",
    status: "Fechado",
    assessor_fin_comprador: "Itaú BBA",
    assessor_fin_vendedor: "Morgan Stanley",
    data_anuncio: "2020-09-07",
    tese_estrategica: "Consolidação do mercado de locação de veículos, gerando sinergias operacionais e escala nacional.",
    percentual_adquirido: "100%",
    forma_pagamento: "Ações",
    ev_ebitda: "18,2x",
    status_cade: "Aprovado com desinvestimentos",
    links: { cade: "#" }
  },
  {
    id: 3,
    alvo: "Cobasi",
    adquirente: "Petz",
    setor: "Consumo Cíclico",
    valor_est: "R$ 4,1B",
    tipo: "Fusão",
    status: "Cancelado",
    assessor_fin_comprador: "BTG Pactual",
    assessor_fin_vendedor: "UBS BB",
    data_anuncio: "2023-08-10",
    tese_estrategica: "Criação do maior player do varejo pet no Brasil, com mais de 700 lojas combinadas.",
    percentual_adquirido: "100%",
    forma_pagamento: "Ações",
    ev_ebitda: "14,1x",
    links: {}
  },
  {
    id: 4,
    alvo: "CELSE",
    adquirente: "Eneva",
    setor: "Energia",
    valor_est: "R$ 4,0B",
    tipo: "Aquisição",
    status: "Fechado",
    assessor_fin_comprador: "Rothschild",
    assessor_fin_vendedor: "Bradesco BBI",
    data_anuncio: "2023-04-18",
    tese_estrategica: "Expansão da capacidade termelétrica a gás, consolidando a posição da Eneva no nordeste brasileiro.",
    percentual_adquirido: "100%",
    forma_pagamento: "Dinheiro",
    ev_ebitda: "9,8x",
    links: { cvm: "#" }
  },
  {
    id: 5,
    alvo: "Supplier",
    adquirente: "Totvs",
    setor: "Tecnologia",
    valor_est: "R$ 800M",
    tipo: "Aquisição",
    status: "Fechado",
    assessor_fin_comprador: "XP Investimentos",
    assessor_fin_vendedor: "BTG Pactual",
    data_anuncio: "2021-06-30",
    tese_estrategica: "Expansão da Totvs no segmento financeiro B2B, com foco em antecipação de recebíveis e crédito.",
    percentual_adquirido: "100%",
    forma_pagamento: "Dinheiro + Earnout",
    ev_ebitda: "22,5x",
    links: {}
  },
  {
    id: 6,
    alvo: "iFood",
    adquirente: "SoftBank",
    setor: "Tecnologia",
    valor_est: "R$ 9,7B",
    tipo: "PE/VC",
    status: "Fechado",
    assessor_fin_comprador: "Goldman Sachs",
    assessor_fin_vendedor: "Morgan Stanley",
    data_anuncio: "2021-05-05",
    tese_estrategica: "Rodada de crescimento para consolidar liderança em delivery e expandir para novos verticais de conveniência.",
    percentual_adquirido: "15%",
    forma_pagamento: "Dinheiro",
    links: {}
  },
  {
    id: 7,
    alvo: "Comerc",
    adquirente: "Vibra",
    setor: "Energia",
    valor_est: "R$ 1,5B",
    tipo: "Aquisição",
    status: "Fechado",
    assessor_fin_comprador: "Itaú BBA",
    assessor_fin_vendedor: "Goldman Sachs",
    data_anuncio: "2022-11-22",
    tese_estrategica: "Entrada da Vibra no mercado livre de energia, diversificando receitas além da distribuição de combustíveis.",
    percentual_adquirido: "100%",
    forma_pagamento: "Dinheiro",
    ev_ebitda: "11,3x",
    links: { cvm: "#" }
  },
  {
    id: 8,
    alvo: "Grupo Soma",
    adquirente: "Arezzo",
    setor: "Consumo Cíclico",
    valor_est: "R$ 11,0B",
    tipo: "Fusão",
    status: "Em Andamento",
    assessor_fin_comprador: "BTG Pactual",
    assessor_fin_vendedor: "Itaú BBA",
    data_anuncio: "2024-10-04",
    tese_estrategica: "Criação de um conglomerado de moda e lifestyle líder na América Latina, reunindo marcas como Farm, Hering e Arezzo.",
    percentual_adquirido: "100%",
    forma_pagamento: "Ações",
    ev_ebitda: "16,7x",
    status_cade: "Em análise",
    links: { cvm: "#", cade: "#" }
  },
  {
    id: 9,
    alvo: "Positivo Tecnologia",
    adquirente: "Multilaser",
    setor: "Tecnologia",
    valor_est: "R$ 1,8B",
    tipo: "Fusão",
    status: "CADE",
    assessor_fin_comprador: "Goldman Sachs",
    assessor_fin_vendedor: "Credit Suisse",
    data_anuncio: "2024-07-15",
    tese_estrategica: "Consolidação do mercado de eletrônicos de consumo nacional, com ganhos de escala em manufatura e distribuição.",
    percentual_adquirido: "100%",
    forma_pagamento: "Ações + Dinheiro",
    ev_ebitda: "8,9x",
    status_cade: "Em análise — preocupações concorrenciais",
    links: { cade: "#" }
  },
  {
    id: 10,
    alvo: "Multiplan",
    adquirente: "Allos",
    setor: "Imobiliário",
    valor_est: "R$ 12,0B",
    tipo: "Fusão",
    status: "CADE",
    assessor_fin_comprador: "Morgan Stanley",
    assessor_fin_vendedor: "Bradesco BBI",
    data_anuncio: "2024-11-18",
    tese_estrategica: "Combinação dos dois maiores players de shopping centers do Brasil, criando um REIT de classe mundial.",
    percentual_adquirido: "100%",
    forma_pagamento: "Ações",
    ev_ebitda: "21,4x",
    status_cade: "Em análise — fase 2",
    links: { cvm: "#", cade: "#" }
  }
]

const labelStyle = { color: '#64748b', fontSize: 12, marginBottom: 6, display: 'block' }

const inputStyle = {
  background: '#0f1117',
  border: '1px solid #2a2f42',
  borderRadius: 8,
  color: '#e2e8f0',
  padding: '8px 12px',
  fontSize: 13,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box'
}

const selectStyle = { ...inputStyle, cursor: 'pointer' }

export default function Radar() {
  const [tipoAtivo, setTipoAtivo] = useState('TODOS')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState({
    periodoDe: '',
    periodoAte: '',
    setor: 'Todos os Setores',
    tamanhoMin: '',
    tamanhoMax: '',
    origem: '',
    status: ''
  })
  const [deals, setDeals] = useState(FALLBACK_DEALS)
  const [loading, setLoading] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState(null)

  const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }))

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (tipoAtivo !== 'TODOS') params.set('tipo', tipoAtivo)
    if (filters.periodoAte) params.set('periodoAte', filters.periodoAte)
    if (filters.periodoAte) params.set('periodoAte', filters.periodoAte)
    if (filters.setor && filters.setor !== 'Todos os Setores') params.set('setor', filters.setor)
    if (filters.tamanhoMin) params.set('tamanhoMin', filters.tamanhoMin)
    if (filters.tamanhoMax) params.set('tamanhoMax', filters.tamanhoMax)
    if (filters.origem) params.set('origem', filters.origem)
    if (filters.status) params.set('status', filters.status)

    fetch(`/api/deals-locais?${params.toString()}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setDeals(data)
        else setDeals(FALLBACK_DEALS)
      })
      .catch(() => setDeals(FALLBACK_DEALS))
      .finally(() => setLoading(false))
  }, [tipoAtivo, filters])

  const filteredDeals = deals.filter(d => {
    if (tipoAtivo !== 'TODOS' && d.tipo !== tipoAtivo) return false
    if (filters.setor && filters.setor !== 'Todos os Setores' && d.setor !== filters.setor) return false
    if (filters.status && d.status !== filters.status) return false
    if (filters.periodoAte && d.data_anuncio && d.data_anuncio > filters.periodoAte) return false
    return true
  })

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
        <h1 style={{ color: '#e2e8f0', fontSize: 22, fontWeight: 700, margin: 0 }}>
          Radar de Deals
        </h1>
        <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
          Monitoramento de operações de M&A no mercado brasileiro
        </p>
      </div>

      {/* Tipo filter pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {TIPOS.map(t => (
          <button
            key={t}
            onClick={() => setTipoAtivo(t)}
            style={{
              padding: '7px 16px',
              borderRadius: 9999,
              border: tipoAtivo === t ? '1px solid #3b82f6' : '1px solid #2a2f42',
              background: tipoAtivo === t ? 'rgba(59,130,246,0.15)' : '#1a1f2e',
              color: tipoAtivo === t ? '#3b82f6' : '#94a3b8',
              fontSize: 13,
              fontWeight: tipoAtivo === t ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Advanced filters toggle */}
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setShowAdvanced(v => !v)}
          style={{
            background: 'none',
            border: '1px solid #2a2f42',
            borderRadius: 8,
            color: '#94a3b8',
            fontSize: 12,
            padding: '6px 14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <span style={{ fontSize: 14, lineHeight: 1 }}>{showAdvanced ? '▲' : '▼'}</span>
          {showAdvanced ? 'Ocultar' : 'Filtros Avançados'}
        </button>
      </div>

      {/* Advanced filter panel */}
      {showAdvanced && (
        <div style={{
          background: '#1a1f2e',
          border: '1px solid #2a2f42',
          borderRadius: 12,
          padding: '20px 24px',
          marginBottom: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 16
        }}>
          <div>
            <label style={labelStyle}>Período — De</label>
            <input
              type="date"
              value={filters.periodoAte}
              onChange={e => updateFilter('periodoAte', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Período — Até</label>
            <input
              type="date"
              value={filters.periodoAte}
              onChange={e => updateFilter('periodoAte', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Setor</label>
            <select
              value={filters.setor}
              onChange={e => updateFilter('setor', e.target.value)}
              style={selectStyle}
            >
              {SETORES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Valor Mínimo (R$B)</label>
            <input
              type="number"
              placeholder="Ex: 0.5"
              value={filters.tamanhoMin}
              onChange={e => updateFilter('tamanhoMin', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Valor Máximo (R$B)</label>
            <input
              type="number"
              placeholder="Ex: 20"
              value={filters.tamanhoMax}
              onChange={e => updateFilter('tamanhoMax', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Origem</label>
            <input
              type="text"
              placeholder="Ex: Nacional, EUA..."
              value={filters.origem}
              onChange={e => updateFilter('origem', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select
              value={filters.status}
              onChange={e => updateFilter('status', e.target.value)}
              style={selectStyle}
            >
              <option value="">Todos</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={() => setFilters({ periodoDe: '', periodoAte: '', setor: 'Todos os Setores', tamanhoMin: '', tamanhoMax: '', origem: '', status: '' })}
              style={{
                width: '100%',
                padding: '8px 0',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 8,
                color: '#ef4444',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      )}

      {/* Results count + loading */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        {loading ? (
          <span style={{ color: '#64748b', fontSize: 13 }}>Buscando...</span>
        ) : (
          <span style={{ color: '#64748b', fontSize: 13 }}>
            <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{filteredDeals.length}</span> deal{filteredDeals.length !== 1 ? 's' : ''} encontrado{filteredDeals.length !== 1 ? 's' : ''}
          </span>
        )}
        {loading && (
          <div style={{
            width: 14, height: 14,
            border: '2px solid #2a2f42',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite'
          }} />
        )}
      </div>

      {/* Results table */}
      <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(15,17,23,0.6)' }}>
                <th style={thStyle}>Alvo</th>
                <th style={thStyle}>Adquirente</th>
                <th style={thStyle}>Setor</th>
                <th style={thStyle}>Valor Est.</th>
                <th style={thStyle}>Tipo</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Assessor Financeiro</th>
                <th style={thStyle}>Data</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ ...tdStyle, textAlign: 'center', color: '#64748b', padding: '40px 14px' }}>
                    Nenhum deal encontrado com os filtros aplicados.
                  </td>
                </tr>
              ) : filteredDeals.map(deal => (
                <tr
                  key={deal.id}
                  onClick={() => setSelectedDeal(deal)}
                  style={{ cursor: 'pointer', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ ...tdStyle, fontWeight: 600, color: '#e2e8f0' }}>{deal.alvo}</td>
                  <td style={{ ...tdStyle, color: '#94a3b8' }}>{deal.adquirente}</td>
                  <td style={{ ...tdStyle, color: '#94a3b8' }}>{deal.setor}</td>
                  <td style={{ ...tdStyle, color: '#3b82f6', fontWeight: 700 }}>{deal.valor_est}</td>
                  <td style={tdStyle}><TipoBadge tipo={deal.tipo} /></td>
                  <td style={tdStyle}><StatusBadge status={deal.status} /></td>
                  <td style={{ ...tdStyle, color: '#94a3b8', fontSize: 12 }}>
                    {deal.assessor_fin_comprador || deal.assessor_fin_vendedor || '—'}
                  </td>
                  <td style={{ ...tdStyle, color: '#64748b', fontSize: 12, whiteSpace: 'nowrap' }}>
                    {deal.data_anuncio
                      ? new Date(deal.data_anuncio).toLocaleDateString('pt-BR')
                      : '—'}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button
                      onClick={e => { e.stopPropagation(); setSelectedDeal(deal) }}
                      style={{
                        background: 'rgba(59,130,246,0.12)',
                        border: '1px solid rgba(59,130,246,0.3)',
                        borderRadius: 6,
                        color: '#3b82f6',
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '5px 12px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Ver Deal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deal Modal */}
      {selectedDeal && (
        <DealModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
