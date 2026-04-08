import { useState } from 'react'
import Termometro from '../components/Termometro'

const BANCOS = [
  { id: 'btg', nome: 'BTG Pactual', tipo: 'Banco', deals_12m: 28, volume_bi: 42.8, top_setores: ['Financeiro', 'Energia', 'Infraestrutura'], ultimas: ["Rede D'Or/SulAmérica (2022)", 'Eletrobras IPO (2022)', 'Vibra/Comerc (2023)'], cor: '#3b82f6' },
  { id: 'itau', nome: 'Itaú BBA', tipo: 'Banco', deals_12m: 24, volume_bi: 38.4, top_setores: ['Saúde', 'Consumo', 'Financeiro'], ultimas: ['Hapvida/NDI (2022)', 'StoneCo/Linx (2021)', 'Allos/Multiplan (2024)'], cor: '#22c55e' },
  { id: 'bradesco', nome: 'Bradesco BBI', tipo: 'Banco', deals_12m: 18, volume_bi: 22.6, top_setores: ['Agro', 'Energia', 'Consumo'], ultimas: ['Localiza/Unidas (2022)', 'BRF/Marfrig (2022)', 'Ânima/Laureate (2021)'], cor: '#eab308' },
  { id: 'gs', nome: 'Goldman Sachs BR', tipo: 'Banco', deals_12m: 14, volume_bi: 28.4, top_setores: ['Tech', 'Cross-border', 'PE/VC'], ultimas: ['SoftBank/iFood (2021)', 'Eve/SPAC (2022)', 'Carrefour/BIG (2021)'], cor: '#f97316' },
  { id: 'ms', nome: 'Morgan Stanley BR', tipo: 'Banco', deals_12m: 12, volume_bi: 18.2, top_setores: ['Cross-border', 'Energia', 'Mineração'], ultimas: ['Hapvida/NDI (2021)', 'Vale JV (2022)', 'Eneva/CELSE (2023)'], cor: '#8b5cf6' },
  { id: 'rothschild', nome: 'Rothschild & Co', tipo: 'Boutique', deals_12m: 10, volume_bi: 12.4, top_setores: ['Distressed', 'Restructuring', 'M&A'], ultimas: ['Oi Telecom RJ (2022)', 'Totvs/Supplier (2023)', 'Deal Saúde (2024)'], cor: '#ef4444' },
  { id: 'ubs', nome: 'UBS BB', tipo: 'Banco', deals_12m: 11, volume_bi: 14.8, top_setores: ['Tech', 'Saúde', 'Financeiro'], ultimas: ['Totvs/Supplier (2023)', 'Qualicorp deal (2022)', 'Fintech X (2024)'], cor: '#06b6d4' },
  { id: 'citi', nome: 'Citi Brasil', tipo: 'Banco', deals_12m: 9, volume_bi: 16.2, top_setores: ['Cross-border', 'Energia', 'Telecom'], ultimas: ['Eletrobras (2022)', 'TIM Brasil tower (2023)', 'Oil deal (2022)'], cor: '#60a5fa' },
  { id: 'vinci', nome: 'Vinci Partners Advisory', tipo: 'Boutique', deals_12m: 7, volume_bi: 8.4, top_setores: ['Infra', 'PE/VC', 'Real Assets'], ultimas: ['Hidrovias do Brasil (2021)', 'Allpark (2023)', 'Infra deal (2024)'], cor: '#a78bfa' },
  { id: 'plural', nome: 'Brasil Plural', tipo: 'Boutique', deals_12m: 6, volume_bi: 4.2, top_setores: ['Mid-market', 'Saúde', 'Educação'], ultimas: ['Cogna carve-out (2022)', 'Saúde mid (2023)', 'Tech mid (2024)'], cor: '#34d399' },
]

const JURIDICOS = [
  { id: 'machado', nome: 'Machado Meyer', tipo: 'Escritório', deals_12m: 32, top_setores: ['M&A Geral', 'Regulatório', 'Financeiro'], ultimas: ["Rede D'Or/SulAmérica", 'Eletrobras', 'Petz/Cobasi'], cor: '#3b82f6' },
  { id: 'pinheiro', nome: 'Pinheiro Neto', tipo: 'Escritório', deals_12m: 28, top_setores: ['Cross-border', 'PE/VC', 'Capital Markets'], ultimas: ["SulAmérica/Rede D'Or", 'Eve SPAC', 'Carrefour/BIG'], cor: '#8b5cf6' },
  { id: 'lefosse', nome: 'Lefosse Advogados', tipo: 'Boutique Jurídica', deals_12m: 22, top_setores: ['M&A', 'PE/VC', 'Financiamento'], ultimas: ['Localiza/Unidas', 'QuintoAndar/Advent', 'StoneCo/Linx'], cor: '#22c55e' },
  { id: 'tozzini', nome: 'TozziniFreire', tipo: 'Escritório', deals_12m: 20, top_setores: ['Agro', 'Energia', 'Infraestrutura'], ultimas: ['Hapvida/NDI', 'BRF/Marfrig', 'Eneva/CELSE'], cor: '#f97316' },
  { id: 'mattos', nome: 'Mattos Filho', tipo: 'Escritório', deals_12m: 18, top_setores: ['Regulatório', 'Financeiro', 'M&A'], ultimas: ['Localiza/Unidas', 'Ânima/Laureate', 'Deal PE (2023)'], cor: '#eab308' },
  { id: 'stocche', nome: 'Stocche Forbes', tipo: 'Boutique Jurídica', deals_12m: 16, top_setores: ['PE/VC', 'Tech', 'M&A'], ultimas: ['Hapvida/NDI', 'SoftBank/iFood', 'Advent/QuintoAndar'], cor: '#ef4444' },
  { id: 'souza', nome: 'Souza Cescon', tipo: 'Escritório', deals_12m: 14, top_setores: ['Energia', 'Infraestrutura', 'M&A'], ultimas: ['Eneva/CELSE', 'Vibra/Comerc', 'Infraestrutura Z'], cor: '#06b6d4' },
  { id: 'bma', nome: 'BMA Advogados', tipo: 'Boutique Jurídica', deals_12m: 12, top_setores: ['Tech', 'Fintech', 'M&A'], ultimas: ['Totvs/Supplier', 'Fintech deal', 'Tech mid-market'], cor: '#a78bfa' },
  { id: 'campos', nome: 'Campos Mello', tipo: 'Escritório', deals_12m: 10, top_setores: ['Cross-border', 'Capital Markets', 'M&A'], ultimas: ['Cross-border deal A', 'PE deal B', 'Capital markets C'], cor: '#60a5fa' },
  { id: 'demarest', nome: 'Demarest', tipo: 'Escritório', deals_12m: 9, top_setores: ['Contencioso M&A', 'Regulatório', 'Geral'], ultimas: ['Totvs/Supplier (jurídico vendedor)', 'Distressed deal', 'Mid-market deal'], cor: '#34d399' },
]

const PEVC = [
  { nome: 'SoftBank Latin America Fund', tipo: 'VC/Growth', aum: '~US$ 8B', foco: ['Tech', 'Fintech', 'Consumer'], estagio: 'Growth / Late Stage', portfolio: [{ empresa: 'iFood', setor: 'Food Tech' }, { empresa: 'QuintoAndar', setor: 'PropTech' }, { empresa: 'Gympass/Wellhub', setor: 'HR Tech' }], ops_recentes: [{ tipo: 'entrada', data: 'Mai/24', empresa: 'QuintoAndar Series E', valor: 'R$600M' }, { tipo: 'saida', data: 'Fev/24', empresa: 'Exit parcial MadeiraMadeira', valor: '-' }, { tipo: 'followon', data: 'Nov/23', empresa: 'Kavak Follow-on', valor: 'US$100M' }], co_investidores: ['Kaszek', 'Monashees', 'Tiger Global'], website: 'https://softbank.com' },
  { nome: 'Advent International', tipo: 'PE Buyout', aum: '~US$ 25B global', foco: ['Financeiro', 'Saúde', 'Tech', 'Varejo'], estagio: 'Buyout / Control', portfolio: [{ empresa: 'Fleury Diagnósticos', setor: 'Saúde' }, { empresa: 'QuintoAndar', setor: 'PropTech' }, { empresa: 'Maximus', setor: 'Serviços' }], ops_recentes: [{ tipo: 'entrada', data: 'Jul/23', empresa: 'QuintoAndar Growth', valor: 'US$300M' }, { tipo: 'saida', data: 'Mar/23', empresa: 'Exit Grupo Fleury parcial', valor: '-' }, { tipo: 'entrada', data: 'Nov/22', empresa: 'Viveo Saúde', valor: 'R$2.1B' }], co_investidores: ['Warburg Pincus', 'General Atlantic', 'KKR LatAm'], website: 'https://adventinternational.com' },
  { nome: 'Kaszek Ventures', tipo: 'VC', aum: '~US$ 4B', foco: ['Fintech', 'SaaS', 'Health', 'Commerce'], estagio: 'Series A–C', portfolio: [{ empresa: 'Nubank', setor: 'Fintech' }, { empresa: 'Creditas', setor: 'Fintech' }, { empresa: 'Nuvemshop', setor: 'E-commerce' }], ops_recentes: [{ tipo: 'saida', data: 'Ago/23', empresa: 'Nubank — exit parcial (NYSE)', valor: '-' }, { tipo: 'entrada', data: 'Abr/24', empresa: 'Fintech B2B (stealth)', valor: 'US$50M' }, { tipo: 'followon', data: 'Jan/24', empresa: 'Creditas Series F', valor: 'US$80M' }], co_investidores: ['Sequoia', 'Tiger Global', 'SoftBank'], website: 'https://kaszek.com' },
  { nome: 'Patria Investments', tipo: 'PE/Infra', aum: 'US$ 40B', foco: ['Infraestrutura', 'Agro', 'Real Assets'], estagio: 'Buyout / Infra', portfolio: [{ empresa: 'Hidrovias do Brasil', setor: 'Logística' }, { empresa: 'Allpark', setor: 'Infraestrutura Urbana' }, { empresa: 'Usina São Martinho (JV)', setor: 'Agro' }], ops_recentes: [{ tipo: 'entrada', data: 'Mar/24', empresa: 'Fundo Infra IV — 1º closing', valor: 'R$2B' }, { tipo: 'saida', data: 'Out/23', empresa: 'Allpark — exit parcial', valor: '-' }, { tipo: 'entrada', data: 'Jun/23', empresa: 'Projeto Eólico NE', valor: 'R$800M' }], co_investidores: ['Blackstone', 'GIC Singapura', 'APG Holanda'], website: 'https://patria.com' },
  { nome: 'Vinci Partners PE', tipo: 'PE Mid-market', aum: 'R$ 18B', foco: ['Saúde', 'Educação', 'Serviços'], estagio: 'Buyout / Growth', portfolio: [{ empresa: 'Mater Dei', setor: 'Saúde' }, { empresa: 'Allpark', setor: 'Infraestrutura' }, { empresa: 'Grupo Sabin (JV)', setor: 'Diagnósticos' }], ops_recentes: [{ tipo: 'entrada', data: 'Abr/24', empresa: 'Hospital Nordeste', valor: 'R$400M' }, { tipo: 'followon', data: 'Dez/23', empresa: 'Mater Dei add-on SP', valor: 'R$150M' }, { tipo: 'entrada', data: 'Jun/23', empresa: 'Clínica Oncológica Sul', valor: 'R$280M' }], co_investidores: ['Patria', 'Mogno Capital', 'BNDESPAR'], website: 'https://vincipartners.com' },
  { nome: 'Monashees', tipo: 'VC', aum: '~US$ 800M', foco: ['Tech', 'B2B SaaS', 'Climate'], estagio: 'Seed – Series B', portfolio: [{ empresa: 'Loggi', setor: 'Logística' }, { empresa: 'Loft', setor: 'PropTech' }, { empresa: 'Olist', setor: 'Commerce' }], ops_recentes: [{ tipo: 'entrada', data: 'Mar/24', empresa: 'Agtech Série A', valor: 'US$8M' }, { tipo: 'followon', data: 'Nov/23', empresa: 'Loggi Series D', valor: 'US$25M' }, { tipo: 'saida', data: 'Ago/23', empresa: 'Olist — exit parcial via secondary', valor: '-' }], co_investidores: ['Kaszek', 'Canary', 'Valor Capital'], website: 'https://monashees.com.br' },
  { nome: 'Canary', tipo: 'VC Early', aum: '~R$ 600M', foco: ['Early Stage Tech', 'B2B SaaS'], estagio: 'Seed / Série A', portfolio: [{ empresa: 'Alice Saúde', setor: 'Healthtech' }, { empresa: 'Merama', setor: 'E-commerce' }, { empresa: 'Sallve', setor: 'Beautytech' }], ops_recentes: [{ tipo: 'entrada', data: 'Fev/24', empresa: 'SaaS B2B stealth', valor: 'R$5M' }, { tipo: 'entrada', data: 'Out/23', empresa: 'Fintech seed', valor: 'R$4M' }, { tipo: 'followon', data: 'Jun/23', empresa: 'Alice Saúde Série C', valor: 'R$30M' }], co_investidores: ['Kaszek', 'Monashees', 'Astella'], website: 'https://canary.vc' },
  { nome: 'Warburg Pincus BR', tipo: 'PE Buyout/Growth', aum: '~US$ 12B LatAm', foco: ['Financeiro', 'Saúde', 'Tech'], estagio: 'Growth / Buyout', portfolio: [{ empresa: 'C6 Bank', setor: 'Fintech' }, { empresa: 'Kora Saúde', setor: 'Saúde' }, { empresa: 'Ollo', setor: 'Logística' }], ops_recentes: [{ tipo: 'entrada', data: 'Jan/24', empresa: 'Kora Saúde add-on Nordeste', valor: 'R$300M' }, { tipo: 'followon', data: 'Set/23', empresa: 'C6 Bank Growth', valor: 'US$150M' }, { tipo: 'saida', data: 'Mai/23', empresa: 'Exit parcial XP Inc', valor: '-' }], co_investidores: ['Advent', 'General Atlantic', 'Softbank'], website: 'https://warburgpincus.com' },
  { nome: 'Astella Investimentos', tipo: 'VC', aum: '~R$ 400M', foco: ['SaaS B2B', 'Deep Tech'], estagio: 'Seed – Série A', portfolio: [{ empresa: 'Pipefy', setor: 'SaaS B2B' }, { empresa: 'Nuvemshop', setor: 'E-commerce' }, { empresa: 'CloudWalk', setor: 'Fintech' }], ops_recentes: [{ tipo: 'entrada', data: 'Mar/24', empresa: 'Deep Tech Seed', valor: 'R$6M' }, { tipo: 'followon', data: 'Dez/23', empresa: 'Pipefy follow-on', valor: 'US$20M' }, { tipo: 'entrada', data: 'Jul/23', empresa: 'B2B SaaS Série A', valor: 'R$12M' }], co_investidores: ['Canary', 'Monashees', 'Redpoint'], website: 'https://astella.com.br' },
  { nome: 'Valor Capital Group', tipo: 'VC', aum: '~US$ 500M', foco: ['Tech', 'Agtech', 'Fintech'], estagio: 'Seed – Série B', portfolio: [{ empresa: 'Agrosmart', setor: 'Agtech' }, { empresa: 'Cora', setor: 'Fintech B2B' }, { empresa: 'Tembici', setor: 'Mobilidade' }], ops_recentes: [{ tipo: 'entrada', data: 'Abr/24', empresa: 'Agtech Série B', valor: 'US$30M' }, { tipo: 'followon', data: 'Jan/24', empresa: 'Cora fintech growth', valor: 'US$40M' }, { tipo: 'saida', data: 'Out/23', empresa: 'Secondary Tembici', valor: '-' }], co_investidores: ['Monashees', 'Kaszek', 'Goldman Sachs'], website: 'https://valorcapital.com' },
]

const SETORES = ['Todos', 'Saúde', 'Tecnologia', 'Energia', 'Financeiro', 'Agronegócio', 'Consumo', 'Infraestrutura']
const TIPOS_DEAL = ['Todos', 'Aquisição', 'Fusão', 'Cross-border', 'PE/VC', 'Desinvestimento']
const PERIODOS = ['2024', '2023', '2022', 'Todos']
const PEVC_TIPOS = ['Todos', 'PE Buyout', 'VC', 'Growth']

const pill = (label, color = '#2a2f42', textColor = '#94a3b8') => (
  <span style={{ background: color, color: textColor, borderRadius: 9999, padding: '2px 10px', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
    {label}
  </span>
)

const tipoBadge = (tipo) => {
  const isBoutique = tipo === 'Boutique' || tipo === 'Boutique Jurídica'
  return (
    <span style={{ background: isBoutique ? 'rgba(139,92,246,0.15)' : 'rgba(59,130,246,0.15)', color: isBoutique ? '#8b5cf6' : '#3b82f6', borderRadius: 9999, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>
      {tipo}
    </span>
  )
}

const pevcTipoBadge = (tipo) => {
  const isVC = tipo.startsWith('VC') || tipo === 'Growth'
  return (
    <span style={{ background: isVC ? 'rgba(34,197,94,0.15)' : 'rgba(139,92,246,0.15)', color: isVC ? '#22c55e' : '#8b5cf6', borderRadius: 9999, padding: '3px 12px', fontSize: 12, fontWeight: 700 }}>
      {tipo}
    </span>
  )
}

const opIcon = (tipo) => {
  if (tipo === 'entrada') return '📥'
  if (tipo === 'saida') return '📤'
  return '🔄'
}

function BancoCard({ item, rank }) {
  return (
    <div style={{ background: '#1a1f2e', border: `1px solid #2a2f42`, borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 14, borderLeft: `3px solid ${item.cor}` }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: item.cor, color: '#fff', borderRadius: 6, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>#{rank}</span>
            <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 16 }}>{item.nome}</span>
          </div>
          <div>{tipoBadge(item.tipo)}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ color: item.cor, fontWeight: 800, fontSize: 28, lineHeight: 1 }}>{item.deals_12m}</div>
          <div style={{ color: '#64748b', fontSize: 11 }}>deals 12M</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Volume Assessorado</div>
          <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15 }}>R$ {item.volume_bi}B</div>
        </div>
      </div>

      <div>
        <div style={{ color: '#64748b', fontSize: 11, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top Setores</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {item.top_setores.map(s => pill(s, 'rgba(59,130,246,0.1)', '#60a5fa'))}
        </div>
      </div>

      <div>
        <div style={{ color: '#64748b', fontSize: 11, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Últimas Transações</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {item.ultimas.map((t, i) => (
            <div key={i} style={{ color: '#94a3b8', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: item.cor, fontSize: 10 }}>▸</span>
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function JuridicoCard({ item, rank }) {
  return (
    <div style={{ background: '#1a1f2e', border: `1px solid #2a2f42`, borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 14, borderLeft: `3px solid ${item.cor}` }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: item.cor, color: '#fff', borderRadius: 6, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>#{rank}</span>
            <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 16 }}>{item.nome}</span>
          </div>
          <div>{tipoBadge(item.tipo)}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ color: item.cor, fontWeight: 800, fontSize: 28, lineHeight: 1 }}>{item.deals_12m}</div>
          <div style={{ color: '#64748b', fontSize: 11 }}>deals 12M</div>
        </div>
      </div>

      <div>
        <div style={{ color: '#64748b', fontSize: 11, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Especialidades</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {item.top_setores.map(s => pill(s, 'rgba(139,92,246,0.1)', '#a78bfa'))}
        </div>
      </div>

      <div>
        <div style={{ color: '#64748b', fontSize: 11, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Operações Referência</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {item.ultimas.map((t, i) => (
            <div key={i} style={{ color: '#94a3b8', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: item.cor, fontSize: 10 }}>▸</span>
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PevcCard({ item }) {
  return (
    <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 17 }}>{item.nome}</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {pevcTipoBadge(item.tipo)}
            <span style={{ color: '#64748b', fontSize: 12 }}>AuM: <span style={{ color: '#94a3b8', fontWeight: 600 }}>{item.aum}</span></span>
          </div>
        </div>
        <a href={item.website} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', fontSize: 11, textDecoration: 'none', whiteSpace: 'nowrap', marginTop: 4 }}>
          Site ↗
        </a>
      </div>

      <div>
        <div style={{ color: '#64748b', fontSize: 11, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Foco Setorial</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {item.foco.map(f => pill(f, 'rgba(6,182,212,0.1)', '#06b6d4'))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ color: '#64748b', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estágio:</span>
        <span style={{ color: '#f97316', fontSize: 12, fontWeight: 600 }}>{item.estagio}</span>
      </div>

      <div>
        <div style={{ color: '#64748b', fontSize: 11, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Portfólio Ativo</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {item.portfolio.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(42,47,66,0.5)', borderRadius: 8, padding: '6px 10px' }}>
              <span style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 13 }}>{p.empresa}</span>
              <span style={{ color: '#64748b', fontSize: 11 }}>{p.setor}</span>
            </div>
          ))}
        </div>
        <button style={{ marginTop: 8, background: 'none', border: 'none', color: '#3b82f6', fontSize: 12, cursor: 'pointer', padding: 0 }}>
          ver mais →
        </button>
      </div>

      <div>
        <div style={{ color: '#64748b', fontSize: 11, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Operações Recentes</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {item.ops_recentes.map((op, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
              <span style={{ fontSize: 14 }}>{opIcon(op.tipo)}</span>
              <span style={{ color: '#64748b', minWidth: 48 }}>{op.data}</span>
              <span style={{ color: '#94a3b8', flex: 1 }}>{op.empresa}</span>
              {op.valor !== '-' && <span style={{ color: '#22c55e', fontWeight: 600 }}>{op.valor}</span>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ color: '#64748b', fontSize: 11, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Co-investidores Frequentes</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {item.co_investidores.map(c => pill(c, 'rgba(234,179,8,0.1)', '#eab308'))}
        </div>
      </div>
    </div>
  )
}

export default function Assessores() {
  const [tab, setTab] = useState('bancos')
  const [pevcFiltro, setPevcFiltro] = useState('Todos')
  const [periodo, setPeriodo] = useState('Todos')
  const [setor, setSetor] = useState('Todos')
  const [tipoDeal, setTipoDeal] = useState('Todos')

  const filteredPevc = PEVC.filter(p => {
    if (pevcFiltro === 'Todos') return true
    if (pevcFiltro === 'PE Buyout') return p.tipo.toLowerCase().includes('pe') || p.tipo.toLowerCase().includes('buyout')
    if (pevcFiltro === 'VC') return p.tipo.toLowerCase().includes('vc') || p.tipo.toLowerCase().includes('early')
    if (pevcFiltro === 'Growth') return p.tipo.toLowerCase().includes('growth')
    return true
  })

  const tabs = [
    { key: 'bancos', label: 'Bancos & Boutiques' },
    { key: 'juridico', label: 'Jurídico' },
    { key: 'pevc', label: 'Private Equity & VC' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', padding: '24px 32px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#f1f5f9', fontSize: 26, fontWeight: 800, margin: 0 }}>Assessores & Fundos</h1>
        <p style={{ color: '#64748b', fontSize: 14, margin: '4px 0 0' }}>Rankings de assessores financeiros, jurídicos e fundos de PE/VC no Brasil</p>
      </div>

      {/* Global Filter Bar */}
      <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 10, padding: '14px 20px', marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#64748b', fontSize: 12, fontWeight: 600 }}>PERÍODO</span>
          <select value={periodo} onChange={e => setPeriodo(e.target.value)} style={{ background: '#0f1117', border: '1px solid #2a2f42', color: '#f1f5f9', borderRadius: 6, padding: '5px 10px', fontSize: 13, cursor: 'pointer' }}>
            {PERIODOS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div style={{ width: 1, height: 24, background: '#2a2f42' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#64748b', fontSize: 12, fontWeight: 600 }}>SETOR</span>
          <select value={setor} onChange={e => setSetor(e.target.value)} style={{ background: '#0f1117', border: '1px solid #2a2f42', color: '#f1f5f9', borderRadius: 6, padding: '5px 10px', fontSize: 13, cursor: 'pointer' }}>
            {SETORES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ width: 1, height: 24, background: '#2a2f42' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#64748b', fontSize: 12, fontWeight: 600 }}>TIPO DEAL</span>
          <select value={tipoDeal} onChange={e => setTipoDeal(e.target.value)} style={{ background: '#0f1117', border: '1px solid #2a2f42', color: '#f1f5f9', borderRadius: 6, padding: '5px 10px', fontSize: 13, cursor: 'pointer' }}>
            {TIPOS_DEAL.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 28, background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              background: tab === t.key ? '#3b82f6' : 'transparent',
              color: tab === t.key ? '#fff' : '#64748b',
              border: 'none',
              borderRadius: 7,
              padding: '8px 22px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1 — Bancos & Boutiques */}
      {tab === 'bancos' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
          {BANCOS.map((b, i) => <BancoCard key={b.id} item={b} rank={i + 1} />)}
        </div>
      )}

      {/* TAB 2 — Jurídico */}
      {tab === 'juridico' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
          {JURIDICOS.map((j, i) => <JuridicoCard key={j.id} item={j} rank={i + 1} />)}
        </div>
      )}

      {/* TAB 3 — PE/VC */}
      {tab === 'pevc' && (
        <div>
          {/* Sub-filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
            {PEVC_TIPOS.map(t => (
              <button
                key={t}
                onClick={() => setPevcFiltro(t)}
                style={{
                  background: pevcFiltro === t ? 'rgba(139,92,246,0.2)' : 'transparent',
                  color: pevcFiltro === t ? '#8b5cf6' : '#64748b',
                  border: `1px solid ${pevcFiltro === t ? '#8b5cf6' : '#2a2f42'}`,
                  borderRadius: 8,
                  padding: '6px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
            {filteredPevc.map(p => <PevcCard key={p.nome} item={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
