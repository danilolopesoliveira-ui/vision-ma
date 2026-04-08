import { useState } from 'react'
import Termometro from '../components/Termometro'

const PERIODOS = [
  { key: '3M', label: '3 Meses' },
  { key: '6M', label: '6 Meses' },
  { key: '1A', label: '1 Ano' },
  { key: '2A', label: '2 Anos' },
  { key: '3A', label: '3 Anos' },
]

const SETORES = [
  'Saúde', 'Tecnologia', 'Energia', 'Financeiro', 'Agronegócio',
  'Telecomunicações', 'Consumo Cíclico', 'Consumo Não-Cíclico',
  'Infraestrutura', 'Imobiliário', 'Materiais Básicos', 'Educação'
]

const BOLETIM_ITENS = [
  { id: 'capa', label: 'Capa com branding Vision M&A e período' },
  { id: 'kpis', label: 'Sumário executivo com 6 KPIs de mercado' },
  { id: 'termometros', label: 'Termômetros por setor (12 setores)' },
  { id: 'deals', label: 'Tabela dos últimos deals fechados' },
  { id: 'pipeline', label: 'Resumo do pipeline ativo' },
  { id: 'rankings', label: 'Rankings dos Top 5 assessores' },
  { id: 'outlook', label: 'Outlook e perspectivas de mercado' },
  { id: 'regulatorio', label: 'Atualizações regulatórias (CADE/CVM)' },
]

const SETORIAL_ITENS = [
  { id: 'capa_s', label: 'Capa com setor selecionado e data' },
  { id: 'termometro_s', label: 'Termômetro e nível de atividade M&A' },
  { id: 'historico', label: 'Histórico de deals 2019–2024 (gráfico)' },
  { id: 'compradores', label: 'Top compradores estratégicos e PE' },
  { id: 'targets', label: 'Mapa de targets potenciais' },
  { id: 'multiplos_s', label: 'Tabela de múltiplos de referência' },
  { id: 'teses', label: 'Teses estratégicas de consolidação' },
  { id: 'riscos', label: 'Fatores de risco identificados' },
]

const SETOR_DATA = {
  'Saúde': { termometro: 4, outlook: 'Setor aquecido com forte consolidação hospitalar, expansão de operadoras e interesse crescente de PE. Deals em oncologia e diagnósticos lideram o pipeline.', multiplos: 'EV/EBITDA 11–14x (hospitalar), 13–17x (diagnósticos)', deals_recentes: ["Rede D'Or / Hospital SP – R$800M", 'Hapvida / Rede Nordeste – R$420M', 'Advent / Diagnóstico Sul – R$600M'] },
  'Tecnologia': { termometro: 4, outlook: 'Setor tech mantém ritmo forte, com destaque para SaaS B2B, IA e fintechs. Valuations se normalizam após correção de 2022-23.', multiplos: 'EV/Receita 3–6x (SaaS), EV/EBITDA 15–20x', deals_recentes: ['TOTVS / Startup IA – R$180M', 'Fintech B2B stealth – US$50M', 'SaaS B2B Série B – R$80M'] },
  'Energia': { termometro: 3, outlook: 'M&A em energia segue ativo em renováveis (eólica, solar) e transição energética. Ativos termelétricos consolidam com players maiores.', multiplos: 'EV/EBITDA 8–12x', deals_recentes: ['Projeto Eólico NE – R$800M', 'CELSE / Eneva – confirmado', 'Solar portfolio – R$400M'] },
}

const KPIS = [
  { label: 'Deals Fechados (12M)', valor: '312', variacao: '+8%', cor: '#22c55e' },
  { label: 'Volume Total', valor: 'R$420B', variacao: '+14%', cor: '#3b82f6' },
  { label: 'Ticket Médio', valor: 'R$1.35B', variacao: '+6%', cor: '#f97316' },
  { label: 'Deals Cross-border', valor: '87', variacao: '+22%', cor: '#8b5cf6' },
  { label: 'CADE Aprovações', valor: '48', variacao: '-3%', cor: '#eab308' },
  { label: 'Deals PE/VC', valor: '94', variacao: '+11%', cor: '#06b6d4' },
]

const TOP_ASSESSORES = [
  { rank: 1, nome: 'BTG Pactual', deals: 28, volume: 'R$42.8B' },
  { rank: 2, nome: 'Itaú BBA', deals: 24, volume: 'R$38.4B' },
  { rank: 3, nome: 'Bradesco BBI', deals: 18, volume: 'R$22.6B' },
  { rank: 4, nome: 'Goldman Sachs BR', deals: 14, volume: 'R$28.4B' },
  { rank: 5, nome: 'Morgan Stanley BR', deals: 12, volume: 'R$18.2B' },
]

const TERMOMETROS_SETORES = [
  { setor: 'Saúde', nivel: 4, emoji: '🏥' },
  { setor: 'Tecnologia', nivel: 4, emoji: '💻' },
  { setor: 'Energia', nivel: 3, emoji: '⚡' },
  { setor: 'Financeiro', nivel: 3, emoji: '🏦' },
  { setor: 'Agronegócio', nivel: 3, emoji: '🌾' },
  { setor: 'Telecom', nivel: 2, emoji: '📡' },
  { setor: 'Consumo Cíclico', nivel: 2, emoji: '🛍️' },
  { setor: 'Consumo N-Cíclico', nivel: 3, emoji: '🛒' },
  { setor: 'Infraestrutura', nivel: 3, emoji: '🏗️' },
  { setor: 'Imobiliário', nivel: 2, emoji: '🏢' },
  { setor: 'Mat. Básicos', nivel: 3, emoji: '⛏️' },
  { setor: 'Educação', nivel: 2, emoji: '🎓' },
]

const NIVEL_LABELS = { 1: 'Frio ❄️', 2: 'Morno 🌤️', 3: 'Ativo ☀️', 4: 'Aquecido 🔥', 5: 'Ebulição 🚀' }
const NIVEL_COLORS = { 1: '#6b7280', 2: '#60a5fa', 3: '#eab308', 4: '#f97316', 5: '#ef4444' }
const NIVEL_PCT = { 1: 10, 2: 35, 3: 60, 4: 80, 5: 100 }

function generateBoletimHTML(periodo, periodoLabel) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  const kpiRows = KPIS.map(k => `
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;text-align:center;">
      <div style="color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">${k.label}</div>
      <div style="color:#1e293b;font-size:24px;font-weight:800;">${k.valor}</div>
      <div style="color:${k.variacao.startsWith('+') ? '#16a34a' : '#dc2626'};font-size:12px;font-weight:600;margin-top:4px;">${k.variacao} vs período anterior</div>
    </div>
  `).join('')

  const termoRows = TERMOMETROS_SETORES.map(t => {
    const pct = NIVEL_PCT[t.nivel]
    const color = NIVEL_COLORS[t.nivel]
    const label = NIVEL_LABELS[t.nivel]
    const bar = `<div style="background:#e2e8f0;border-radius:9999px;height:8px;overflow:hidden;"><div style="width:${pct}%;height:100%;background:linear-gradient(90deg,#3b82f6,${color});border-radius:9999px;"></div></div>`
    return `
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
          <span style="font-size:20px;">${t.emoji}</span>
          <span style="font-weight:700;font-size:14px;color:#1e293b;">${t.setor}</span>
        </div>
        <div style="color:${color};font-weight:700;font-size:12px;margin-bottom:6px;">${label}</div>
        ${bar}
      </div>
    `
  }).join('')

  const assRows = TOP_ASSESSORES.map(a => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#3b82f6;">#${a.rank}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#1e293b;">${a.nome}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;text-align:center;color:#1e293b;">${a.deals}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#1e293b;">${a.volume}</td>
    </tr>
  `).join('')

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Boletim M&A – ${periodoLabel}</title>
<style>
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page-break { page-break-after: always; }
  }
  body { font-family: Inter, system-ui, sans-serif; background: #fff; color: #1e293b; margin: 0; padding: 0; }
  * { box-sizing: border-box; }
</style>
</head>
<body>
<!-- COVER PAGE -->
<div style="background:linear-gradient(135deg,#0f1117 0%,#1a1f2e 60%,#0f1117 100%);min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:60px 40px;" class="page-break">
  <div style="color:#3b82f6;font-size:13px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:16px;">Vision M&A Intelligence</div>
  <div style="color:#fff;font-size:42px;font-weight:900;text-align:center;line-height:1.2;margin-bottom:12px;">Boletim de Mercado<br>M&A Brasil</div>
  <div style="color:#94a3b8;font-size:18px;margin-bottom:8px;">Período: ${periodoLabel}</div>
  <div style="color:#64748b;font-size:14px;">Gerado em ${dateStr}</div>
  <div style="margin-top:48px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:500px;">
    ${KPIS.slice(0,3).map(k => `
      <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px;text-align:center;">
        <div style="color:${k.cor};font-size:22px;font-weight:800;">${k.valor}</div>
        <div style="color:#64748b;font-size:10px;margin-top:4px;">${k.label}</div>
      </div>
    `).join('')}
  </div>
</div>

<!-- KPIs PAGE -->
<div style="padding:48px 40px;" class="page-break">
  <div style="color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">SUMÁRIO EXECUTIVO</div>
  <div style="color:#1e293b;font-size:26px;font-weight:800;margin-bottom:24px;">Indicadores do Período</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;">
    ${kpiRows}
  </div>
</div>

<!-- THERMOMETERS PAGE -->
<div style="padding:48px 40px;" class="page-break">
  <div style="color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">ANÁLISE SETORIAL</div>
  <div style="color:#1e293b;font-size:26px;font-weight:800;margin-bottom:24px;">Termômetros por Setor</div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
    ${termoRows}
  </div>
</div>

<!-- RANKINGS PAGE -->
<div style="padding:48px 40px;">
  <div style="color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">RANKINGS</div>
  <div style="color:#1e293b;font-size:26px;font-weight:800;margin-bottom:24px;">Top 5 Assessores Financeiros</div>
  <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
    <thead>
      <tr style="background:#1e293b;">
        <th style="padding:12px 14px;text-align:left;color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;">Rank</th>
        <th style="padding:12px 14px;text-align:left;color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;">Assessor</th>
        <th style="padding:12px 14px;text-align:center;color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;">Deals 12M</th>
        <th style="padding:12px 14px;text-align:right;color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;">Volume</th>
      </tr>
    </thead>
    <tbody>
      ${assRows}
    </tbody>
  </table>
  <div style="margin-top:40px;padding-top:20px;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:11px;text-align:center;">
    Vision M&A Intelligence Platform — Relatório gerado em ${dateStr} — Confidencial
  </div>
</div>

<script>window.onload = () => window.print()</script>
</body>
</html>`
}

function generateSetorialHTML(setor) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  const data = SETOR_DATA[setor] || { termometro: 3, outlook: `Análise detalhada do setor ${setor}. Dados em atualização.`, multiplos: 'Em compilação', deals_recentes: ['Deal A', 'Deal B', 'Deal C'] }

  const nivel = data.termometro
  const color = NIVEL_COLORS[nivel]
  const pct = NIVEL_PCT[nivel]
  const label = NIVEL_LABELS[nivel]

  const dealRows = (data.deals_recentes || []).map((d, i) => `
    <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:${i % 2 === 0 ? '#f8fafc' : '#fff'};border-radius:8px;margin-bottom:6px;">
      <span style="color:#3b82f6;font-weight:700;font-size:13px;">${i + 1}.</span>
      <span style="color:#1e293b;font-size:14px;">${d}</span>
    </div>
  `).join('')

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Análise Setorial — ${setor}</title>
<style>
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page-break { page-break-after: always; }
  }
  body { font-family: Inter, system-ui, sans-serif; background: #fff; color: #1e293b; margin: 0; padding: 0; }
  * { box-sizing: border-box; }
</style>
</head>
<body>
<!-- COVER -->
<div style="background:linear-gradient(135deg,#0f1117 0%,#1a1f2e 100%);min-height:50vh;padding:60px 40px;display:flex;flex-direction:column;justify-content:center;" class="page-break">
  <div style="color:#3b82f6;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:12px;">Vision M&A Intelligence</div>
  <div style="color:#94a3b8;font-size:16px;margin-bottom:8px;">Análise Setorial</div>
  <div style="color:#fff;font-size:40px;font-weight:900;margin-bottom:8px;">${setor}</div>
  <div style="color:#64748b;font-size:14px;">Gerado em ${dateStr}</div>
  <div style="margin-top:32px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:20px;max-width:300px;">
    <div style="color:${color};font-weight:700;font-size:15px;margin-bottom:10px;">${label}</div>
    <div style="background:rgba(255,255,255,0.1);border-radius:9999px;height:10px;overflow:hidden;">
      <div style="width:${pct}%;height:100%;background:linear-gradient(90deg,#3b82f6,${color});border-radius:9999px;"></div>
    </div>
    <div style="color:#64748b;font-size:12px;margin-top:8px;">Nível de atividade M&A: ${nivel}/5</div>
  </div>
</div>

<!-- CONTENT -->
<div style="padding:48px 40px;">
  <div style="margin-bottom:32px;">
    <div style="color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">OUTLOOK DO SETOR</div>
    <p style="color:#1e293b;font-size:15px;line-height:1.8;margin:0;padding:20px;background:#f8fafc;border-left:4px solid ${color};border-radius:0 8px 8px 0;">${data.outlook}</p>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px;">
    <div>
      <div style="color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px;">MÚLTIPLOS DE REFERÊNCIA</div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;">
        <div style="color:#f97316;font-size:16px;font-weight:700;">${data.multiplos}</div>
        <div style="color:#94a3b8;font-size:12px;margin-top:6px;">Referência de mercado 2024</div>
      </div>
    </div>
    <div>
      <div style="color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px;">STATUS DO MERCADO</div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:12px;height:12px;background:${color};border-radius:50%;"></div>
          <div style="color:${color};font-size:16px;font-weight:700;">${label}</div>
        </div>
        <div style="color:#94a3b8;font-size:12px;margin-top:6px;">Atividade M&A: ${nivel}/5</div>
      </div>
    </div>
  </div>

  <div>
    <div style="color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px;">DEALS RECENTES DE REFERÊNCIA</div>
    ${dealRows}
  </div>

  <div style="margin-top:48px;padding-top:20px;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:11px;text-align:center;">
    Vision M&A Intelligence Platform — Análise Setorial: ${setor} — Gerado em ${dateStr} — Confidencial
  </div>
</div>

<script>window.onload = () => window.print()</script>
</body>
</html>`
}

function generateReport(type, periodo, setor) {
  const periodoLabel = PERIODOS.find(p => p.key === periodo)?.label || periodo
  const html = type === 'boletim'
    ? generateBoletimHTML(periodo, periodoLabel)
    : generateSetorialHTML(setor)
  const win = window.open('', '_blank')
  if (win) {
    win.document.write(html)
    win.document.close()
  }
}

function ChecklistItem({ label, checked = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(42,47,66,0.5)' }}>
      <div style={{ width: 18, height: 18, borderRadius: 4, background: checked ? 'rgba(34,197,94,0.2)' : 'rgba(42,47,66,0.5)', border: `1px solid ${checked ? '#22c55e' : '#2a2f42'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {checked && <span style={{ color: '#22c55e', fontSize: 11, fontWeight: 800 }}>✓</span>}
      </div>
      <span style={{ color: '#94a3b8', fontSize: 13 }}>{label}</span>
    </div>
  )
}

export default function Relatorio() {
  const [periodoBoletim, setPeriodoBoletim] = useState('1A')
  const [setorAnalise, setSetorAnalise] = useState('')
  const [gerandoBoletim, setGerandoBoletim] = useState(false)
  const [gerandoSetorial, setGerandoSetorial] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleBoletim = () => {
    setGerandoBoletim(true)
    setTimeout(() => {
      generateReport('boletim', periodoBoletim, null)
      setGerandoBoletim(false)
      showToast('Relatório gerado! Verifique a janela de impressão.')
    }, 800)
  }

  const handleSetorial = () => {
    if (!setorAnalise) { showToast('Selecione um setor', 'error'); return }
    setGerandoSetorial(true)
    setTimeout(() => {
      generateReport('setorial', null, setorAnalise)
      setGerandoSetorial(false)
      showToast(`Análise de ${setorAnalise} gerada!`)
    }, 800)
  }

  const card = (children) => (
    <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 14, padding: 28 }}>
      {children}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', padding: '24px 32px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: '#1a1f2e', border: `1px solid ${toast.type === 'error' ? '#ef4444' : '#22c55e'}`, borderRadius: 10, padding: '12px 18px', color: toast.type === 'error' ? '#ef4444' : '#22c55e', fontSize: 13, fontWeight: 600, zIndex: 9999, boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
          {toast.msg}
        </div>
      )}

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#f1f5f9', fontSize: 26, fontWeight: 800, margin: 0 }}>Gerador de Relatórios</h1>
        <p style={{ color: '#64748b', fontSize: 14, margin: '4px 0 0' }}>Gere relatórios em PDF prontos para cliente ou apresentação interna</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* SECTION 1 — Boletim de Mercado */}
        {card(
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ background: 'rgba(59,130,246,0.2)', color: '#3b82f6', borderRadius: 8, padding: '4px 12px', fontSize: 11, fontWeight: 700 }}>SEÇÃO 1</span>
              </div>
              <h2 style={{ color: '#f1f5f9', fontSize: 20, fontWeight: 800, margin: 0 }}>Boletim de Mercado M&A</h2>
              <p style={{ color: '#64748b', fontSize: 13, margin: '6px 0 0', lineHeight: 1.5 }}>
                Relatório completo com KPIs, termômetros setoriais, rankings e outlook de mercado.
              </p>
            </div>

            {/* Period Selector */}
            <div>
              <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Período de Análise</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {PERIODOS.map(p => (
                  <button
                    key={p.key}
                    onClick={() => setPeriodoBoletim(p.key)}
                    style={{
                      background: periodoBoletim === p.key ? '#3b82f6' : 'rgba(42,47,66,0.5)',
                      color: periodoBoletim === p.key ? '#fff' : '#64748b',
                      border: `1px solid ${periodoBoletim === p.key ? '#3b82f6' : '#2a2f42'}`,
                      borderRadius: 8,
                      padding: '7px 16px',
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {p.key}
                  </button>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div>
              <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Conteúdo Incluído</div>
              <div style={{ background: '#0f1117', borderRadius: 10, padding: '4px 14px' }}>
                {BOLETIM_ITENS.map(item => <ChecklistItem key={item.id} label={item.label} />)}
              </div>
            </div>

            {/* Preview info */}
            <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>📄</span>
              <div>
                <div style={{ color: '#3b82f6', fontWeight: 600, fontSize: 13 }}>Prévia do Relatório</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>
                  Boletim M&A — {PERIODOS.find(p => p.key === periodoBoletim)?.label} — Gerado em {new Date().toLocaleDateString('pt-BR')}
                </div>
                <div style={{ color: '#64748b', fontSize: 12 }}>
                  {KPIS.length} KPIs · {TERMOMETROS_SETORES.length} setores · {TOP_ASSESSORES.length} assessores · ~4 páginas
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleBoletim}
              disabled={gerandoBoletim}
              style={{
                background: gerandoBoletim ? 'rgba(59,130,246,0.4)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '14px 24px',
                fontSize: 15,
                fontWeight: 700,
                cursor: gerandoBoletim ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                boxShadow: gerandoBoletim ? 'none' : '0 4px 16px rgba(59,130,246,0.3)',
                transition: 'all 0.2s',
              }}
            >
              {gerandoBoletim ? (
                <>
                  <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
                  Gerando PDF...
                </>
              ) : (
                <>📊 Gerar e Baixar Relatório PDF</>
              )}
            </button>
          </div>
        )}

        {/* SECTION 2 — Análise Setorial */}
        {card(
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ background: 'rgba(139,92,246,0.2)', color: '#8b5cf6', borderRadius: 8, padding: '4px 12px', fontSize: 11, fontWeight: 700 }}>SEÇÃO 2</span>
              </div>
              <h2 style={{ color: '#f1f5f9', fontSize: 20, fontWeight: 800, margin: 0 }}>Análise Setorial</h2>
              <p style={{ color: '#64748b', fontSize: 13, margin: '6px 0 0', lineHeight: 1.5 }}>
                Relatório focado em um setor específico com múltiplos, teses e targets potenciais.
              </p>
            </div>

            {/* Sector Dropdown */}
            <div>
              <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Setor de Análise</div>
              <select
                value={setorAnalise}
                onChange={e => setSetorAnalise(e.target.value)}
                style={{ width: '100%', background: '#0f1117', border: `1px solid ${setorAnalise ? '#8b5cf6' : '#2a2f42'}`, color: setorAnalise ? '#f1f5f9' : '#64748b', borderRadius: 8, padding: '10px 14px', fontSize: 14, cursor: 'pointer', outline: 'none' }}
              >
                <option value="">Selecione um setor...</option>
                {SETORES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Checklist */}
            <div>
              <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Conteúdo Incluído</div>
              <div style={{ background: '#0f1117', borderRadius: 10, padding: '4px 14px' }}>
                {SETORIAL_ITENS.map(item => <ChecklistItem key={item.id} label={item.label} />)}
              </div>
            </div>

            {/* Preview */}
            <div style={{ background: setorAnalise ? 'rgba(139,92,246,0.06)' : 'rgba(42,47,66,0.3)', border: `1px solid ${setorAnalise ? 'rgba(139,92,246,0.2)' : '#2a2f42'}`, borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>📋</span>
              <div>
                <div style={{ color: setorAnalise ? '#8b5cf6' : '#64748b', fontWeight: 600, fontSize: 13 }}>
                  {setorAnalise ? `Análise Setorial — ${setorAnalise}` : 'Prévia do Relatório'}
                </div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>
                  {setorAnalise
                    ? `Gerado em ${new Date().toLocaleDateString('pt-BR')} · ~2 páginas`
                    : 'Selecione um setor para ver a prévia'}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleSetorial}
              disabled={gerandoSetorial || !setorAnalise}
              style={{
                background: !setorAnalise
                  ? 'rgba(42,47,66,0.5)'
                  : gerandoSetorial
                    ? 'rgba(139,92,246,0.4)'
                    : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: !setorAnalise ? '#64748b' : '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '14px 24px',
                fontSize: 15,
                fontWeight: 700,
                cursor: !setorAnalise || gerandoSetorial ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                boxShadow: !setorAnalise || gerandoSetorial ? 'none' : '0 4px 16px rgba(139,92,246,0.3)',
                transition: 'all 0.2s',
              }}
            >
              {gerandoSetorial ? (
                <>⏳ Gerando PDF...</>
              ) : (
                <>🏢 Gerar Análise Setorial PDF</>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Tips section */}
      <div style={{ marginTop: 24, background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: '18px 24px' }}>
        <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Como Usar</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { icon: '🖨️', title: 'Impressão / PDF', desc: 'O relatório abre em nova janela. Use Ctrl+P ou o diálogo de impressão e escolha "Salvar como PDF".' },
            { icon: '🎨', title: 'Formatação', desc: 'Os relatórios usam cores otimizadas para impressão. Ative "Gráficos de fundo" nas opções avançadas.' },
            { icon: '📤', title: 'Compartilhamento', desc: 'Salve o PDF e compartilhe diretamente com clientes ou use como base para apresentações.' },
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22 }}>{tip.icon}</span>
              <div>
                <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{tip.title}</div>
                <div style={{ color: '#64748b', fontSize: 12, lineHeight: 1.5 }}>{tip.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
