import { X, ExternalLink } from 'lucide-react'
import StatusBadge from './StatusBadge'
import TipoBadge from './TipoBadge'

export default function DealModal({ deal, onClose }) {
  if (!deal) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24
    }} onClick={onClose}>
      <div style={{
        background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 16,
        width: '100%', maxWidth: 900, maxHeight: '85vh',
        overflow: 'hidden', display: 'flex', flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid #2a2f42',
          display: 'flex', alignItems: 'flex-start', gap: 16
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <h2 style={{ color: '#e2e8f0', fontSize: 20, fontWeight: 700, margin: 0 }}>
                {deal.alvo} ← {deal.adquirente}
              </h2>
              <TipoBadge tipo={deal.tipo} />
              <StatusBadge status={deal.status} />
            </div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>
              {deal.setor} · Anunciado em {deal.data_anuncio ? new Date(deal.data_anuncio).toLocaleDateString('pt-BR') : '—'}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#3b82f6', fontSize: 22, fontWeight: 700 }}>{deal.valor_est}</div>
            {deal.ev_ebitda && <div style={{ color: '#64748b', fontSize: 12 }}>EV/EBITDA: {deal.ev_ebitda}</div>}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Left panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Section title="Termos do Deal">
              <InfoRow label="Alvo" value={deal.alvo} />
              <InfoRow label="Adquirente" value={deal.adquirente} />
              <InfoRow label="Valor Total" value={deal.valor_est} highlight />
              <InfoRow label="% Adquirida" value={deal.percentual_adquirido || '100%'} />
              <InfoRow label="Forma de Pagamento" value={deal.forma_pagamento} />
              <InfoRow label="EV/EBITDA" value={deal.ev_ebitda} />
              <InfoRow label="EV/Receita" value={deal.ev_receita} />
              <InfoRow label="Prêmio s/ Mercado" value={deal.premio_mercado} />
            </Section>

            <Section title="Assessores">
              <InfoRow label="Fin. Comprador" value={deal.assessor_fin_comprador} />
              <InfoRow label="Fin. Vendedor" value={deal.assessor_fin_vendedor} />
              <InfoRow label="Jur. Comprador" value={deal.assessor_jur_comprador} />
              <InfoRow label="Jur. Vendedor" value={deal.assessor_jur_vendedor} />
            </Section>

            {deal.status_cade && (
              <Section title="Regulatório — CADE">
                <InfoRow label="Status" value={deal.status_cade} />
                {deal.condicoes_cade && <InfoRow label="Condicionamentos" value={deal.condicoes_cade} />}
              </Section>
            )}
          </div>

          {/* Right panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {deal.tese_estrategica && (
              <Section title="Tese Estratégica">
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{deal.tese_estrategica}</p>
              </Section>
            )}

            {deal.timeline && deal.timeline.length > 0 && (
              <Section title="Timeline">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {deal.timeline.map((ev, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 8, height: 8, borderRadius: '50%', background: '#3b82f6',
                        marginTop: 5, flexShrink: 0
                      }} />
                      <div>
                        <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{ev.fase}</div>
                        <div style={{ color: '#64748b', fontSize: 11 }}>
                          {ev.data ? new Date(ev.data).toLocaleDateString('pt-BR') : '—'} — {ev.descricao}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </div>

        {/* Footer links */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #2a2f42', display: 'flex', gap: 8 }}>
          {deal.links?.cvm && (
            <a href={deal.links.cvm} target="_blank" rel="noopener noreferrer"
              style={{ ...linkStyle, background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
              CVM Fato Relevante <ExternalLink size={12} />
            </a>
          )}
          {deal.links?.cade && (
            <a href={deal.links.cade} target="_blank" rel="noopener noreferrer"
              style={{ ...linkStyle, background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}>
              CADE <ExternalLink size={12} />
            </a>
          )}
          {deal.links?.google && (
            <a href={deal.links.google} target="_blank" rel="noopener noreferrer"
              style={{ ...linkStyle, background: 'rgba(100,116,139,0.1)', color: '#94a3b8' }}>
              Google <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const linkStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 4,
  padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
  textDecoration: 'none'
}

function Section({ title, children }) {
  return (
    <div>
      <div style={{
        color: '#64748b', fontSize: 11, fontWeight: 700,
        letterSpacing: '0.08em', marginBottom: 10, textTransform: 'uppercase'
      }}>{title}</div>
      <div style={{
        background: '#151924', border: '1px solid #2a2f42', borderRadius: 8,
        padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8
      }}>
        {children}
      </div>
    </div>
  )
}

function InfoRow({ label, value, highlight }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: '#64748b', fontSize: 12 }}>{label}</span>
      <span style={{
        color: highlight ? '#3b82f6' : '#e2e8f0',
        fontSize: 12, fontWeight: highlight ? 700 : 500,
        textAlign: 'right', maxWidth: '60%'
      }}>{value}</span>
    </div>
  )
}
