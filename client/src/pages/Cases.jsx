import { useState, useMemo } from 'react'
import { Search, X, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import TipoBadge from '../components/TipoBadge'

const CASES = [
  {
    id: 1,
    alvo: 'SulAmérica',
    adquirente: "Rede D'Or",
    tipo: 'Aquisição',
    setor: 'Saúde',
    valor_est: 'R$ 12,0B',
    valor_num: 12000,
    ano: 2022,
    status: 'Fechado',
    ev_ebitda: '16x',
    ev_receita: '2.1x',
    premio_mercado: '28%',
    origem_comprador: 'Estratégico Nacional',
    assessor_fin_comprador: 'BTG Pactual',
    assessor_fin_vendedor: 'Itaú BBA',
    assessor_jur_comprador: 'Machado Meyer',
    assessor_jur_vendedor: 'Pinheiro Neto',
    status_cade: 'Aprovado com condicionamentos',
    condicoes_cade: 'Desinvestimento de carteira de seguros empresariais (Rede D\'Or Corporate)',
    contexto_estrategico: 'A aquisição da SulAmérica pela Rede D\'Or São Luiz representou um marco histórico para o setor de saúde brasileiro. A operação criou o maior grupo de saúde integrado do país, com cobertura completa desde o plano de saúde (SulAmérica) até a rede de hospitais de alta complexidade (Rede D\'Or). A integração vertical elimina intermediários no ciclo saúde-doença, potencialmente reduzindo a sinistralidade e aumentando margens. O deal foi viabilizado pela capacidade de geração de caixa robusta da Rede D\'Or e pelo valuation atrativo da SulAmérica pós-pandemia.',
    estrutura_pagamento: { caixa: 60, acoes: 40, earnout: 0 },
    data_anuncio: '2022-03-22',
    data_fechamento: '2022-12-15',
    timeline: [
      { fase: 'Rumor', data: '2022-01', descricao: 'Rumores de negociação circulam no mercado' },
      { fase: 'Anúncio', data: '2022-03', descricao: 'Anúncio oficial ao mercado' },
      { fase: 'CADE', data: '2022-06', descricao: 'Submissão ao CADE' },
      { fase: 'Condicionamentos', data: '2022-10', descricao: 'CADE aprova com restrições' },
      { fase: 'Fechamento', data: '2022-12', descricao: 'Conclusão da transação' }
    ],
    licoes: [
      'Integração vertical pode criar defensividade e redução de custo médico',
      'CADE atento a concentração vertical no setor de saúde',
      'Timing de mercado: SulAmérica estava depreciada pós-pandemia',
      'Estrutura mista (caixa + ações) alinha interesses dos acionistas vendedores'
    ],
    links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Rede+D\'Or+SulAmérica+aquisição' }
  },
  {
    id: 2,
    alvo: 'Unidas',
    adquirente: 'Localiza',
    tipo: 'Fusão',
    setor: 'Transportes',
    valor_est: 'R$ 9,4B',
    valor_num: 9400,
    ano: 2022,
    status: 'Fechado',
    ev_ebitda: '11x',
    ev_receita: '3.2x',
    status_cade: 'Aprovado com condicionamentos',
    condicoes_cade: 'Desinvestimento de 30% da frota combinada (≈ 80.000 veículos)',
    assessor_fin_comprador: 'Goldman Sachs',
    assessor_fin_vendedor: 'Bradesco BBI',
    assessor_jur_comprador: 'Lefosse',
    assessor_jur_vendedor: 'Mattos Filho',
    contexto_estrategico: 'A fusão entre Localiza e Unidas criou a maior locadora de veículos da América Latina, com market share superior a 40% no Brasil. O processo foi complexo dado o tamanho da operação e o impacto no setor. O CADE exigiu desinvestimentos significativos de frota para preservar a competição, e a Localiza precisou vender veículos para a Movida e outros players. A integração focou em captura de sinergias operacionais, de frota e de sistemas de gestão.',
    estrutura_pagamento: { caixa: 0, acoes: 100, earnout: 0 },
    data_anuncio: '2021-01-11',
    data_fechamento: '2022-08-15',
    timeline: [
      { fase: 'Anúncio', data: '2021-01', descricao: 'Fusão anunciada ao mercado' },
      { fase: 'CADE', data: '2021-04', descricao: 'Submissão ao CADE' },
      { fase: 'Condicionamentos', data: '2022-05', descricao: 'CADE aprova com desinvestimento de frota' },
      { fase: 'Fechamento', data: '2022-08', descricao: 'Fusão concluída' }
    ],
    licoes: [
      'Em fusões horizontais de grande porte, o CADE pode exigir desinvestimentos significativos',
      'Fusão all-stock alinha interesses mas dilui acionistas originais',
      'Integração de frotas e sistemas requer planejamento de longo prazo',
      'Processo CADE em fusões complexas pode levar 16-18 meses'
    ],
    links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Localiza+Unidas+fusão' }
  },
  {
    id: 3,
    alvo: 'NotreDame Intermédica',
    adquirente: 'Hapvida',
    tipo: 'Fusão',
    setor: 'Saúde',
    valor_est: 'R$ 21,0B',
    valor_num: 21000,
    ano: 2022,
    status: 'Fechado',
    ev_ebitda: '22x',
    status_cade: 'Aprovado com condicionamentos',
    assessor_fin_comprador: 'Morgan Stanley',
    assessor_fin_vendedor: 'Itaú BBA',
    assessor_jur_comprador: 'Stocche Forbes',
    assessor_jur_vendedor: 'TozziniFreire',
    contexto_estrategico: 'A maior fusão da história do setor de saúde suplementar brasileiro. A operação criou o maior grupo de planos de saúde do Brasil, com mais de 10 milhões de beneficiários. O modelo verticalmente integrado (plano + hospital + clínica) da Hapvida era complementar à base da NDI, especialmente em praças geográficas distintas.',
    estrutura_pagamento: { caixa: 0, acoes: 100, earnout: 0 },
    data_anuncio: '2021-08-10',
    data_fechamento: '2022-02-11',
    timeline: [
      { fase: 'Anúncio', data: '2021-08', descricao: 'Fusão anunciada' },
      { fase: 'CADE', data: '2021-12', descricao: 'Submissão ao CADE' },
      { fase: 'Fechamento', data: '2022-02', descricao: 'Fusão concluída' }
    ],
    licoes: [
      'Maior fusão do setor de saúde suplementar do Brasil',
      'Complementaridade geográfica reduz risco regulatório no CADE',
      'Modelo verticalizado cria barreiras à entrada mas aumenta risco de execução',
      'Post-merger: desafios de integração cultural e operacional são subestimados'
    ],
    links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Hapvida+NotreDame+fusão' }
  },
  {
    id: 4,
    alvo: 'Cobasi',
    adquirente: 'Petz',
    tipo: 'Fusão',
    setor: 'Consumo',
    valor_est: 'R$ 4,1B',
    valor_num: 4100,
    ano: 2023,
    status: 'Cancelado',
    status_cade: 'Reprovado',
    assessor_fin_comprador: 'Itaú BBA',
    assessor_fin_vendedor: 'BTG Pactual',
    assessor_jur_comprador: 'Machado Meyer',
    assessor_jur_vendedor: 'Pinheiro Neto',
    contexto_estrategico: 'A fusão entre Petz e Cobasi seria a consolidação das duas maiores redes de pet shop do Brasil, que juntas controlavam mais de 50% do mercado organizado. O CADE avaliou que a concentração resultante eliminaria a principal competição no setor, prejudicando consumidores e fornecedores. Foi um caso emblemático de fusão horizontal reprovada, servindo de referência para análises de M&A no setor de varejo.',
    estrutura_pagamento: { caixa: 40, acoes: 60, earnout: 0 },
    data_anuncio: '2023-04-18',
    data_fechamento: null,
    timeline: [
      { fase: 'Anúncio', data: '2023-04', descricao: 'Fusão anunciada ao mercado' },
      { fase: 'CADE', data: '2023-07', descricao: 'Submissão ao CADE' },
      { fase: 'Cancelado', data: '2024-01', descricao: 'CADE reprova a operação' }
    ],
    licoes: [
      'Fusões entre os dois maiores players de um setor concentrado têm alto risco regulatório',
      'Market share combinado >50% é sinal de alerta para análise antitruste',
      'Due diligence antitruste deve preceder o anúncio público em fusões horizontais',
      'Incerteza regulatória tem custo real: 9 meses de gestão suspensa'
    ],
    links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Petz+Cobasi+CADE' }
  },
  {
    id: 5,
    alvo: 'CELSE',
    adquirente: 'Eneva',
    tipo: 'Aquisição',
    setor: 'Energia',
    valor_est: 'R$ 4,0B',
    valor_num: 4000,
    ano: 2023,
    status: 'Fechado',
    ev_ebitda: '8x',
    status_cade: 'Aprovado',
    assessor_fin_comprador: 'BTG Pactual',
    assessor_fin_vendedor: 'Goldman Sachs',
    assessor_jur_comprador: 'Souza Cescon',
    assessor_jur_vendedor: 'Lefosse',
    contexto_estrategico: 'A aquisição da CELSE (Central Elétrica de Sergipe) pela Eneva consolidou a posição da compradora como principal geradora termelétrica do Brasil. A CELSE opera a maior usina a gás natural da América Latina. A transação foi financiada com combinação de caixa próprio e emissão de dívida, com EV/EBITDA de 8x considerado atrativo para o setor.',
    estrutura_pagamento: { caixa: 80, acoes: 0, earnout: 20 },
    data_anuncio: '2023-06-14',
    data_fechamento: '2023-11-30',
    timeline: [
      { fase: 'Anúncio', data: '2023-06', descricao: 'Aquisição anunciada' },
      { fase: 'CADE', data: '2023-07', descricao: 'Submissão ao CADE' },
      { fase: 'Fechamento', data: '2023-11', descricao: 'Conclusão' }
    ],
    licoes: [
      'Ativos de geração contratados (PPA) oferecem previsibilidade de receita e justificam múltiplos mais altos',
      'EV/EBITDA de 8x no setor de energia thermal é benchmark de mercado',
      'Earn-out baseado em geração de energia reduz risco de performance operacional'
    ],
    links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Eneva+CELSE+aquisição' }
  },
  {
    id: 6,
    alvo: 'Supplier',
    adquirente: 'Totvs',
    tipo: 'Aquisição',
    setor: 'Tecnologia',
    valor_est: 'R$ 800M',
    valor_num: 800,
    ano: 2023,
    status: 'Fechado',
    ev_ebitda: '18x',
    ev_receita: '4x',
    status_cade: 'Aprovado',
    assessor_fin_comprador: 'UBS BB',
    assessor_fin_vendedor: 'Rothschild & Co',
    assessor_jur_comprador: 'BMA Advogados',
    assessor_jur_vendedor: 'Demarest',
    contexto_estrategico: 'A aquisição da Supplier pela Totvs representa a expansão da empresa para o mercado de crédito B2B e supply chain finance. A Supplier oferece soluções de antecipação de recebíveis e gestão de capital de giro para a cadeia de fornecedores de grandes empresas. A integração com a base de clientes ERPs da Totvs cria cross-sell natural e fortalece o ecossistema de financial services.',
    estrutura_pagamento: { caixa: 100, acoes: 0, earnout: 0 },
    data_anuncio: '2023-03-28',
    data_fechamento: '2023-07-15',
    timeline: [
      { fase: 'Anúncio', data: '2023-03', descricao: 'Aquisição anunciada' },
      { fase: 'Fechamento', data: '2023-07', descricao: 'Conclusão' }
    ],
    licoes: [
      'Tech companies pagam prêmio para adquirir capacidade de financial services',
      'EV/Receita 4x para SaaS B2B em crescimento é nível de mercado',
      'Cross-sell na base de clientes instalada é tese de M&A comprovada para software'
    ],
    links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Totvs+Supplier+aquisição' }
  },
  {
    id: 7,
    alvo: 'iFood',
    adquirente: 'SoftBank Latin America Fund',
    tipo: 'PE/VC',
    setor: 'Tecnologia',
    valor_est: 'US$ 1,8B (rodada)',
    valor_num: 9700,
    ano: 2021,
    status: 'Fechado',
    ev_ebitda: 'n.a.',
    ev_receita: '14x',
    status_cade: 'N/A',
    assessor_fin_comprador: 'Goldman Sachs',
    assessor_fin_vendedor: 'Morgan Stanley',
    assessor_jur_comprador: 'Lefosse',
    assessor_jur_vendedor: 'Mattos Filho',
    contexto_estrategico: 'O aporte do SoftBank no iFood foi parte de uma rodada de crescimento (Growth) que valorizou a empresa em aproximadamente US$5,4B. O iFood era (e continua sendo) líder absoluto no mercado de food delivery brasileiro, com market share superior a 80%. O deal faz parte da estratégia do SoftBank Latin America Fund de apostar em líderes de mercado da economia digital na América Latina.',
    estrutura_pagamento: { caixa: 100, acoes: 0, earnout: 0 },
    data_anuncio: '2021-05-15',
    data_fechamento: '2021-06-30',
    timeline: [
      { fase: 'Rodada', data: '2021-05', descricao: 'Aporte Growth Series anunciado' },
      { fase: 'Fechamento', data: '2021-06', descricao: 'Rodada concluída' }
    ],
    licoes: [
      'Liderança de mercado (>80% share) justifica múltiplos de receita elevados',
      'SoftBank usa cheques grandes para garantir posição em líderes regionais',
      'Food delivery: winner-takes-most em mercados com forte efeito de rede'
    ],
    links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=SoftBank+iFood+aporte' }
  },
  {
    id: 8,
    alvo: 'QuintoAndar',
    adquirente: 'Advent International',
    tipo: 'PE/VC',
    setor: 'Tecnologia',
    valor_est: 'US$ 300M',
    valor_num: 1500,
    ano: 2023,
    status: 'Fechado',
    ev_receita: '8x',
    status_cade: 'N/A',
    assessor_fin_comprador: 'Goldman Sachs',
    assessor_jur_comprador: 'Machado Meyer',
    contexto_estrategico: 'O aporte do Advent International no QuintoAndar representou um voto de confiança no modelo de proptech brasileiro em um momento de contração de mercado de VC. O QuintoAndar é líder em aluguel residencial digital no Brasil, com expansão para outros mercados da América Latina. A rodada foi liderada por PE (Advent), sinalizando maturação da empresa em direção a um possível IPO.',
    estrutura_pagamento: { caixa: 100, acoes: 0, earnout: 0 },
    data_anuncio: '2023-07-18',
    data_fechamento: '2023-09-01',
    timeline: [
      { fase: 'Rodada', data: '2023-07', descricao: 'Rodada PE anunciada' },
      { fase: 'Fechamento', data: '2023-09', descricao: 'Rodada concluída' }
    ],
    licoes: [
      'PE entrando em rodadas de growth sinaliza maturidade e proximidade de exit',
      'Proptech com modelo asset-light e receita recorrente atrai múltiplos de software',
      'Ambiente 2023 de taxa alta favoreceu PE vs VC em late-stage deals'
    ],
    links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Advent+QuintoAndar+aporte' }
  },
  {
    id: 9,
    alvo: 'Comerc Energia',
    adquirente: 'Vibra Energia',
    tipo: 'Aquisição',
    setor: 'Energia',
    valor_est: 'R$ 1,5B',
    valor_num: 1500,
    ano: 2023,
    status: 'Fechado',
    ev_ebitda: '12x',
    status_cade: 'Aprovado',
    assessor_fin_comprador: 'Itaú BBA',
    assessor_jur_comprador: 'Souza Cescon',
    contexto_estrategico: 'A aquisição da Comerc pela Vibra Energia (ex-BR Distribuidora, subsidiária da Petrobras até 2019) representa a diversificação estratégica para energia distribuída e livre. A Comerc é uma comercializadora e gestora de energia líder no mercado livre, com portfólio de clientes corporativos e projetos de energia renovável. A transação permite à Vibra ofertar soluções energéticas completas para seus clientes de combustível.',
    estrutura_pagamento: { caixa: 70, acoes: 0, earnout: 30 },
    data_anuncio: '2023-04-05',
    data_fechamento: '2023-08-20',
    timeline: [
      { fase: 'Anúncio', data: '2023-04', descricao: 'Aquisição anunciada' },
      { fase: 'Fechamento', data: '2023-08', descricao: 'Conclusão' }
    ],
    licoes: [
      'Distribuidoras de combustível estão se reinventando em plataformas de energia',
      'Earn-out no setor de energia atrelado a volume comercializado reduz risco comprador',
      'Mercado livre de energia é vetor de crescimento para M&A nos próximos anos'
    ],
    links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Vibra+Energia+Comerc' }
  },
  {
    id: 10,
    alvo: 'Hortifruti Natural da Terra',
    adquirente: 'Carrefour Brasil',
    tipo: 'Distressed',
    setor: 'Varejo',
    valor_est: 'R$ 600M',
    valor_num: 600,
    ano: 2023,
    status: 'Fechado',
    ev_ebitda: '5x',
    status_cade: 'Aprovado',
    assessor_fin_comprador: 'Bradesco BBI',
    assessor_jur_comprador: 'TozziniFreire',
    contexto_estrategico: 'A venda da rede Hortifruti Natural da Terra ocorreu no contexto da recuperação judicial das Americanas S.A., que havia adquirido a rede em 2021. Com o processo de RJ iniciado em janeiro de 2023, os administradores judiciais buscaram maximizar o valor dos ativos para os credores. O Carrefour Brasil aproveitou a oportunidade para adquirir uma rede de alto potencial em varejo premium de perecíveis com desconto significativo.',
    estrutura_pagamento: { caixa: 100, acoes: 0, earnout: 0 },
    data_anuncio: '2023-05-22',
    data_fechamento: '2023-09-10',
    timeline: [
      { fase: 'RJ Americanas', data: '2023-01', descricao: 'Americanas entra com pedido de RJ' },
      { fase: 'Processo', data: '2023-03', descricao: 'Administradores iniciam venda de ativos' },
      { fase: 'Anúncio', data: '2023-05', descricao: 'Venda para Carrefour anunciada' },
      { fase: 'Fechamento', data: '2023-09', descricao: 'Transação concluída' }
    ],
    licoes: [
      'Processos de RJ criam janelas de oportunidade para aquisição de ativos de qualidade com desconto',
      'M&A distressed requer velocidade de due diligence e flexibilidade contratual',
      'Carrefour capitalizou sobre ativo estratégico que não estaria disponível em condições normais'
    ],
    links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Americanas+Hortifruti+venda+RJ' }
  },
  {
    id: 11,
    alvo: 'Cogna / Kroton — Spin-offs',
    adquirente: 'Vários / Reestruturação',
    tipo: 'Desinvestimento',
    setor: 'Educação',
    valor_est: 'R$ 2,0B',
    valor_num: 2000,
    ano: 2022,
    status: 'Fechado',
    status_cade: 'N/A',
    assessor_fin_comprador: 'BTG Pactual',
    assessor_jur_comprador: 'Machado Meyer',
    contexto_estrategico: 'A Cogna Educação (ex-Kroton) passou por um extenso processo de reestruturação e desinvestimento entre 2020 e 2022. O grupo realizou spin-off da Vasta Platform (EdTech B2B para escolas particulares, listada na Nasdaq) e da Saber (K-12). O processo focou no core de ensino superior (Kroton) enquanto monetizava outros segmentos. A reestruturação foi necessária após a fusão com a Somos Educação, que sobrecarregou o balanço.',
    estrutura_pagamento: { caixa: 50, acoes: 50, earnout: 0 },
    data_anuncio: '2020-01-01',
    data_fechamento: '2022-12-31',
    timeline: [
      { fase: 'Início', data: '2020-Q1', descricao: 'Anúncio do plano de reestruturação' },
      { fase: 'Vasta IPO', data: '2020-08', descricao: 'IPO da Vasta na Nasdaq' },
      { fase: 'Spin-off Saber', data: '2021-06', descricao: 'Separação da Saber (K-12)' },
      { fase: 'Conclusão', data: '2022-12', descricao: 'Reestruturação concluída' }
    ],
    licoes: [
      'Conglomerados de educação criados por M&A agressivo podem gerar destruição de valor',
      'Spin-offs podem liberar valor escondido em subsidiárias de alto crescimento',
      'Listar EdTech no Nasdaq aumenta liquidez mas requer governança de padrão internacional'
    ],
    links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Cogna+Kroton+reestruturação' }
  },
  {
    id: 12,
    alvo: 'Eve Air Mobility',
    adquirente: 'Zanite Acquisition Corp (SPAC)',
    tipo: 'Cross-border',
    setor: 'Aeroespacial',
    valor_est: 'US$ 2,9B',
    valor_num: 14500,
    ano: 2022,
    status: 'Fechado',
    ev_receita: 'n.a. (pre-revenue)',
    status_cade: 'N/A',
    assessor_fin_comprador: 'Morgan Stanley',
    assessor_fin_vendedor: 'Goldman Sachs',
    assessor_jur_comprador: 'Sullivan & Cromwell',
    assessor_jur_vendedor: 'Lefosse',
    contexto_estrategico: 'A Eve Air Mobility, subsidiária da Embraer focada em aeronaves elétricas de decolagem vertical (eVTOL), utilizou uma fusão com SPAC (Special Purpose Acquisition Company) para se listar na NYSE e captar US$377M em caixa. O valuation de US$2,9B foi baseado em projeções de mercado de Urban Air Mobility. Este foi um dos primeiros grandes casos de uso de SPAC por uma empresa brasileira para acesso ao mercado de capitais americano.',
    estrutura_pagamento: { caixa: 100, acoes: 0, earnout: 0 },
    data_anuncio: '2021-12-13',
    data_fechamento: '2022-05-10',
    timeline: [
      { fase: 'Anúncio', data: '2021-12', descricao: 'Fusão com SPAC anunciada' },
      { fase: 'Listagem', data: '2022-05', descricao: 'Eve listada na NYSE (EVEX)' }
    ],
    licoes: [
      'SPACs podem ser alternativa ao IPO tradicional para empresas pré-receita',
      'Valuation de SPACs é baseado em projeções — risco de revisão significativo',
      'Estrutura permite acesso ao mercado americano com menor custo de transação vs IPO',
      'Embraer manteve controle acionário (>70%) pós-listagem — estrutura de dual-class'
    ],
    links: { cvm: 'https://www.rad.cvm.gov.br', cade: 'https://www.cade.gov.br', google: 'https://www.google.com/search?q=Embraer+Eve+SPAC+NYSE' }
  }
]

const FILTROS = ['TODOS', 'Aquisição', 'Fusão', 'PE/VC', 'Distressed', 'Cross-border', 'Desinvestimento']

// ─── CASE MODAL ─────────────────────────────────────────────────

function CaseModal({ caso, onClose }) {
  if (!caso) return null
  const pag = caso.estrutura_pagamento || {}

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 16, width: '100%', maxWidth: 960, maxHeight: '88vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #2a2f42', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <h2 style={{ color: '#e2e8f0', fontSize: 20, fontWeight: 700, margin: 0 }}>{caso.adquirente} / {caso.alvo}</h2>
              <TipoBadge tipo={caso.tipo} />
              <StatusBadge status={caso.status} />
            </div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>{caso.setor} · {caso.ano} · Assessor: {caso.assessor_fin_comprador}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#3b82f6', fontSize: 24, fontWeight: 800 }}>{caso.valor_est}</div>
            {caso.ev_ebitda && caso.ev_ebitda !== 'n.a.' && <div style={{ color: '#64748b', fontSize: 12 }}>EV/EBITDA: {caso.ev_ebitda}</div>}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4 }}><X size={20} /></button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <SectionTitle>Contexto Estratégico</SectionTitle>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>{caso.contexto_estrategico}</p>
            </div>

            <div>
              <SectionTitle>Estrutura do Deal</SectionTitle>
              <div style={{ background: '#151924', border: '1px solid #2a2f42', borderRadius: 8, padding: '12px 16px' }}>
                <InfoRow label="Valor Total" value={caso.valor_est} highlight />
                <InfoRow label="EV/EBITDA" value={caso.ev_ebitda} />
                <InfoRow label="EV/Receita" value={caso.ev_receita} />
                <InfoRow label="Prêmio s/ Mercado" value={caso.premio_mercado} />
                <InfoRow label="Status CADE" value={caso.status_cade} />
                {caso.condicoes_cade && <InfoRow label="Condicionamentos" value={caso.condicoes_cade} />}
              </div>
            </div>

            {/* Estrutura de pagamento */}
            {pag.caixa !== undefined && (
              <div>
                <SectionTitle>Estrutura de Pagamento</SectionTitle>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  {pag.caixa > 0 && <PayBar label="Caixa" pct={pag.caixa} color="#3b82f6" />}
                  {pag.acoes > 0 && <PayBar label="Ações" pct={pag.acoes} color="#8b5cf6" />}
                  {pag.earnout > 0 && <PayBar label="Earn-out" pct={pag.earnout} color="#eab308" />}
                </div>
              </div>
            )}

            <div>
              <SectionTitle>Assessores</SectionTitle>
              <div style={{ background: '#151924', border: '1px solid #2a2f42', borderRadius: 8, padding: '12px 16px' }}>
                <InfoRow label="Fin. Comprador" value={caso.assessor_fin_comprador} />
                <InfoRow label="Fin. Vendedor" value={caso.assessor_fin_vendedor} />
                <InfoRow label="Jur. Comprador" value={caso.assessor_jur_comprador} />
                <InfoRow label="Jur. Vendedor" value={caso.assessor_jur_vendedor} />
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Timeline */}
            {caso.timeline && caso.timeline.length > 0 && (
              <div>
                <SectionTitle>Timeline</SectionTitle>
                <div style={{ position: 'relative', paddingLeft: 20 }}>
                  <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 2, background: '#2a2f42' }} />
                  {caso.timeline.map((ev, i) => (
                    <div key={i} style={{ position: 'relative', paddingBottom: 16 }}>
                      <div style={{ position: 'absolute', left: -13, top: 4, width: 10, height: 10, borderRadius: '50%', background: '#3b82f6', border: '2px solid #1a1f2e' }} />
                      <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{ev.fase}</div>
                      <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{ev.data} — {ev.descricao}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lições */}
            {caso.licoes && caso.licoes.length > 0 && (
              <div>
                <SectionTitle>Lições e Pontos de Atenção</SectionTitle>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {caso.licoes.map((l, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: '#3b82f6', fontSize: 14, marginTop: 1, flexShrink: 0 }}>→</span>
                      <span style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid #2a2f42', display: 'flex', gap: 8 }}>
          {Object.entries(caso.links || {}).map(([k, url]) => (
            <a key={k} href={url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, textDecoration: 'none', background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
              {k.toUpperCase()} <ExternalLink size={11} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ children }) {
  return <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 10, textTransform: 'uppercase' }}>{children}</div>
}

function InfoRow({ label, value, highlight }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '5px 0', borderBottom: '1px solid #1e2538' }}>
      <span style={{ color: '#64748b', fontSize: 12, minWidth: 120 }}>{label}</span>
      <span style={{ color: highlight ? '#3b82f6' : '#e2e8f0', fontSize: 12, fontWeight: highlight ? 700 : 500, textAlign: 'right', maxWidth: '60%' }}>{value}</span>
    </div>
  )
}

function PayBar({ label, pct, color }) {
  return (
    <div style={{ flex: pct, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ background: color, borderRadius: 6, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ color: '#94a3b8', fontSize: 11, textAlign: 'center' }}>{label}</div>
    </div>
  )
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────

export default function Cases() {
  const [filtro, setFiltro] = useState('TODOS')
  const [search, setSearch] = useState('')
  const [selectedCase, setSelectedCase] = useState(null)

  const filtered = useMemo(() => {
    return CASES.filter(c => {
      const matchFiltro = filtro === 'TODOS' || c.tipo === filtro
      const q = search.toLowerCase()
      const matchSearch = !q || c.alvo.toLowerCase().includes(q) || c.adquirente.toLowerCase().includes(q) || c.setor.toLowerCase().includes(q)
      return matchFiltro && matchSearch
    })
  }, [filtro, search])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Filtros */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {FILTROS.map(f => (
            <button key={f} onClick={() => setFiltro(f)} style={{
              padding: '6px 14px', borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: filtro === f ? '#3b82f6' : '#1a1f2e',
              color: filtro === f ? 'white' : '#94a3b8',
              border: filtro === f ? '1px solid transparent' : '1px solid #2a2f42'
            }}>{f}</button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar empresa, setor..."
            style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 8, padding: '7px 12px 7px 30px', color: '#e2e8f0', fontSize: 13, width: 220, outline: 'none' }} />
        </div>
      </div>

      <div style={{ color: '#64748b', fontSize: 12 }}>{filtered.length} case{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filtered.map(caso => (
          <div key={caso.id} onClick={() => setSelectedCase(caso)}
            style={{ background: '#1a1f2e', border: '1px solid #2a2f42', borderRadius: 12, padding: 20, cursor: 'pointer', transition: 'border-color 0.15s, transform 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2f42'; e.currentTarget.style.transform = 'translateY(0)' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <TipoBadge tipo={caso.tipo} />
                <StatusBadge status={caso.status} />
              </div>
              <span style={{ color: '#64748b', fontSize: 12 }}>{caso.ano}</span>
            </div>

            <div style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{caso.adquirente}</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>← {caso.alvo}</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ color: '#3b82f6', fontSize: 18, fontWeight: 800 }}>{caso.valor_est}</span>
              <span style={{ color: '#64748b', fontSize: 12, background: '#151924', padding: '3px 8px', borderRadius: 6 }}>{caso.setor}</span>
            </div>

            {caso.ev_ebitda && caso.ev_ebitda !== 'n.a.' && (
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 12 }}>
                  <span style={{ color: '#64748b' }}>EV/EBITDA: </span>
                  <span style={{ color: '#eab308', fontWeight: 700 }}>{caso.ev_ebitda}</span>
                </div>
                {caso.ev_receita && caso.ev_receita !== 'n.a.' && (
                  <div style={{ fontSize: 12 }}>
                    <span style={{ color: '#64748b' }}>EV/Rec: </span>
                    <span style={{ color: '#eab308', fontWeight: 700 }}>{caso.ev_receita}</span>
                  </div>
                )}
              </div>
            )}

            <div style={{ borderTop: '1px solid #2a2f42', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#64748b', fontSize: 11 }}>{caso.assessor_fin_comprador}</span>
              <span style={{ color: '#3b82f6', fontSize: 12, fontWeight: 600 }}>Ver Case →</span>
            </div>
          </div>
        ))}
      </div>

      {selectedCase && <CaseModal caso={selectedCase} onClose={() => setSelectedCase(null)} />}
    </div>
  )
}
