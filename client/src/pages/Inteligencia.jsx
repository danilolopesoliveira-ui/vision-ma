import { useState, useEffect } from 'react'
import Termometro from '../components/Termometro'

const SETORES = [
  'Saúde', 'Tecnologia', 'Energia', 'Financeiro', 'Agronegócio',
  'Telecomunicações', 'Consumo Cíclico', 'Consumo Não-Cíclico',
  'Infraestrutura', 'Imobiliário', 'Materiais Básicos', 'Educação'
]

const SETOR_ICONS = {
  'Saúde': '🏥', 'Tecnologia': '💻', 'Energia': '⚡', 'Financeiro': '🏦',
  'Agronegócio': '🌾', 'Telecomunicações': '📡', 'Consumo Cíclico': '🛍️',
  'Consumo Não-Cíclico': '🛒', 'Infraestrutura': '🏗️', 'Imobiliário': '🏢',
  'Materiais Básicos': '⛏️', 'Educação': '🎓'
}

const SAUDE_FALLBACK = {
  setor: 'Saúde',
  termometro: 4,
  outlook: 'O setor de Saúde segue como um dos mais aquecidos em M&A no Brasil, impulsionado pela consolidação de redes hospitalares, expansão de operadoras e crescente interesse de fundos de PE. O movimento de verticalização dos planos de saúde cria pressão por aquisições de clínicas, laboratórios e hospitais. Expectativas de alta taxa de atividade continuam para os próximos 12 meses, com destaque para deals no segmento de diagnósticos e oncologia.',
  deal_history: [
    { ano: '2019', deals: 18, volume_bi: 12.4 },
    { ano: '2020', deals: 14, volume_bi: 9.8 },
    { ano: '2021', deals: 32, volume_bi: 28.6 },
    { ano: '2022', deals: 41, volume_bi: 52.1 },
    { ano: '2023', deals: 35, volume_bi: 38.4 },
    { ano: '2024', deals: 38, volume_bi: 44.2 },
  ],
  top_compradores: [
    { nome: "Rede D'Or", deals: 8, tipo: 'Estratégico' },
    { nome: 'Hapvida', deals: 6, tipo: 'Estratégico' },
    { nome: 'Advent International', deals: 4, tipo: 'PE' },
    { nome: 'Mater Dei', deals: 3, tipo: 'Estratégico' },
    { nome: 'Vinci Partners', deals: 3, tipo: 'PE' },
  ],
  targets_potenciais: [
    { nome: 'Grupo de Oncologia Regional', segmento: 'Oncologia', ebitda_bi: 0.18, ev_ebitda: '10–13x', score_aquisicao: 87 },
    { nome: 'Rede de Diagnósticos Sul', segmento: 'Diagnósticos', ebitda_bi: 0.32, ev_ebitda: '12–15x', score_aquisicao: 79 },
    { nome: 'Hospital Mid-Market NE', segmento: 'Hospitalar', ebitda_bi: 0.24, ev_ebitda: '9–11x', score_aquisicao: 73 },
  ],
  multiplos: [
    { metrica: 'EV/EBITDA', valor: '11–14x', ref: 'Hospitalar' },
    { metrica: 'EV/EBITDA', valor: '13–17x', ref: 'Diagnósticos' },
    { metrica: 'EV/Receita', valor: '2.5–4x', ref: 'Healthtech' },
    { metrica: 'P/L', valor: '20–28x', ref: 'Médio setor' },
  ],
  teses_estrategicas: [
    'Verticalização de operadoras: planos de saúde buscam controlar a cadeia de atendimento para reduzir sinistralidade',
    'Consolidação regional: oportunidade de roll-up em mercados de média e grande cidade ainda fragmentados',
    'Digitalização: healthtechs com soluções de prontuário eletrônico, telemedicina e gestão clínica como alvos',
    'Oncologia como vetor de crescimento: especialidade com maior ticket médio e demanda crescente',
    'Cross-border: grupos chilenos, colombianos e espanhóis avaliando entrada no mercado brasileiro',
  ],
  fatores_risco: [
    'Elevada regulação da ANS pode impactar rentabilidade das operações integradas',
    'Dependência de benefícios fiscais em algumas estruturas de consolidação',
    'Pressão de sinistralidade pós-Covid ainda em normalização',
    'Concorrência intensa entre PE e estratégicos inflacionando múltiplos',
    'Risco de execução em integrações complexas de redes regionais',
  ],
  pipeline_potencial: [
    { nome: 'Rede Hospitalar Centro-Oeste', status: 'Em mapeamento', probabilidade: 70 },
    { nome: 'Lab de Diagnóstico São Paulo', status: 'Due diligence provável', probabilidade: 55 },
    { nome: 'Clínica Oncológica Nordeste', status: 'Mandato identificado', probabilidade: 85 },
    { nome: 'Healthtech de Gestão Clínica', status: 'Ronda em curso', probabilidade: 60 },
  ],
}

const EMPTY_DATA = (setor) => ({
  setor,
  termometro: 3,
  outlook: `Dados de inteligência para ${setor} serão carregados via API. Conecte o endpoint /api/inteligencia?setor=${encodeURIComponent(setor)} para ver análise completa.`,
  deal_history: [
    { ano: '2019', deals: 10, volume_bi: 8 },
    { ano: '2020', deals: 8, volume_bi: 6 },
    { ano: '2021', deals: 18, volume_bi: 15 },
    { ano: '2022', deals: 22, volume_bi: 20 },
    { ano: '2023', deals: 19, volume_bi: 17 },
    { ano: '2024', deals: 21, volume_bi: 19 },
  ],
  top_compradores: [],
  targets_potenciais: [],
  multiplos: [],
  teses_estrategicas: [],
  fatores_risco: [],
  pipeline_potencial: [],
})

function BarChart({ data }) {
  const maxDeals = Math.max(...data.map(d => d.deals))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 120, padding: '0 4px' }}>
      {data.map((d, i) => {
        const pct = (d.deals / maxDeals) * 100
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
            <div style={{ color: '#64748b', fontSize: 10 }}>{d.deals}</div>
            <div style={{ width: '100%', height: `${pct}%`, minHeight: 8, background: `linear-gradient(180deg, #3b82f6, #1d4ed8)`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', color: '#94a3b8', fontSize: 9, whiteSpace: 'nowrap' }}>
                R${d.volume_bi}B
              </div>
            </div>
            <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600 }}>{d.ano}</div>
          </div>
        )
      })}
    </div>
  )
}

function ScoreBar({ score }) {
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, background: '#2a2f42', borderRadius: 9999, height: 6, overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: 9999 }} />
      </div>
      <span style={{ color, fontSize: 12, fontWeight: 700, minWidth: 30 }}>{score}</span>
    </div>
  )
}

export default function Inteligencia() {
  const [setorSelecionado, setSetorSelecionado] = useState(null)
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadSetor = (s) => {
    setSetorSelecionado(s)
    setLoading(true)
    if (s === 'Saúde') {
      setTimeout(() => { setDados(SAUDE_FALLBACK); setLoading(false) }, 300)
      return
    }
    fetch(`/api/inteligencia?setor=${encodeURIComponent(s)}`)
      .then(r => r.json())
      .then(data => { setDados(data); setLoading(false) })
      .catch(() => { setDados(EMPTY_DATA(s)); setLoading(false) })
  }

  const card = (children, extra = {}) => (
    <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20, ...extra }}>
      {children}
    </div>
  )

  const sectionTitle = (title) => (
    <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>{title}</div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', padding: '24px 32px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#f1f5f9', fontSize: 26, fontWeight: 800, margin: 0 }}>Inteligência Setorial</h1>
        <p style={{ color: '#64748b', fontSize: 14, margin: '4px 0 0' }}>Análise aprofundada por setor: histórico, compradores, múltiplos e teses estratégicas</p>
      </div>

      {/* Sector Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <span style={{ color: '#94a3b8', fontSize: 14, fontWeight: 600 }}>Setor:</span>
        <select
          value={setorSelecionado || ''}
          onChange={e => e.target.value && loadSetor(e.target.value)}
          style={{ background: '#1a1f2e', border: '1px solid #2a2f42', color: setorSelecionado ? '#f1f5f9' : '#64748b', borderRadius: 8, padding: '9px 14px', fontSize: 14, cursor: 'pointer', minWidth: 220, outline: 'none' }}
        >
          <option value="">Selecione um setor...</option>
          {SETORES.map(s => <option key={s} value={s}>{SETOR_ICONS[s]} {s}</option>)}
        </select>
        {setorSelecionado && (
          <button
            onClick={() => { setSetorSelecionado(null); setDados(null) }}
            style={{ background: 'none', border: '1px solid #2a2f42', color: '#64748b', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer' }}
          >
            ← Voltar
          </button>
        )}
      </div>

      {/* Empty state */}
      {!setorSelecionado && (
        <div>
          <div style={{ color: '#64748b', fontSize: 13, marginBottom: 18 }}>Selecione rapidamente:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {SETORES.map(s => (
              <button
                key={s}
                onClick={() => loadSetor(s)}
                style={{
                  background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12,
                  padding: '18px 16px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}
                onMouseEnter={e => { e.currentTarget.style.border = '1px solid #3b82f6'; e.currentTarget.style.background = 'rgba(59,130,246,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.border = '1px solid #2a2f42'; e.currentTarget.style.background = '#1a1f2e' }}
              >
                <span style={{ fontSize: 28 }}>{SETOR_ICONS[s]}</span>
                <span style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 14 }}>{s}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: 60, color: '#64748b' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
          <div style={{ fontSize: 15 }}>Carregando análise de {setorSelecionado}...</div>
        </div>
      )}

      {/* Sector Analysis */}
      {dados && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* A — Header */}
          <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 14, padding: 24, display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ fontSize: 52 }}>{SETOR_ICONS[dados.setor]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#f1f5f9', fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{dados.setor}</div>
              <div style={{ maxWidth: 400 }}>
                <Termometro nivel={dados.termometro} showLabel size="md" />
              </div>
            </div>
            <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
              <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>NÍVEL DE ATIVIDADE M&A</div>
              <div style={{ color: '#3b82f6', fontSize: 32, fontWeight: 800 }}>{dados.termometro}/5</div>
            </div>
          </div>

          {/* B — Outlook */}
          {card(
            <>
              {sectionTitle('Outlook do Setor')}
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.75, margin: 0 }}>{dados.outlook}</p>
            </>
          )}

          {/* C — Deal History Chart + D — Top Buyers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            {card(
              <>
                {sectionTitle('Histórico de Deals (2019–2024)')}
                <BarChart data={dados.deal_history} />
                <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 10, height: 10, background: 'linear-gradient(180deg, #3b82f6, #1d4ed8)', borderRadius: 2 }} />
                    <span style={{ color: '#64748b', fontSize: 11 }}>Volume de deals</span>
                  </div>
                  <div style={{ color: '#64748b', fontSize: 11 }}>Números acima = R$ volume total</div>
                </div>
              </>,
              { display: 'flex', flexDirection: 'column' }
            )}

            {card(
              <>
                {sectionTitle('Top Compradores')}
                {dados.top_compradores.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {dados.top_compradores.map((c, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ color: '#3b82f6', fontWeight: 800, fontSize: 14, minWidth: 20 }}>#{i + 1}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 14 }}>{c.nome}</div>
                          <div style={{ color: '#64748b', fontSize: 11 }}>{c.tipo}</div>
                        </div>
                        <span style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', borderRadius: 9999, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>
                          {c.deals} deals
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: '#64748b', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Dados via API</div>
                )}
              </>
            )}
          </div>

          {/* E — Potential Targets */}
          {dados.targets_potenciais.length > 0 && (
            <>
              <div style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700 }}>Targets Potenciais</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {dados.targets_potenciais.map((t, i) => (
                  <div key={i} style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 18 }}>
                    <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{t.nome}</div>
                    <div style={{ marginBottom: 12 }}>
                      <span style={{ background: 'rgba(6,182,212,0.1)', color: '#06b6d4', borderRadius: 9999, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
                        {t.segmento}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>EBITDA est.</span>
                        <span style={{ color: '#22c55e', fontWeight: 600, fontSize: 12 }}>R${(t.ebitda_bi * 1000).toFixed(0)}M</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>EV/EBITDA</span>
                        <span style={{ color: '#f97316', fontWeight: 600, fontSize: 12 }}>{t.ev_ebitda}</span>
                      </div>
                      <div>
                        <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>Score de aquisição</div>
                        <ScoreBar score={t.score_aquisicao} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* F — Multiples */}
          {dados.multiplos.length > 0 && card(
            <>
              {sectionTitle('Múltiplos de Referência')}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {dados.multiplos.map((m, i) => (
                  <div key={i} style={{ background: '#0f1117', border: '1px solid #2a2f42', borderRadius: 10, padding: '12px 18px', minWidth: 130 }}>
                    <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>{m.metrica}</div>
                    <div style={{ color: '#f97316', fontWeight: 800, fontSize: 18 }}>{m.valor}</div>
                    <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{m.ref}</div>
                  </div>
                ))}
                <a href="/multiplos" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(59,130,246,0.08)', border: '1px dashed rgba(59,130,246,0.4)', borderRadius: 10, padding: '12px 18px', color: '#3b82f6', fontSize: 12, fontWeight: 600, textDecoration: 'none', minWidth: 130 }}>
                  Ver todos →
                </a>
              </div>
            </>
          )}

          {/* G — Strategic Theses + H — Risk Factors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            {card(
              <>
                {sectionTitle('Teses Estratégicas')}
                {dados.teses_estrategicas.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {dados.teses_estrategicas.map((t, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: '#22c55e', fontSize: 14, marginTop: 1, flexShrink: 0 }}>✓</span>
                        <span style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: '#64748b', fontSize: 13 }}>Dados via API</div>
                )}
              </>
            )}

            {card(
              <>
                {sectionTitle('Fatores de Risco')}
                {dados.fatores_risco.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {dados.fatores_risco.map((r, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: '#ef4444', fontSize: 14, marginTop: 1, flexShrink: 0 }}>⚠</span>
                        <span style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: '#64748b', fontSize: 13 }}>Dados via API</div>
                )}
              </>
            )}
          </div>

          {/* I — Pipeline Potential */}
          {dados.pipeline_potencial.length > 0 && card(
            <>
              {sectionTitle('Pipeline Potencial')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {dados.pipeline_potencial.map((p, i) => {
                  const probColor = p.probabilidade >= 75 ? '#22c55e' : p.probabilidade >= 50 ? '#eab308' : '#94a3b8'
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#0f1117', borderRadius: 8, padding: '12px 16px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 14 }}>{p.nome}</div>
                        <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{p.status}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: probColor, fontWeight: 800, fontSize: 18 }}>{p.probabilidade}%</div>
                        <div style={{ color: '#64748b', fontSize: 10 }}>probabilidade</div>
                      </div>
                      <div style={{ width: 80 }}>
                        <div style={{ background: '#2a2f42', borderRadius: 9999, height: 6, overflow: 'hidden' }}>
                          <div style={{ width: `${p.probabilidade}%`, height: '100%', background: probColor, borderRadius: 9999 }} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
