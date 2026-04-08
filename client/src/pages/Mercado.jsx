import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Line, PieChart, Pie, Cell
} from 'recharts'
import StatusBadge from '../components/StatusBadge'
import TipoBadge from '../components/TipoBadge'

// ─── SHARED DATA ────────────────────────────────────────────────────────────

const MONTHLY_DATA = [
  { mes: 'Jan/24', volume: 18.4, deals: 118 },
  { mes: 'Fev/24', volume: 19.2, deals: 124 },
  { mes: 'Mar/24', volume: 22.8, deals: 141 },
  { mes: 'Abr/24', volume: 21.1, deals: 132 },
  { mes: 'Mai/24', volume: 24.6, deals: 148 },
  { mes: 'Jun/24', volume: 28.3, deals: 136 },
  { mes: 'Jul/24', volume: 19.7, deals: 155 },
  { mes: 'Ago/24', volume: 22.4, deals: 143 },
  { mes: 'Set/24', volume: 17.9, deals: 129 },
  { mes: 'Out/24', volume: 25.8, deals: 157 },
  { mes: 'Nov/24', volume: 21.6, deals: 144 },
  { mes: 'Dez/24', volume: 18.2, deals: 115 },
]

const ANNUAL_DATA = [
  { ano: '2018', deals: 875, volume: 118 },
  { ano: '2019', deals: 924, volume: 142 },
  { ano: '2020', deals: 870, volume: 107 },
  { ano: '2021', deals: 1338, volume: 198 },
  { ano: '2022', deals: 1559, volume: 228 },
  { ano: '2023', deals: 1505, volume: 216 },
  { ano: '2024', deals: 1582, volume: 260 },
]

const SETORIAL_DATA = [
  { setor: 'Infraestrutura', volume: 57.0 },
  { setor: 'Energia', volume: 52.8 },
  { setor: 'Consumo/Varejo', volume: 47.3 },
  { setor: 'Tecnologia', volume: 28.4 },
  { setor: 'Financeiro', volume: 21.9 },
  { setor: 'Saúde', volume: 18.6 },
  { setor: 'Agro', volume: 19.2 },
  { setor: 'Telecom', volume: 14.8 },
]

const SETORIAL_TABLE = [
  { setor: 'Infraestrutura / Portos', deals: 38, volume: 'R$ 57,0B', medio: 'R$ 1,5B', termometro: '🔥 Muito Quente' },
  { setor: 'Energia (O&G + Elétrico)', deals: 86, volume: 'R$ 52,8B', medio: 'R$ 614M', termometro: '🔥 Muito Quente' },
  { setor: 'Consumo / Varejo / Moda', deals: 112, volume: 'R$ 47,3B', medio: 'R$ 422M', termometro: '🔥 Muito Quente' },
  { setor: 'Tecnologia / Fintech', deals: 198, volume: 'R$ 28,4B', medio: 'R$ 143M', termometro: '🔥 Quente' },
  { setor: 'Financeiro', deals: 94, volume: 'R$ 21,9B', medio: 'R$ 233M', termometro: '🔥 Quente' },
  { setor: 'Agronegócio', deals: 88, volume: 'R$ 19,2B', medio: 'R$ 218M', termometro: '🌡 Aquecendo' },
  { setor: 'Saúde', deals: 142, volume: 'R$ 18,6B', medio: 'R$ 131M', termometro: '🌡 Aquecendo' },
  { setor: 'Telecom', deals: 28, volume: 'R$ 14,8B', medio: 'R$ 529M', termometro: '🌡 Aquecendo' },
  { setor: 'Imobiliário', deals: 67, volume: 'R$ 8,4B', medio: 'R$ 125M', termometro: '😐 Neutro' },
  { setor: 'Transportes', deals: 44, volume: 'R$ 24,8B', medio: 'R$ 564M', termometro: '🔥 Quente' },
  { setor: 'Educação', deals: 58, volume: 'R$ 3,8B', medio: 'R$ 66M', termometro: '❄ Frio' },
  { setor: 'Industriais / Celulose', deals: 52, volume: 'R$ 19,4B', medio: 'R$ 373M', termometro: '🌡 Aquecendo' },
]

const CROSSBORDER_ORIGEM = [
  { name: 'EUA', value: 34, color: '#3b82f6' },
  { name: 'Europa', value: 31, color: '#8b5cf6' },
  { name: 'Ásia', value: 20, color: '#06b6d4' },
  { name: 'LatAm', value: 10, color: '#22c55e' },
  { name: 'Outros', value: 5, color: '#64748b' },
]

const CROSSBORDER_ANNUAL = [
  { ano: '2019', nacional: 700, cross: 224 },
  { ano: '2020', nacional: 660, cross: 210 },
  { ano: '2021', nacional: 1010, cross: 328 },
  { ano: '2022', nacional: 1170, cross: 389 },
  { ano: '2023', nacional: 1132, cross: 373 },
  { ano: '2024', nacional: 1186, cross: 396 },
]

const CROSSBORDER_RECENT = [
  { alvo: 'Santos Brasil', adquirente: 'CMA CGM (França)', setor: 'Portos & Logística', valor: 'R$ 13,2B', ano: '2024' },
  { alvo: 'Sinochem Brasil', adquirente: 'PRIO (Brasil / nacional)', setor: 'Óleo & Gás', valor: 'R$ 10,4B', ano: '2024' },
  { alvo: 'Wilson Sons', adquirente: 'MSC (Suíça)', setor: 'Portos & Logística', valor: 'R$ 9,9B', ano: '2024' },
  { alvo: 'Neoenergia (bloco PREVI)', adquirente: 'Iberdrola (Espanha)', setor: 'Energia', valor: 'R$ 11,95B', ano: '2024' },
  { alvo: 'Sabesp', adquirente: 'Equatorial (Brasil / nacional)', setor: 'Saneamento', valor: 'R$ 14,8B', ano: '2024' },
]

const PEVC_DATA = [
  { ano: '2019', pe: 88, vc: 198, volumePE: 18.4, volumeVC: 8.2 },
  { ano: '2020', pe: 72, vc: 164, volumePE: 12.8, volumeVC: 5.9 },
  { ano: '2021', pe: 118, vc: 312, volumePE: 28.4, volumeVC: 18.6 },
  { ano: '2022', pe: 124, vc: 288, volumePE: 31.2, volumeVC: 16.4 },
  { ano: '2023', pe: 98, vc: 252, volumePE: 22.8, volumeVC: 12.1 },
  { ano: '2024', pe: 105, vc: 289, volumePE: 26.9, volumeVC: 17.5 },
]

const PEVC_TOP_FIRMS = [
  { firma: 'Vinci Partners', deals: 18, volume: 'R$ 6,2B', foco: 'Multi-strategy (PE + Crédito)' },
  { firma: 'Pátria Investimentos', deals: 15, volume: 'R$ 12,8B', foco: 'Infraestrutura / PE Large-cap' },
  { firma: 'SoftBank LatAm', deals: 22, volume: 'R$ 8,4B', foco: 'Venture / Growth Tech' },
  { firma: 'Advent International', deals: 9, volume: 'R$ 7,1B', foco: 'PE Large-cap Cross-border' },
  { firma: 'Kaszek Ventures', deals: 24, volume: 'R$ 3,8B', foco: 'VC Early-stage LatAm' },
  { firma: 'Iporanga Ventures', deals: 19, volume: 'R$ 1,2B', foco: 'VC Seed / Série A' },
]

const MULTIPLOS_DATA = [
  { setor: 'Tecnologia / Fintech', evebitda: 24.8 },
  { setor: 'Saúde', evebitda: 16.4 },
  { setor: 'Consumo / Moda', evebitda: 15.8 },
  { setor: 'Financeiro', evebitda: 13.9 },
  { setor: 'Infraestrutura', evebitda: 11.2 },
  { setor: 'Energia', evebitda: 9.4 },
  { setor: 'Agro', evebitda: 8.6 },
  { setor: 'Telecom', evebitda: 8.1 },
]

const MONTHS_LABEL = ['Jan/24', 'Fev/24', 'Mar/24', 'Abr/24', 'Mai/24', 'Jun/24', 'Jul/24', 'Ago/24', 'Set/24', 'Out/24', 'Nov/24', 'Dez/24']

const CADE_SUBMITTED = [52, 56, 64, 60, 68, 72, 58, 62, 55, 65, 60, 40]
const CADE_APPROVED = [48, 52, 60, 58, 64, 68, 56, 58, 53, 62, 57, 39]

const CADE_MONTHLY = MONTHS_LABEL.map((mes, i) => ({
  mes,
  submetidos: CADE_SUBMITTED[i],
  aprovados: CADE_APPROVED[i]
}))

const CADE_CASES = [
  { processo: 'Grupo A (Agro)', setor: 'Agronegócio', valor: 'R$ 4,2B', fase: 'Fase 1', prazo: 'Jul/25' },
  { processo: 'Grupo B (Varejo)', setor: 'Varejo', valor: 'R$ 2,8B', fase: 'Fase 1', prazo: 'Ago/25' },
  { processo: 'Grupo C (Saúde)', setor: 'Saúde', valor: 'R$ 1,9B', fase: 'Fase 2', prazo: 'Set/25' },
  { processo: 'Grupo D (Energia)', setor: 'Energia', valor: 'R$ 3,5B', fase: 'Fase 1', prazo: 'Out/25' },
  { processo: 'Grupo E (Telecom)', setor: 'Telecom', valor: 'R$ 2,1B', fase: 'Fase 1', prazo: 'Nov/25' },
]

const DISTRESSED_ANNUAL = [
  { ano: '2019', deals: 38 },
  { ano: '2020', deals: 52 },
  { ano: '2021', deals: 44 },
  { ano: '2022', deals: 68 },
  { ano: '2023', deals: 88 },
  { ano: '2024', deals: 94 },
]

const DISTRESSED_CASES = [
  { empresa: 'Americanas', setor: 'Varejo', status: 'RJ Aprovada', valor: 'R$ 43B (dívida)', ano: '2024', acquiror: 'Reestruturação / novos investidores' },
  { empresa: 'Oi / ClientCo', setor: 'Telecom', status: 'RJ + Venda Ativos', valor: 'R$ 5,7B (ativos)', ano: '2024', acquiror: 'V.tal (BTG + Globo)' },
  { empresa: 'Light S.A.', setor: 'Energia', status: 'RJ Encerrada', valor: 'R$ 11B (dívida)', ano: '2024', acquiror: 'Reestruturado + novos controladores' },
  { empresa: 'Amazonas Energia', setor: 'Energia', status: 'Privatização Distressed', valor: 'R$ 6,5B + passivos', ano: '2024', acquiror: 'Âmbar Energia (J&F)' },
  { empresa: 'Marisa Lojas', setor: 'Varejo', status: 'Recuperação Judicial', valor: 'R$ 620M (dívida)', ano: '2024', acquiror: 'Negociação em curso' },
]

// ─── STYLE HELPERS ──────────────────────────────────────────────────────────

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
  padding: '11px 14px',
  color: '#e2e8f0',
  fontSize: 13,
  borderBottom: '1px solid rgba(42,47,66,0.5)',
  verticalAlign: 'middle'
}

const chartTooltipStyle = {
  background: '#1a1f2e',
  border: '1px solid #2a2f42',
  borderRadius: 8,
  color: '#e2e8f0',
  fontSize: 12
}

const SectionCard = ({ title, children, style }) => (
  <div style={{
    background: '#1a1f2e',
    border: '1px solid #2a2f42',
    borderRadius: 12,
    padding: '20px 24px',
    ...style
  }}>
    {title && (
      <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 700, marginBottom: 18 }}>{title}</div>
    )}
    {children}
  </div>
)

const PERIOD_OPTIONS = ['1A', '2A', '3A', '5A']
const TABS = [
  'Atividade Geral',
  'Setorial',
  'Cross-border',
  'PE / Venture Capital',
  'Múltiplos (resumo)',
  'CADE',
  'Distressed'
]

// ─── TAB COMPONENTS ─────────────────────────────────────────────────────────

function TabAtividadeGeral() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionCard title="Volume (R$B) e Número de Deals — Últimos 12 Meses">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={MONTHLY_DATA} margin={{ top: 4, right: 24, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" />
            <XAxis dataKey="mes" tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis yAxisId="left" tick={{ fill: '#64748b', fontSize: 11 }} unit="B" />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Bar yAxisId="left" dataKey="volume" name="Volume (R$B)" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.85} />
            <Line yAxisId="right" type="monotone" dataKey="deals" name="Nº Deals" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="Número de Deals por Ano — 2018–2024">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={ANNUAL_DATA} margin={{ top: 4, right: 24, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" />
            <XAxis dataKey="ano" tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Bar dataKey="deals" name="Deals" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  )
}

function TabSetorial() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionCard title="Volume por Setor — Top 8 (R$B)">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={SETORIAL_DATA}
            margin={{ top: 4, right: 40, bottom: 0, left: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} unit="B" />
            <YAxis type="category" dataKey="setor" tick={{ fill: '#94a3b8', fontSize: 12 }} width={80} />
            <Tooltip contentStyle={chartTooltipStyle} formatter={v => [`R$ ${v}B`, 'Volume']} />
            <Bar dataKey="volume" name="Volume (R$B)" fill="#06b6d4" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="Detalhamento por Setor">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(15,17,23,0.5)' }}>
                <th style={thStyle}>Setor</th>
                <th style={thStyle}>Nº Deals</th>
                <th style={thStyle}>Volume</th>
                <th style={thStyle}>Deal Médio</th>
                <th style={thStyle}>Termômetro</th>
              </tr>
            </thead>
            <tbody>
              {SETORIAL_TABLE.map(row => (
                <tr key={row.setor}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row.setor}</td>
                  <td style={{ ...tdStyle, color: '#94a3b8' }}>{row.deals}</td>
                  <td style={{ ...tdStyle, color: '#3b82f6', fontWeight: 700 }}>{row.volume}</td>
                  <td style={{ ...tdStyle, color: '#94a3b8' }}>{row.medio}</td>
                  <td style={{ ...tdStyle, fontSize: 12 }}>{row.termometro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}

function TabCrossborder() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        <SectionCard title="Origem dos Compradores Estrangeiros">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={CROSSBORDER_ORIGEM}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                label={({ name, value }) => `${name} ${value}%`}
                labelLine={false}
              >
                {CROSSBORDER_ORIGEM.map(entry => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={chartTooltipStyle}
                formatter={v => [`${v}%`, 'Participação']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 8 }}>
            {CROSSBORDER_ORIGEM.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
                <span style={{ color: '#94a3b8', fontSize: 11 }}>{d.name}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Cross-border vs Nacional — 2018–2024">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={CROSSBORDER_ANNUAL} margin={{ top: 4, right: 24, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" />
              <XAxis dataKey="ano" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
              <Bar dataKey="nacional" name="Nacional" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="cross" name="Cross-border" stackId="a" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      <SectionCard title="Deals Cross-border Recentes">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(15,17,23,0.5)' }}>
                <th style={thStyle}>Alvo</th>
                <th style={thStyle}>Comprador Estrangeiro</th>
                <th style={thStyle}>Setor</th>
                <th style={thStyle}>Valor</th>
                <th style={thStyle}>Ano</th>
              </tr>
            </thead>
            <tbody>
              {CROSSBORDER_RECENT.map(r => (
                <tr key={r.alvo}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{r.alvo}</td>
                  <td style={{ ...tdStyle, color: '#94a3b8' }}>{r.adquirente}</td>
                  <td style={{ ...tdStyle, color: '#94a3b8' }}>{r.setor}</td>
                  <td style={{ ...tdStyle, color: '#3b82f6', fontWeight: 700 }}>{r.valor}</td>
                  <td style={{ ...tdStyle, color: '#64748b' }}>{r.ano}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}

function TabPEVC() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionCard title="Entradas e Saídas PE/VC — 2019–2024">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={PEVC_DATA} margin={{ top: 4, right: 24, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" />
            <XAxis dataKey="ano" tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Bar dataKey="entradas" name="Entradas" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
            <Bar dataKey="saidas" name="Saídas / Exits" stackId="a" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="Top 5 Gestores PE/VC — Período">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(15,17,23,0.5)' }}>
                <th style={thStyle}>Gestora</th>
                <th style={thStyle}>Deals no Período</th>
                <th style={thStyle}>Volume Total</th>
                <th style={thStyle}>Foco</th>
              </tr>
            </thead>
            <tbody>
              {PEVC_TOP_FIRMS.map((f, i) => (
                <tr key={f.firma}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 22, height: 22, borderRadius: '50%',
                      background: 'rgba(139,92,246,0.2)', color: '#8b5cf6',
                      fontSize: 11, fontWeight: 800, marginRight: 8
                    }}>{i + 1}</span>
                    {f.firma}
                  </td>
                  <td style={{ ...tdStyle, color: '#94a3b8' }}>{f.deals}</td>
                  <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{f.volume}</td>
                  <td style={{ ...tdStyle, color: '#64748b', fontSize: 12 }}>{f.foco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}

function TabMultiplos() {
  const highest = MULTIPLOS_DATA.reduce((a, b) => a.evebitda > b.evebitda ? a : b)
  const lowest = MULTIPLOS_DATA.reduce((a, b) => a.evebitda < b.evebitda ? a : b)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{
          background: '#1a1f2e',
          border: '1px solid rgba(34,197,94,0.3)',
          borderRadius: 12,
          padding: '20px 24px'
        }}>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
            Maior Múltiplo Mediano
          </div>
          <div style={{ color: '#22c55e', fontSize: 28, fontWeight: 800 }}>{highest.evebitda}x</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{highest.setor}</div>
          <div style={{ color: '#475569', fontSize: 11, marginTop: 4 }}>EV/EBITDA mediano do setor</div>
        </div>
        <div style={{
          background: '#1a1f2e',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 12,
          padding: '20px 24px'
        }}>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
            Menor Múltiplo Mediano
          </div>
          <div style={{ color: '#ef4444', fontSize: 28, fontWeight: 800 }}>{lowest.evebitda}x</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{lowest.setor}</div>
          <div style={{ color: '#475569', fontSize: 11, marginTop: 4 }}>EV/EBITDA mediano do setor</div>
        </div>
      </div>

      <SectionCard title="EV/EBITDA Mediano por Setor">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={MULTIPLOS_DATA}
            margin={{ top: 4, right: 60, bottom: 0, left: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} unit="x" />
            <YAxis type="category" dataKey="setor" tick={{ fill: '#94a3b8', fontSize: 12 }} width={100} />
            <Tooltip contentStyle={chartTooltipStyle} formatter={v => [`${v}x`, 'EV/EBITDA']} />
            <Bar dataKey="evebitda" name="EV/EBITDA" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link
          to="/multiplos"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '10px 20px',
            background: 'rgba(59,130,246,0.12)',
            border: '1px solid rgba(59,130,246,0.3)',
            borderRadius: 8,
            color: '#3b82f6',
            fontSize: 13,
            fontWeight: 700,
            textDecoration: 'none'
          }}
        >
          Ver análise completa →
        </Link>
      </div>
    </div>
  )
}

function TabCADE() {
  const kpiCards = [
    { label: 'Em Análise', value: 12, color: '#eab308' },
    { label: 'Aprovados 12M', value: 47, color: '#22c55e' },
    { label: 'Condicionados 12M', value: 8, color: '#f97316' },
    { label: 'Tempo Médio', value: '68 dias', color: '#3b82f6' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {kpiCards.map(c => (
          <div key={c.label} style={{
            background: '#1a1f2e',
            border: '1px solid #2a2f42',
            borderRadius: 12,
            padding: '18px 20px'
          }}>
            <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
              {c.label}
            </div>
            <div style={{ color: c.color, fontSize: 26, fontWeight: 800 }}>{c.value}</div>
          </div>
        ))}
      </div>

      <SectionCard title="Submissões vs Aprovações CADE — Últimos 12 Meses">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={CADE_MONTHLY} margin={{ top: 4, right: 24, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" />
            <XAxis dataKey="mes" tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Bar dataKey="submetidos" name="Submetidos" fill="#eab308" radius={[4, 4, 0, 0]} opacity={0.85} />
            <Bar dataKey="aprovados" name="Aprovados" fill="#22c55e" radius={[4, 4, 0, 0]} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="Casos em Análise no CADE">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(15,17,23,0.5)' }}>
                <th style={thStyle}>Processo</th>
                <th style={thStyle}>Setor</th>
                <th style={thStyle}>Valor</th>
                <th style={thStyle}>Fase</th>
                <th style={thStyle}>Prazo Est.</th>
              </tr>
            </thead>
            <tbody>
              {CADE_CASES.map(c => (
                <tr key={c.processo}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{c.processo}</td>
                  <td style={{ ...tdStyle, color: '#94a3b8' }}>{c.setor}</td>
                  <td style={{ ...tdStyle, color: '#3b82f6', fontWeight: 700 }}>{c.valor}</td>
                  <td style={tdStyle}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '2px 10px', borderRadius: 9999,
                      background: c.fase === 'Fase 2' ? 'rgba(239,68,68,0.12)' : 'rgba(234,179,8,0.12)',
                      color: c.fase === 'Fase 2' ? '#ef4444' : '#eab308',
                      fontSize: 11, fontWeight: 700
                    }}>
                      {c.fase}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, color: '#64748b' }}>{c.prazo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}

function TabDistressed() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{
        background: 'rgba(239,68,68,0.08)',
        border: '1px solid rgba(239,68,68,0.2)',
        borderRadius: 10,
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#ef4444', flexShrink: 0, marginTop: 1
        }} />
        <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
          Deals distressed tendem a aumentar em ciclos de alta de juros e contração de crédito.
          A Selic acima de 13,75% em 2022–2023 elevou o número de recuperações judiciais, criando
          oportunidades de aquisição de ativos e dívidas em desconto. O ciclo atual de política monetária
          restritiva mantém pressão sobre setores de varejo, construção e telecomunicações.
        </p>
      </div>

      <SectionCard title="Deals Distressed por Ano — 2019–2024">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={DISTRESSED_ANNUAL} margin={{ top: 4, right: 24, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" />
            <XAxis dataKey="ano" tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Bar dataKey="deals" name="Deals Distressed" fill="#ef4444" radius={[4, 4, 0, 0]} opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="Casos Distressed de Destaque">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(15,17,23,0.5)' }}>
                <th style={thStyle}>Empresa</th>
                <th style={thStyle}>Setor</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Passivo Envolvido</th>
                <th style={thStyle}>Adquirente / Desfecho</th>
                <th style={thStyle}>Ano</th>
              </tr>
            </thead>
            <tbody>
              {DISTRESSED_CASES.map(c => (
                <tr key={c.empresa}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{c.empresa}</td>
                  <td style={{ ...tdStyle, color: '#94a3b8' }}>{c.setor}</td>
                  <td style={tdStyle}>
                    <span style={{
                      display: 'inline-flex', padding: '2px 10px', borderRadius: 9999,
                      background: 'rgba(239,68,68,0.12)', color: '#ef4444',
                      fontSize: 11, fontWeight: 700
                    }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, color: '#ef4444', fontWeight: 700 }}>{c.valor}</td>
                  <td style={{ ...tdStyle, color: '#94a3b8', fontSize: 12 }}>{c.acquiror}</td>
                  <td style={{ ...tdStyle, color: '#64748b' }}>{c.ano}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function Mercado() {
  const [activeTab, setActiveTab] = useState('Atividade Geral')
  const [periodo, setPeriodo] = useState('1A')

  const renderTab = () => {
    switch (activeTab) {
      case 'Atividade Geral': return <TabAtividadeGeral />
      case 'Setorial': return <TabSetorial />
      case 'Cross-border': return <TabCrossborder />
      case 'PE / Venture Capital': return <TabPEVC />
      case 'Múltiplos (resumo)': return <TabMultiplos />
      case 'CADE': return <TabCADE />
      case 'Distressed': return <TabDistressed />
      default: return null
    }
  }

  return (
    <div style={{ padding: '28px 32px', background: '#0f1117', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h1 style={{ color: '#e2e8f0', fontSize: 22, fontWeight: 700, margin: 0 }}>
              Análise de Mercado
            </h1>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '3px 10px', borderRadius: 9999,
              background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.25)',
              color: '#eab308', fontSize: 11, fontWeight: 700
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#eab308', display: 'inline-block' }} />
              dados históricos
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>
            Visão agregada do mercado brasileiro de M&A
          </p>
        </div>

        {/* Period selector */}
        <div style={{ display: 'flex', gap: 6 }}>
          {PERIOD_OPTIONS.map(p => (
            <button
              key={p}
              onClick={() => setPeriodo(p)}
              style={{
                padding: '7px 16px',
                borderRadius: 8,
                border: periodo === p ? '1px solid #3b82f6' : '1px solid #2a2f42',
                background: periodo === p ? 'rgba(59,130,246,0.15)' : '#1a1f2e',
                color: periodo === p ? '#3b82f6' : '#64748b',
                fontSize: 13,
                fontWeight: periodo === p ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: 2,
        borderBottom: '1px solid #2a2f42',
        marginBottom: 28,
        flexWrap: 'wrap'
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 18px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeTab === tab ? '#e2e8f0' : '#64748b',
              fontSize: 13,
              fontWeight: activeTab === tab ? 700 : 500,
              cursor: 'pointer',
              marginBottom: -1,
              whiteSpace: 'nowrap',
              transition: 'color 0.15s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTab()}
    </div>
  )
}
