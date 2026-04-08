import { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, ComposedChart
} from 'recharts'
import StatusBadge from '../components/StatusBadge'
import TipoBadge from '../components/TipoBadge'
import DealModal from '../components/DealModal'

// ─── HARDCODED DATA ────────────────────────────────────────────

const kpis = [
  { label: 'Deals Anunciados 2024', value: '1.582', sub: '↑ 5% vs 2023 (TTR/KPMG)', color: '#3b82f6' },
  { label: 'Volume Total 2024', value: 'R$ 260B', sub: '↑ 20,4% vs 2023', color: '#22c55e' },
  { label: 'Deal Médio', value: 'R$ 193M', sub: 'Maior deal: R$14,8B (Sabesp)', color: '#8b5cf6' },
  { label: 'Cross-border', value: '25%', sub: '396 deals com participação estrang.', color: '#06b6d4' },
  { label: 'Deals PE/VC', value: '394', sub: '105 PE (R$26,9B) + 289 VC (R$17,5B)', color: '#f97316' },
  { label: 'Registros CADE 2024', value: '712', sub: 'Recorde histórico (+20% YoY)', color: '#eab308' },
]

const volumeSetorial = [
  { ano: '2020', Saúde: 12.1, Energia: 8.4, Tecnologia: 6.2, Financeiro: 9.8, Agro: 5.1, Telecom: 4.2, Consumo: 7.3, Infra: 10.5 },
  { ano: '2021', Saúde: 18.4, Energia: 11.2, Tecnologia: 14.8, Financeiro: 12.1, Agro: 7.8, Telecom: 3.9, Consumo: 8.6, Infra: 12.3 },
  { ano: '2022', Saúde: 38.2, Energia: 14.6, Tecnologia: 9.4, Financeiro: 16.3, Agro: 8.9, Telecom: 5.1, Consumo: 9.7, Infra: 8.8 },
  { ano: '2023', Saúde: 15.4, Energia: 19.8, Tecnologia: 22.6, Financeiro: 18.1, Agro: 14.6, Telecom: 6.2, Consumo: 22.8, Infra: 17.4 },
  { ano: '2024', Saúde: 18.6, Energia: 52.8, Tecnologia: 28.4, Financeiro: 21.9, Agro: 19.2, Telecom: 14.8, Consumo: 47.3, Infra: 57.0 },
]

const dealsMonthly = [
  { mes: 'Jan/24', deals: 118 }, { mes: 'Fev/24', deals: 124 }, { mes: 'Mar/24', deals: 141 },
  { mes: 'Abr/24', deals: 132 }, { mes: 'Mai/24', deals: 148 }, { mes: 'Jun/24', deals: 136 },
  { mes: 'Jul/24', deals: 155 }, { mes: 'Ago/24', deals: 143 }, { mes: 'Set/24', deals: 129 },
  { mes: 'Out/24', deals: 157 }, { mes: 'Nov/24', deals: 144 }, { mes: 'Dez/24', deals: 115 },
]

const tipoTransacao = [
  { name: 'Aquisição', value: 49, color: '#3b82f6' },
  { name: 'PE/VC', value: 25, color: '#22c55e' },
  { name: 'Fusão', value: 11, color: '#8b5cf6' },
  { name: 'Desinvestimento', value: 9, color: '#f97316' },
  { name: 'Distressed/RJ', value: 6, color: '#ef4444' },
]

const origemComprador = [
  { name: 'Estratégico Nacional', value: 47, color: '#3b82f6' },
  { name: 'Estrangeiro', value: 25, color: '#06b6d4' },
  { name: 'PE/VC Nacional', value: 20, color: '#22c55e' },
  { name: 'PE/VC Estrangeiro', value: 8, color: '#8b5cf6' },
]

const ultimasTransacoes = [
  { id: 'deal-001', alvo: 'SulAmérica', adquirente: 'Rede D\'Or', setor: 'Saúde', valor_est: 'R$ 12,0B', valor_num: 12000, tipo: 'Aquisição', status: 'Fechado', data_anuncio: '2022-03-22', percentual_adquirido: '100%', forma_pagamento: 'Caixa + Ações', ev_ebitda: '16x', ev_receita: '2.1x', premio_mercado: '28%', assessor_fin_comprador: 'BTG Pactual', assessor_fin_vendedor: 'Itaú BBA', assessor_jur_comprador: 'Machado Meyer', assessor_jur_vendedor: 'Pinheiro Neto', tese_estrategica: 'Integração vertical no setor de saúde suplementar, criando o maior grupo de saúde do Brasil com cobertura end-to-end de plano de saúde e rede hospitalar.', status_cade: 'Aprovado com condicionamentos', condicoes_cade: 'Desinvestimento de carteira de seguros empresariais', timeline: [{ fase: 'Rumor', data: '2022-01-15', descricao: 'Primeiros rumores de negociação' }, { fase: 'Anúncio', data: '2022-03-22', descricao: 'Anúncio oficial da transação' }, { fase: 'CADE', data: '2022-06-01', descricao: 'Submissão ao CADE' }, { fase: 'Fechamento', data: '2022-12-15', descricao: 'Conclusão da transação' }], links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Rede+D%27Or+SulAmérica' } },
  { id: 'deal-002', alvo: 'Unidas', adquirente: 'Localiza', setor: 'Transportes', valor_est: 'R$ 9,4B', valor_num: 9400, tipo: 'Fusão', status: 'Fechado', data_anuncio: '2021-01-11', percentual_adquirido: '100%', forma_pagamento: 'Ações', ev_ebitda: '11x', ev_receita: '3.2x', premio_mercado: '18%', assessor_fin_comprador: 'Goldman Sachs', assessor_fin_vendedor: 'Bradesco BBI', assessor_jur_comprador: 'Lefosse', assessor_jur_vendedor: 'Mattos Filho', tese_estrategica: 'Consolidação do mercado de aluguel de veículos no Brasil, criando líder absoluto com escala para competir globalmente.', status_cade: 'Aprovado com condicionamentos', condicoes_cade: 'Desinvestimento de 30% da frota combinada', timeline: [{ fase: 'Anúncio', data: '2021-01-11', descricao: 'Fusão anunciada ao mercado' }, { fase: 'CADE', data: '2021-04-01', descricao: 'Submissão ao CADE' }, { fase: 'Fechamento', data: '2022-08-15', descricao: 'Fusão concluída com condicionamentos' }], links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Localiza+Unidas+fusão' } },
  { id: 'deal-003', alvo: 'NotreDame Intermédica', adquirente: 'Hapvida', setor: 'Saúde', valor_est: 'R$ 21,0B', valor_num: 21000, tipo: 'Fusão', status: 'Fechado', data_anuncio: '2021-08-10', percentual_adquirido: '100%', forma_pagamento: 'Ações', ev_ebitda: '22x', assessor_fin_comprador: 'Morgan Stanley', assessor_fin_vendedor: 'Itaú BBA', assessor_jur_comprador: 'Stocche Forbes', assessor_jur_vendedor: 'TozziniFreire', tese_estrategica: 'Maior fusão do setor de saúde suplementar do Brasil, criando líder nacional com presença em todas as regiões.', status_cade: 'Aprovado com condicionamentos', timeline: [{ fase: 'Anúncio', data: '2021-08-10', descricao: 'Fusão anunciada' }, { fase: 'CADE', data: '2021-12-10', descricao: 'Submissão ao CADE' }, { fase: 'Fechamento', data: '2022-02-11', descricao: 'Fusão concluída' }], links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Hapvida+NotreDame+fusão' } },
  { id: 'deal-004', alvo: 'Cobasi', adquirente: 'Petz', setor: 'Consumo', valor_est: 'R$ 4,1B', valor_num: 4100, tipo: 'Fusão', status: 'Cancelado', data_anuncio: '2023-04-18', assessor_fin_comprador: 'Itaú BBA', assessor_jur_comprador: 'Machado Meyer', tese_estrategica: 'Consolidação do mercado de pet shop no Brasil. Fusão cancelada por decisão do CADE que identificou concentração excessiva.', status_cade: 'Reprovado', timeline: [{ fase: 'Anúncio', data: '2023-04-18', descricao: 'Fusão anunciada' }, { fase: 'CADE', data: '2023-07-20', descricao: 'Submissão ao CADE' }, { fase: 'Cancelado', data: '2024-01-31', descricao: 'CADE reprovou a fusão' }], links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Petz+Cobasi+CADE' } },
  { id: 'deal-005', alvo: 'CELSE', adquirente: 'Eneva', setor: 'Energia', valor_est: 'R$ 4,0B', valor_num: 4000, tipo: 'Aquisição', status: 'Fechado', data_anuncio: '2023-06-14', percentual_adquirido: '100%', forma_pagamento: 'Caixa', ev_ebitda: '8x', assessor_fin_comprador: 'BTG Pactual', assessor_jur_comprador: 'Souza Cescon', tese_estrategica: 'Expansão da capacidade de geração termelétrica da Eneva, consolidando posição no segmento de energia firme.', status_cade: 'Aprovado', timeline: [{ fase: 'Anúncio', data: '2023-06-14', descricao: 'Aquisição anunciada' }, { fase: 'Fechamento', data: '2023-11-30', descricao: 'Conclusão da transação' }], links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Eneva+CELSE' } },
  { id: 'deal-006', alvo: 'Supplier', adquirente: 'Totvs', setor: 'Tecnologia', valor_est: 'R$ 800M', valor_num: 800, tipo: 'Aquisição', status: 'Fechado', data_anuncio: '2023-03-28', percentual_adquirido: '100%', forma_pagamento: 'Caixa', ev_ebitda: '18x', ev_receita: '4x', assessor_fin_comprador: 'UBS BB', assessor_jur_comprador: 'BMA Advogados', tese_estrategica: 'Expansão da Totvs para o vertical de crédito B2B, adicionando capacidade de supply chain finance à plataforma de gestão empresarial.', status_cade: 'Aprovado', timeline: [{ fase: 'Anúncio', data: '2023-03-28', descricao: 'Aquisição anunciada' }, { fase: 'Fechamento', data: '2023-07-15', descricao: 'Conclusão da transação' }], links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Totvs+Supplier' } },
]

const noticias = [
  { id: 1, titulo: 'Azzas 2154 (ex-Arezzo+Soma) mira expansão internacional após fusão', resumo: 'Novo grupo de moda brasileiro avalia aquisições na América do Norte e Europa para expandir marcas Farm e Schutz globalmente, com budget de R$2B.', fonte: 'NeoFeed', data: '2025-04-05', categoria: 'Anúncio Oficial', url: '#' },
  { id: 2, titulo: 'Âmbar/J&F avalia aquisições adicionais no setor elétrico em 2025', resumo: 'Após comprar participação de 12,4% na Eletrobras e assumir Amazonas Energia, grupo J&F avalia novos ativos de geração e transmissão no Nordeste.', fonte: 'Bloomberg Línea', data: '2025-04-04', categoria: 'Rumor', url: '#' },
  { id: 3, titulo: 'CADE bate recorde com 712 atos de concentração em 2024', resumo: 'Número representa crescimento de 20% em relação a 2023 (592 casos). Taxa de aprovação permanece acima de 97% com apenas 3 casos reprovados ou desistidos.', fonte: 'Portal Fusões & Aquisições', data: '2025-04-03', categoria: 'Regulatório', url: '#' },
]

// ─── CUSTOM TOOLTIP ────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  return (
    <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ width: 8, height: 8, background: p.color, borderRadius: '50%', display: 'inline-block' }} />
          <span style={{ color: '#94a3b8' }}>{p.name}:</span>
          <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{typeof p.value === 'number' && p.value < 100 ? `R$ ${p.value}B` : p.value}</span>
        </div>
      ))}
    </div>
  )
}

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null
  return (
    <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <span style={{ color: payload[0].payload.color, fontWeight: 700 }}>{payload[0].name}: </span>
      <span style={{ color: '#e2e8f0' }}>{payload[0].value}%</span>
    </div>
  )
}

const SETOR_COLORS = {
  Saúde: '#ef4444', Energia: '#f97316', Tecnologia: '#3b82f6',
  Financeiro: '#22c55e', Agro: '#84cc16', Telecom: '#06b6d4',
  Consumo: '#eab308', Infra: '#8b5cf6'
}

const CATEGORIA_COLORS = { Rumor: '#6b7280', 'PE/VC': '#22c55e', Regulatório: '#8b5cf6', 'Anúncio Oficial': '#eab308', Fechamento: '#3b82f6', Cancelamento: '#ef4444' }

// ─── COMPONENT ─────────────────────────────────────────────────

export default function Dashboard() {
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [noticiasData, setNoticiasData] = useState(noticias)

  useEffect(() => {
    fetch('/api/noticias-ma?limit=3')
      .then(r => r.json())
      .then(data => { if (data && data.length > 0) setNoticiasData(data) })
      .catch(() => {})
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: '16px 18px', borderTop: `3px solid ${k.color}` }}>
            <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', marginBottom: 8, textTransform: 'uppercase' }}>{k.label}</div>
            <div style={{ color: '#e2e8f0', fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>{k.value}</div>
            <div style={{ color: '#64748b', fontSize: 11, marginTop: 4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        {/* Volume por setor */}
        <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>Volume por Setor (R$ Bilhões)</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>2020 – 2024 · Barras empilhadas</div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={volumeSetorial} stackOffset="none" margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" vertical={false} />
              <XAxis dataKey="ano" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
              {Object.entries(SETOR_COLORS).map(([setor, color]) => (
                <Bar key={setor} dataKey={setor} stackId="a" fill={color} radius={setor === 'Infra' ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tipo de transação donut */}
        <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>Tipo de Transação</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>Distribuição 12M</div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={tipoTransacao} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                {tipoTransacao.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {tipoTransacao.map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.color }} />
                  <span style={{ color: '#94a3b8' }}>{t.name}</span>
                </div>
                <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{t.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Deals mensais */}
        <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>Deals por Mês</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>Últimos 12 meses</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dealsMonthly} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" vertical={false} />
              <XAxis dataKey="mes" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="deals" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Deals" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Origem do comprador donut */}
        <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>Origem do Comprador</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>Classificação 12M</div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={origemComprador} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                {origemComprador.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {origemComprador.map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.color }} />
                  <span style={{ color: '#94a3b8' }}>{t.name}</span>
                </div>
                <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{t.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Últimas Transações */}
      <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>Últimas Transações</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>Clique em uma linha para ver detalhes</div>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Alvo', 'Adquirente', 'Setor', 'Valor Est.', 'Tipo', 'Status', 'Data'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #2a2f42' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ultimasTransacoes.map((deal) => (
                <tr key={deal.id} onClick={() => setSelectedDeal(deal)} style={{ cursor: 'pointer' }}>
                  <td style={{ padding: '11px 12px', fontSize: 13, color: '#e2e8f0', fontWeight: 600, borderBottom: '1px solid #1e2538' }}>{deal.alvo}</td>
                  <td style={{ padding: '11px 12px', fontSize: 13, color: '#94a3b8', borderBottom: '1px solid #1e2538' }}>{deal.adquirente}</td>
                  <td style={{ padding: '11px 12px', fontSize: 13, color: '#94a3b8', borderBottom: '1px solid #1e2538' }}>{deal.setor}</td>
                  <td style={{ padding: '11px 12px', fontSize: 13, color: '#3b82f6', fontWeight: 700, borderBottom: '1px solid #1e2538' }}>{deal.valor_est}</td>
                  <td style={{ padding: '11px 12px', borderBottom: '1px solid #1e2538' }}><TipoBadge tipo={deal.tipo} /></td>
                  <td style={{ padding: '11px 12px', borderBottom: '1px solid #1e2538' }}><StatusBadge status={deal.status} /></td>
                  <td style={{ padding: '11px 12px', fontSize: 12, color: '#64748b', borderBottom: '1px solid #1e2538' }}>{deal.data_anuncio ? new Date(deal.data_anuncio).toLocaleDateString('pt-BR') : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notícias Recentes */}
      <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20 }}>
        <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Notícias Recentes</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {noticiasData.slice(0, 3).map((n, i) => (
            <div key={i} style={{ background: '#151924', border: '1px solid #2a2f42', borderRadius: 10, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', background: 'rgba(59,130,246,0.1)', padding: '2px 8px', borderRadius: 9999 }}>{n.fonte || n.fonte}</span>
                <span style={{ fontSize: 11, color: '#64748b' }}>{n.data ? new Date(n.data).toLocaleDateString('pt-BR') : ''}</span>
              </div>
              {n.categoria && (
                <span style={{ fontSize: 10, fontWeight: 700, color: CATEGORIA_COLORS[n.categoria] || '#94a3b8', background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: 9999, display: 'inline-block', marginBottom: 8 }}>{n.categoria}</span>
              )}
              <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 6 }}>{n.titulo}</div>
              <div style={{ color: '#64748b', fontSize: 12, lineHeight: 1.5 }}>{n.resumo?.slice(0, 100)}...</div>
            </div>
          ))}
        </div>
      </div>

      {selectedDeal && <DealModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />}
    </div>
  )
}
