import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, LineChart, Line, Cell, ReferenceLine, Legend } from 'recharts'
import Termometro from '../components/Termometro'
import { ExternalLink, Info } from 'lucide-react'

// ─── DATA ──────────────────────────────────────────────────────

const SETORES = [
  { setor: 'Saúde', emoji: '🏥', termometro_nivel: 4, termometro: 'Aquecido', ev_ebitda_min: 8, ev_ebitda_med: 13, ev_ebitda_max: 22, ev_receita_min: 1.5, ev_receita_med: 2.8, ev_receita_max: 5.0, pl_min: 22, pl_med: 31, pl_max: 45, ebitda_margin_ref: '15–22%', base_deals: 18, ultima_op: "Rede D'Or/SulAmérica", tendencia: 'alta', cor: '#ef4444' },
  { setor: 'Tecnologia', emoji: '💻', termometro_nivel: 5, termometro: 'Ebulição', ev_ebitda_min: 12, ev_ebitda_med: 22, ev_ebitda_max: 45, ev_receita_min: 3, ev_receita_med: 6, ev_receita_max: 15, pl_min: 35, pl_med: 55, pl_max: 120, ebitda_margin_ref: '18–30%', base_deals: 24, ultima_op: 'Totvs/Supplier', tendencia: 'alta', cor: '#3b82f6' },
  { setor: 'Energia', emoji: '⚡', termometro_nivel: 3, termometro: 'Ativo', ev_ebitda_min: 6, ev_ebitda_med: 9, ev_ebitda_max: 14, ev_receita_min: 1, ev_receita_med: 2, ev_receita_max: 3.5, ebitda_margin_ref: '25–40%', base_deals: 15, ultima_op: 'Eneva/CELSE', tendencia: 'estavel', cor: '#f97316' },
  { setor: 'Financeiro', emoji: '🏦', termometro_nivel: 3, termometro: 'Ativo', ev_ebitda_min: null, ev_ebitda_med: null, ev_ebitda_max: null, pb_min: 1.5, pb_med: 2.2, pb_max: 3.0, ebitda_margin_ref: 'P/B: 1.5x–3x', base_deals: 12, ultima_op: 'Itaú/TOTVS parceria', tendencia: 'estavel', cor: '#22c55e', nota_especial: 'Usa P/B (Price-to-Book) como múltiplo primário' },
  { setor: 'Agronegócio', emoji: '🌾', termometro_nivel: 3, termometro: 'Ativo', ev_ebitda_min: 5, ev_ebitda_med: 8, ev_ebitda_max: 13, ev_receita_min: 0.8, ev_receita_med: 1.5, ev_receita_max: 2.5, ebitda_margin_ref: '12–20%', base_deals: 14, ultima_op: 'BRF/Marfrig', tendencia: 'alta', cor: '#84cc16' },
  { setor: 'Telecomunicações', emoji: '📡', termometro_nivel: 2, termometro: 'Morno', ev_ebitda_min: 5, ev_ebitda_med: 7, ev_ebitda_max: 11, ev_receita_min: 1.5, ev_receita_med: 2.0, ev_receita_max: 3.0, ebitda_margin_ref: '28–38%', base_deals: 8, ultima_op: 'TIM Brasil carve-outs', tendencia: 'queda', cor: '#06b6d4' },
  { setor: 'Consumo Cíclico', emoji: '🛍️', termometro_nivel: 2, termometro: 'Morno', ev_ebitda_min: 6, ev_ebitda_med: 10, ev_ebitda_max: 16, ev_receita_min: 0.5, ev_receita_med: 1.2, ev_receita_max: 2.5, ebitda_margin_ref: '8–15%', base_deals: 11, ultima_op: 'Arezzo/Grupo Soma', tendencia: 'estavel', cor: '#eab308' },
  { setor: 'Consumo NC', emoji: '🛒', termometro_nivel: 3, termometro: 'Ativo', ev_ebitda_min: 7, ev_ebitda_med: 11, ev_ebitda_max: 17, ev_receita_min: 0.8, ev_receita_med: 1.5, ev_receita_max: 3.0, ebitda_margin_ref: '10–18%', base_deals: 10, ultima_op: 'Carrefour/BIG', tendencia: 'estavel', cor: '#a78bfa' },
  { setor: 'Infraestrutura', emoji: '🏗️', termometro_nivel: 3, termometro: 'Ativo', ev_ebitda_min: 8, ev_ebitda_med: 12, ev_ebitda_max: 18, ev_receita_min: 3, ev_receita_med: 5, ev_receita_max: 9, ebitda_margin_ref: '35–55%', base_deals: 13, ultima_op: 'Patria/Hidrovias', tendencia: 'alta', cor: '#64748b' },
  { setor: 'Imobiliário', emoji: '🏢', termometro_nivel: 2, termometro: 'Morno', ev_ebitda_min: null, ev_ebitda_med: null, ev_ebitda_max: null, p_ffo_min: 12, p_ffo_med: 16, p_ffo_max: 20, ebitda_margin_ref: 'P/FFO: 12x–20x', base_deals: 7, ultima_op: 'Allos/Multiplan', tendencia: 'estavel', cor: '#f472b6', nota_especial: 'FIIs: P/FFO. Incorporadoras: P/VGV 0.3x–0.6x' },
  { setor: 'Mat. Básicos', emoji: '⛏️', termometro_nivel: 1, termometro: 'Frio', ev_ebitda_min: 4, ev_ebitda_med: 7, ev_ebitda_max: 11, ev_receita_min: 0.8, ev_receita_med: 1.3, ev_receita_max: 2.0, ebitda_margin_ref: '20–35%', base_deals: 6, ultima_op: 'Suzano/Kimberly-Clark BR', tendencia: 'queda', cor: '#78716c' },
  { setor: 'Educação', emoji: '📚', termometro_nivel: 2, termometro: 'Morno', ev_ebitda_min: 7, ev_ebitda_med: 12, ev_ebitda_max: 20, ev_receita_min: 1, ev_receita_med: 2, ev_receita_max: 4, ebitda_margin_ref: '15–25%', base_deals: 9, ultima_op: 'Ânima/Laureate', tendencia: 'alta', cor: '#f59e0b' },
]

const COMPARAVEIS = [
  { empresa: "Rede D'Or São Luiz", ticker: 'RDOR3', setor: 'Saúde', ev_ebitda_ltm: 14.2, ev_ebitda_ntm: 12.8, ev_receita: 2.9, pl: 32.5, div_yield: 0.8, margem_ebitda: 18.5, ev_bi: 85.4 },
  { empresa: 'Hapvida', ticker: 'HAPV3', setor: 'Saúde', ev_ebitda_ltm: 11.4, ev_ebitda_ntm: 9.8, ev_receita: 1.8, pl: 24.2, div_yield: 0.5, margem_ebitda: 15.8, ev_bi: 32.1 },
  { empresa: 'Fleury', ticker: 'FLRY3', setor: 'Saúde', ev_ebitda_ltm: 10.8, ev_ebitda_ntm: 9.5, ev_receita: 2.1, pl: 20.4, div_yield: 3.2, margem_ebitda: 19.4, ev_bi: 8.6 },
  { empresa: 'Dasa', ticker: 'DASA3', setor: 'Saúde', ev_ebitda_ltm: 9.2, ev_ebitda_ntm: 8.4, ev_receita: 1.4, pl: null, div_yield: 0.0, margem_ebitda: 15.2, ev_bi: 12.4 },
  { empresa: 'Qualicorp', ticker: 'QUAL3', setor: 'Saúde', ev_ebitda_ltm: 7.8, ev_ebitda_ntm: 7.2, ev_receita: 3.1, pl: 14.2, div_yield: 5.1, margem_ebitda: 39.7, ev_bi: 4.2 },
  { empresa: 'TOTVS', ticker: 'TOTS3', setor: 'Tecnologia', ev_ebitda_ltm: 24.5, ev_ebitda_ntm: 20.2, ev_receita: 5.8, pl: 38.2, div_yield: 1.2, margem_ebitda: 23.6, ev_bi: 22.4 },
  { empresa: 'Positivo', ticker: 'POSI3', setor: 'Tecnologia', ev_ebitda_ltm: 8.4, ev_ebitda_ntm: 7.8, ev_receita: 0.6, pl: 12.8, div_yield: 2.1, margem_ebitda: 7.1, ev_bi: 1.8 },
  { empresa: 'Locaweb', ticker: 'LWSA3', setor: 'Tecnologia', ev_ebitda_ltm: 18.2, ev_ebitda_ntm: 14.8, ev_receita: 3.2, pl: 42.6, div_yield: 0.0, margem_ebitda: 17.6, ev_bi: 3.4 },
  { empresa: 'Bemobi', ticker: 'BMOB3', setor: 'Tecnologia', ev_ebitda_ltm: 15.6, ev_ebitda_ntm: 12.4, ev_receita: 4.1, pl: 28.4, div_yield: 1.8, margem_ebitda: 26.3, ev_bi: 1.6 },
  { empresa: 'Eneva', ticker: 'ENEV3', setor: 'Energia', ev_ebitda_ltm: 8.4, ev_ebitda_ntm: 7.2, ev_receita: 2.1, pl: 18.4, div_yield: 0.0, margem_ebitda: 25.0, ev_bi: 24.8 },
  { empresa: 'Equatorial', ticker: 'EQTL3', setor: 'Energia', ev_ebitda_ltm: 9.8, ev_ebitda_ntm: 8.6, ev_receita: 2.8, pl: 22.4, div_yield: 1.4, margem_ebitda: 28.6, ev_bi: 38.2 },
  { empresa: 'CPFL Energia', ticker: 'CPFE3', setor: 'Energia', ev_ebitda_ltm: 7.6, ev_ebitda_ntm: 6.8, ev_receita: 1.8, pl: 14.6, div_yield: 5.8, margem_ebitda: 23.7, ev_bi: 28.4 },
  { empresa: 'Neoenergia', ticker: 'NEOE3', setor: 'Energia', ev_ebitda_ltm: 6.8, ev_ebitda_ntm: 6.2, ev_receita: 1.4, pl: 12.8, div_yield: 4.2, margem_ebitda: 20.6, ev_bi: 22.6 },
  { empresa: 'Itaú Unibanco', ticker: 'ITUB4', setor: 'Financeiro', ev_ebitda_ltm: null, ev_ebitda_ntm: null, ev_receita: null, pl: 8.4, div_yield: 5.2, pb: 2.1, margem_ebitda: null, ev_bi: null },
  { empresa: 'Bradesco', ticker: 'BBDC4', setor: 'Financeiro', ev_ebitda_ltm: null, ev_ebitda_ntm: null, ev_receita: null, pl: 7.2, div_yield: 6.4, pb: 1.4, margem_ebitda: null, ev_bi: null },
  { empresa: 'BTG Pactual', ticker: 'BPAC11', setor: 'Financeiro', ev_ebitda_ltm: null, ev_ebitda_ntm: null, ev_receita: null, pl: 14.8, div_yield: 2.8, pb: 2.8, margem_ebitda: null, ev_bi: null },
  { empresa: 'XP Inc', ticker: 'XPBR31', setor: 'Financeiro', ev_ebitda_ltm: null, ev_ebitda_ntm: null, ev_receita: null, pl: 18.2, div_yield: 1.8, pb: 3.2, margem_ebitda: null, ev_bi: null },
  { empresa: 'Minerva Foods', ticker: 'BEEF3', setor: 'Agronegócio', ev_ebitda_ltm: 6.8, ev_ebitda_ntm: 6.2, ev_receita: 0.4, pl: 12.4, div_yield: 4.2, margem_ebitda: 5.9, ev_bi: 12.4 },
  { empresa: 'SLC Agrícola', ticker: 'SLCE3', setor: 'Agronegócio', ev_ebitda_ltm: 7.4, ev_ebitda_ntm: 6.8, ev_receita: 1.8, pl: 14.2, div_yield: 3.6, margem_ebitda: 24.3, ev_bi: 8.6 },
  { empresa: 'São Martinho', ticker: 'SMTO3', setor: 'Agronegócio', ev_ebitda_ltm: 8.2, ev_ebitda_ntm: 7.4, ev_receita: 2.1, pl: 16.8, div_yield: 3.2, margem_ebitda: 25.6, ev_bi: 7.4 },
  { empresa: 'TIM Brasil', ticker: 'TIMS3', setor: 'Telecomunicações', ev_ebitda_ltm: 6.2, ev_ebitda_ntm: 5.8, ev_receita: 1.8, pl: 14.2, div_yield: 4.8, margem_ebitda: 29.0, ev_bi: 24.6 },
  { empresa: 'Vivo/Telefônica', ticker: 'VIVT3', setor: 'Telecomunicações', ev_ebitda_ltm: 5.8, ev_ebitda_ntm: 5.4, ev_receita: 1.6, pl: 16.4, div_yield: 6.2, margem_ebitda: 27.6, ev_bi: 38.4 },
  { empresa: 'Lojas Renner', ticker: 'LREN3', setor: 'Consumo Cíclico', ev_ebitda_ltm: 8.4, ev_ebitda_ntm: 7.8, ev_receita: 1.1, pl: 14.6, div_yield: 2.4, margem_ebitda: 13.1, ev_bi: 8.2 },
  { empresa: 'Cyrela', ticker: 'CYRE3', setor: 'Imobiliário', ev_ebitda_ltm: null, ev_ebitda_ntm: null, ev_receita: null, pl: 8.4, div_yield: 5.8, p_ffo: 14.2, margem_ebitda: null, ev_bi: 6.4 },
  { empresa: 'MRV Engenharia', ticker: 'MRVE3', setor: 'Imobiliário', ev_ebitda_ltm: null, ev_ebitda_ntm: null, ev_receita: null, pl: 7.2, div_yield: 3.4, p_ffo: 12.8, margem_ebitda: null, ev_bi: 8.2 },
  { empresa: 'Vale', ticker: 'VALE3', setor: 'Mat. Básicos', ev_ebitda_ltm: 4.8, ev_ebitda_ntm: 5.2, ev_receita: 1.8, pl: 5.6, div_yield: 8.4, margem_ebitda: 37.5, ev_bi: 198.4 },
  { empresa: 'Suzano', ticker: 'SUZB3', setor: 'Mat. Básicos', ev_ebitda_ltm: 8.2, ev_ebitda_ntm: 7.4, ev_receita: 2.8, pl: 14.6, div_yield: 1.2, margem_ebitda: 34.1, ev_bi: 78.6 },
  { empresa: 'Cogna', ticker: 'COGN3', setor: 'Educação', ev_ebitda_ltm: 8.4, ev_ebitda_ntm: 7.2, ev_receita: 0.8, pl: null, div_yield: 0.0, margem_ebitda: 9.5, ev_bi: 6.8 },
  { empresa: 'Ânima', ticker: 'ANIM3', setor: 'Educação', ev_ebitda_ltm: 9.8, ev_ebitda_ntm: 8.4, ev_receita: 1.2, pl: 18.4, div_yield: 0.0, margem_ebitda: 12.2, ev_bi: 4.2 },
  { empresa: 'Yduqs', ticker: 'YDUQ3', setor: 'Educação', ev_ebitda_ltm: 7.6, ev_ebitda_ntm: 6.8, ev_receita: 0.9, pl: 12.6, div_yield: 2.4, margem_ebitda: 11.8, ev_bi: 3.8 },
]

const HISTORICO = [
  { periodo: '2022-Q1', Saúde: 11.5, Tecnologia: 19.8, Energia: 7.8, Agronegócio: 7.2, Educação: 10.8 },
  { periodo: '2022-Q2', Saúde: 12.0, Tecnologia: 20.4, Energia: 8.1, Agronegócio: 7.8, Educação: 11.2 },
  { periodo: '2022-Q3', Saúde: 12.8, Tecnologia: 21.2, Energia: 8.4, Agronegócio: 8.1, Educação: 11.6 },
  { periodo: '2022-Q4', Saúde: 13.2, Tecnologia: 22.0, Energia: 8.8, Agronegócio: 8.4, Educação: 12.0 },
  { periodo: '2023-Q1', Saúde: 13.5, Tecnologia: 23.4, Energia: 9.0, Agronegócio: 8.6, Educação: 12.4 },
  { periodo: '2023-Q2', Saúde: 13.1, Tecnologia: 22.8, Energia: 8.8, Agronegócio: 8.2, Educação: 12.0 },
  { periodo: '2023-Q3', Saúde: 13.4, Tecnologia: 23.6, Energia: 8.6, Agronegócio: 8.4, Educação: 11.8 },
  { periodo: '2023-Q4', Saúde: 13.8, Tecnologia: 24.2, Energia: 9.2, Agronegócio: 8.8, Educação: 12.2 },
  { periodo: '2024-Q1', Saúde: 13.2, Tecnologia: 23.8, Energia: 8.8, Agronegócio: 8.6, Educação: 12.0 },
  { periodo: '2024-Q2', Saúde: 13.6, Tecnologia: 24.8, Energia: 9.4, Agronegócio: 9.0, Educação: 12.4 },
  { periodo: '2024-Q3', Saúde: 13.9, Tecnologia: 25.2, Energia: 9.6, Agronegócio: 9.2, Educação: 12.8 },
  { periodo: '2024-Q4', Saúde: 13.0, Tecnologia: 24.4, Energia: 9.0, Agronegócio: 8.8, Educação: 12.2 },
]

const tendenciaIcon = (t) => t === 'alta' ? '↑' : t === 'queda' ? '↓' : '→'
const tendenciaCor = (t) => t === 'alta' ? '#22c55e' : t === 'queda' ? '#ef4444' : '#94a3b8'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  return (
    <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3 }}>
          <div style={{ width: 8, height: 8, background: p.color, borderRadius: '50%' }} />
          <span style={{ color: '#94a3b8' }}>{p.name}:</span>
          <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{p.value}x</span>
        </div>
      ))}
    </div>
  )
}

const LINHA_COLORS = ['#3b82f6', '#ef4444', '#f97316', '#22c55e', '#eab308']

// ─── TABS ──────────────────────────────────────────────────────

function TabPorSetor({ periodo, porte }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Heatmap summary */}
      <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20 }}>
        <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>EV/EBITDA Mediana por Setor</div>
        <div style={{ color: '#64748b', fontSize: 12, marginBottom: 16 }}>Transações M&A fechadas — referência de valuation</div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={SETORES.filter(s => s.ev_ebitda_med !== null)} layout="vertical" margin={{ left: 20, right: 40, top: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} unit="x" />
            <YAxis type="category" dataKey="setor" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="ev_ebitda_med" name="EV/EBITDA Mediana" radius={[0, 4, 4, 0]}>
              {SETORES.filter(s => s.ev_ebitda_med !== null).map((s, i) => <Cell key={i} fill={s.cor} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {SETORES.map((s, i) => (
          <div key={i} style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 18, marginBottom: 2 }}>{s.emoji}</div>
                <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>{s.setor}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Termometro nivel={s.termometro_nivel} size="sm" />
              </div>
            </div>

            {s.nota_especial ? (
              <div style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: 6, padding: '8px 10px', marginBottom: 10 }}>
                <div style={{ color: '#eab308', fontSize: 11, fontWeight: 600 }}>{s.nota_especial}</div>
                {s.pb_med && <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 700, marginTop: 4 }}>P/B Mediana: {s.pb_med}x <span style={{ color: tendenciaCor(s.tendencia) }}>{tendenciaIcon(s.tendencia)}</span></div>}
                {s.p_ffo_med && <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 700, marginTop: 4 }}>P/FFO Mediana: {s.p_ffo_med}x</div>}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
                {/* EV/EBITDA row */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: '#64748b', fontSize: 11 }}>EV/EBITDA</span>
                    <span style={{ fontSize: 11 }}>
                      <span style={{ color: '#94a3b8' }}>{s.ev_ebitda_min}x – {s.ev_ebitda_max}x</span>
                    </span>
                  </div>
                  <div style={{ position: 'relative', height: 8, background: '#2a2f42', borderRadius: 4 }}>
                    <div style={{ position: 'absolute', left: `${((s.ev_ebitda_min - 0) / 50) * 100}%`, right: `${100 - ((s.ev_ebitda_max - 0) / 50) * 100}%`, height: '100%', background: s.cor, opacity: 0.4, borderRadius: 4 }} />
                    <div style={{ position: 'absolute', left: `${((s.ev_ebitda_med - 0) / 50) * 100}%`, transform: 'translateX(-50%)', width: 3, height: '100%', background: s.cor, borderRadius: 2 }} />
                  </div>
                  <div style={{ color: s.cor, fontSize: 13, fontWeight: 700, marginTop: 4 }}>
                    Mediana: {s.ev_ebitda_med}x <span style={{ color: tendenciaCor(s.tendencia) }}>{tendenciaIcon(s.tendencia)}</span>
                  </div>
                </div>

                {/* EV/Receita row */}
                {s.ev_receita_med && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ color: '#64748b', fontSize: 11 }}>EV/Receita</span>
                      <span style={{ color: '#94a3b8', fontSize: 11 }}>{s.ev_receita_min}x – {s.ev_receita_max}x</span>
                    </div>
                    <div style={{ position: 'relative', height: 6, background: '#2a2f42', borderRadius: 4 }}>
                      <div style={{ position: 'absolute', left: `${(s.ev_receita_min / 15) * 100}%`, right: `${100 - (s.ev_receita_max / 15) * 100}%`, height: '100%', background: '#3b82f6', opacity: 0.3, borderRadius: 4 }} />
                      <div style={{ position: 'absolute', left: `${(s.ev_receita_med / 15) * 100}%`, transform: 'translateX(-50%)', width: 3, height: '100%', background: '#3b82f6', borderRadius: 2 }} />
                    </div>
                    <div style={{ color: '#3b82f6', fontSize: 12, fontWeight: 600, marginTop: 3 }}>Mediana: {s.ev_receita_med}x</div>
                  </div>
                )}
              </div>
            )}

            <div style={{ borderTop: '1px solid #2a2f42', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <span style={{ color: '#64748b' }}>EBITDA ref.</span>
                <span style={{ color: '#94a3b8' }}>{s.ebitda_margin_ref}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <span style={{ color: '#64748b' }}>Base ({periodo})</span>
                <span style={{ color: '#94a3b8' }}>{s.base_deals} deals</span>
              </div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Última op.: <span style={{ color: '#94a3b8' }}>{s.ultima_op}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Scatter */}
      <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20 }}>
        <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Scatter: Margem EBITDA vs EV/EBITDA</div>
        <div style={{ color: '#64748b', fontSize: 12, marginBottom: 16 }}>Cada ponto = setor; tamanho proporcional ao volume de deals</div>
        <ResponsiveContainer width="100%" height={260}>
          <ScatterChart margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" />
            <XAxis dataKey="margem" name="Margem EBITDA %" type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Margem EBITDA ref. (mid)', fill: '#64748b', fontSize: 11, position: 'insideBottom', offset: -4 }} />
            <YAxis dataKey="ev_ebitda_med" name="EV/EBITDA Mediana" type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} unit="x" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const d = payload[0]?.payload
              return <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}><div style={{ color: '#e2e8f0', fontWeight: 700 }}>{d?.setor}</div><div style={{ color: '#64748b' }}>EV/EBITDA: {d?.ev_ebitda_med}x</div></div>
            }} />
            <Scatter
              data={SETORES.filter(s => s.ev_ebitda_med && s.ebitda_margin_ref).map(s => ({
                ...s,
                margem: parseFloat(s.ebitda_margin_ref) || (parseInt(s.ebitda_margin_ref) || 20)
              }))}
              fill="#3b82f6"
            >
              {SETORES.filter(s => s.ev_ebitda_med).map((s, i) => <Cell key={i} fill={s.cor} />)}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function TabComparaveis() {
  const [setorFiltro, setSetorFiltro] = useState('Todos')
  const [sortBy, setSortBy] = useState('ev_ebitda_ltm')

  const setores = ['Todos', ...new Set(COMPARAVEIS.map(c => c.setor))]
  const filtered = COMPARAVEIS
    .filter(c => setorFiltro === 'Todos' || c.setor === setorFiltro)
    .sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, padding: '10px 16px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <Info size={14} color="#3b82f6" />
        <span style={{ color: '#94a3b8', fontSize: 12 }}>Dados de mercado como âncora — múltiplos de M&A tipicamente com <strong style={{ color: '#e2e8f0' }}>prêmio de controle de 20–35%</strong> sobre comparáveis públicos.</span>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <select value={setorFiltro} onChange={e => setSetorFiltro(e.target.value)}
          style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 8, color: '#e2e8f0', padding: '7px 12px', fontSize: 13, cursor: 'pointer' }}>
          {setores.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 8, color: '#e2e8f0', padding: '7px 12px', fontSize: 13, cursor: 'pointer' }}>
          <option value="ev_ebitda_ltm">Ordenar: EV/EBITDA LTM</option>
          <option value="pl">Ordenar: P/L</option>
          <option value="div_yield">Ordenar: Div. Yield</option>
          <option value="ev_bi">Ordenar: EV</option>
        </select>
      </div>

      <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2a2f42' }}>
                {['Empresa', 'Ticker', 'Setor', 'EV/EBITDA LTM', 'EV/EBITDA NTM', 'EV/Receita', 'P/L', 'P/B', 'Div Yield', 'Marg EBITDA'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e2538' }}>
                  <td style={{ padding: '10px 14px', color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{c.empresa}</td>
                  <td style={{ padding: '10px 14px', color: '#3b82f6', fontSize: 12, fontWeight: 700, fontFamily: 'monospace' }}>{c.ticker}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12 }}>
                    <span style={{ background: '#151924', color: '#94a3b8', padding: '2px 8px', borderRadius: 6, fontSize: 11 }}>{c.setor}</span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#eab308', fontWeight: 700, fontSize: 13 }}>{c.ev_ebitda_ltm ? `${c.ev_ebitda_ltm}x` : '—'}</td>
                  <td style={{ padding: '10px 14px', color: '#94a3b8', fontSize: 13 }}>{c.ev_ebitda_ntm ? `${c.ev_ebitda_ntm}x` : '—'}</td>
                  <td style={{ padding: '10px 14px', color: '#94a3b8', fontSize: 13 }}>{c.ev_receita ? `${c.ev_receita}x` : '—'}</td>
                  <td style={{ padding: '10px 14px', color: '#94a3b8', fontSize: 13 }}>{c.pl ? `${c.pl}x` : '—'}</td>
                  <td style={{ padding: '10px 14px', color: '#94a3b8', fontSize: 13 }}>{c.pb ? `${c.pb}x` : '—'}</td>
                  <td style={{ padding: '10px 14px', color: '#22c55e', fontSize: 13 }}>{c.div_yield ? `${c.div_yield}%` : '—'}</td>
                  <td style={{ padding: '10px 14px', color: '#94a3b8', fontSize: 13 }}>{c.margem_ebitda ? `${c.margem_ebitda}%` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function TabEvolucao() {
  const [setor, setSetor] = useState('Saúde')
  const setores = ['Saúde', 'Tecnologia', 'Energia', 'Agronegócio', 'Educação']
  const medias = { Saúde: 13.0, Tecnologia: 22.8, Energia: 8.8, Agronegócio: 8.5, Educação: 12.0 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {setores.map(s => (
          <button key={s} onClick={() => setSetor(s)} style={{ padding: '6px 14px', borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: setor === s ? '#3b82f6' : '#1a1f2e', color: setor === s ? 'white' : '#94a3b8', border: setor === s ? '1px solid transparent' : '1px solid #2a2f42' }}>{s}</button>
        ))}
      </div>

      <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20 }}>
        <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>EV/EBITDA Mediana — {setor}</div>
        <div style={{ color: '#64748b', fontSize: 12, marginBottom: 16 }}>Evolução trimestral · Linha pontilhada = média histórica</div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={HISTORICO} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" />
            <XAxis dataKey="periodo" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} unit="x" domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={medias[setor]} stroke="#64748b" strokeDasharray="6 3" label={{ value: `Média ${medias[setor]}x`, fill: '#64748b', fontSize: 11, position: 'insideTopRight' }} />
            <Line type="monotone" dataKey={setor} stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6 }} name={`EV/EBITDA ${setor}`} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20 }}>
        <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Comparativo Setorial</div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={HISTORICO} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" />
            <XAxis dataKey="periodo" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} unit="x" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
            {setores.map((s, i) => <Line key={s} type="monotone" dataKey={s} stroke={LINHA_COLORS[i]} strokeWidth={1.5} dot={false} name={s} />)}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function TabMetodologia() {
  const items = [
    { titulo: 'EV/EBITDA', cor: '#3b82f6', conteudo: 'Principal múltiplo em M&A. Mede o valor da empresa (Enterprise Value = Market Cap + Dívida Líquida) em relação ao EBITDA (resultado antes de juros, impostos, depreciação e amortização). Aplicável a empresas maduras com EBITDA positivo. Não recomendado para early-stage ou setores regulados (utilities/bancos).' },
    { titulo: 'EV/Receita', cor: '#8b5cf6', conteudo: 'Usado quando a empresa tem EBITDA negativo ou margem em compressão temporária. Comum em tech/SaaS e empresas de alto crescimento. Deve ser complementado com análise de trajetória de margem. Múltiplos de 3x–8x para SaaS recorrente são benchmark global.' },
    { titulo: 'Prêmio de Controle', cor: '#eab308', conteudo: 'Em aquisições de controle (>50%), o adquirente tipicamente paga prêmio de 20–40% sobre o preço de mercado do ativo. Em processos competitivos (leilões), pode superar 50%. O prêmio reflete o valor do controle estratégico e sinergias esperadas.' },
    { titulo: 'Small Cap Discount', cor: '#f97316', conteudo: 'Empresas menores negociam com desconto de 15–30% vs peers maiores. Menor liquidez, maior risco de concentração de clientes/gestão, custo de capital mais alto. Em M&A, compradores estratégicos pagam menos discount que PE (podem integrar e eliminar riscos).' },
    { titulo: 'Entrada vs Saída (PE)', cor: '#22c55e', conteudo: 'Múltiplos de entrada (quando PE compra) vs saída (quando PE vende) raramente são iguais. PE busca expansão de múltiplo via crescimento, melhoria de margens e narrativa de mercado. Expansão típica: 2–4x turns de EBITDA em horizonte de 4–7 anos.' },
    { titulo: 'P/B e P/FFO', cor: '#06b6d4', conteudo: 'P/B (Price to Book) é o múltiplo primário para bancos e seguradoras, onde o balanço patrimonial é o ativo central. P/FFO (Price to Funds From Operations) é o equivalente do P/L para FIIs e REITs, ajustando pelo non-cash de depreciação de imóveis.' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20, borderLeft: `3px solid ${item.cor}` }}>
          <div style={{ color: item.cor, fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{item.titulo}</div>
          <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{item.conteudo}</p>
        </div>
      ))}
    </div>
  )
}

// ─── MAIN ──────────────────────────────────────────────────────

const TABS = ['Por Setor', 'Comparáveis Públicos', 'Evolução Histórica', 'Metodologia']
const PERIODOS = ['1A', '2A', '3A', '5A']
const PORTES = ['Todos', '<R$500M', '>R$500M']

export default function Multiplos() {
  const [tab, setTab] = useState('Por Setor')
  const [periodo, setPeriodo] = useState('3A')
  const [porte, setPorte] = useState('Todos')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 800, margin: '0 0 6px' }}>Referência de Valuation para M&A — Brasil</h2>
            <p style={{ color: '#64748b', fontSize: 12, margin: 0, maxWidth: 600 }}>
              Múltiplos baseados em transações fechadas e comparáveis públicos B3. Período de referência configurável. <strong style={{ color: '#94a3b8' }}>Não constitui recomendação de investimento.</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {PERIODOS.map(p => (
              <button key={p} onClick={() => setPeriodo(p)} style={{ padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: periodo === p ? '#3b82f6' : '#151924', color: periodo === p ? 'white' : '#94a3b8', border: periodo === p ? '1px solid transparent' : '1px solid #2a2f42' }}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #2a2f42' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '10px 20px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
            background: 'transparent', color: tab === t ? '#3b82f6' : '#64748b',
            borderBottom: tab === t ? '2px solid #3b82f6' : '2px solid transparent',
            transition: 'all 0.15s'
          }}>{t}</button>
        ))}
      </div>

      {/* Content */}
      {tab === 'Por Setor' && <TabPorSetor periodo={periodo} porte={porte} />}
      {tab === 'Comparáveis Públicos' && <TabComparaveis />}
      {tab === 'Evolução Histórica' && <TabEvolucao />}
      {tab === 'Metodologia' && <TabMetodologia />}
    </div>
  )
}
