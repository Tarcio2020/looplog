'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleHelp,
  Earth,
  Leaf,
  Menu,
  Recycle,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'

const instagramUrl = 'https://www.instagram.com/looplog2026/'

const materials = [
  {
    name: 'Garrafas PET',
    category: 'Plásticos',
    detail: 'Garrafas de água, refrigerante e embalagens PET limpas.',
    rate: '10 LoopCoins',
    unit: 'por kg',
    icon: '♻',
    tone: 'mint',
    image: '/material-pet.png',
  },
  {
    name: 'Latas de alumínio',
    category: 'Metais',
    detail: 'Latas de bebidas vazias e amassadas para reciclagem.',
    rate: '18 LoopCoins',
    unit: 'por kg',
    icon: '◉',
    tone: 'lime',
    image: '/material-aluminum.png',
  },
  {
    name: 'Papel e papelão',
    category: 'Papel',
    detail: 'Caixas, jornais e folhas secas, sem gordura ou umidade.',
    rate: '6 LoopCoins',
    unit: 'por kg',
    icon: '▤',
    tone: 'sand',
    image: '/material-paper.png',
  },
  {
    name: 'Eletrônicos',
    category: 'Eletrônicos',
    detail: 'Celulares, cabos e pequenos aparelhos fora de uso.',
    rate: 'Consulte',
    unit: 'avaliação especial',
    icon: '⌁',
    tone: 'lavender',
    image: '/material-electronics.png',
  },
]

const categories = ['Todos', 'Plásticos', 'Metais', 'Papel', 'Eletrônicos']

export function LooplogSite() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')
  const [selected, setSelected] = useState<string[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [listCopied, setListCopied] = useState(false)

  const filteredMaterials = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR')
    return materials.filter((material) => {
      const matchesCategory = category === 'Todos' || material.category === category
      const matchesQuery = `${material.name} ${material.detail} ${material.category}`
        .toLocaleLowerCase('pt-BR')
        .includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const selectedMaterials = materials.filter((material) => selected.includes(material.name))
  const contactUrl = instagramUrl

  function toggleMaterial(name: string) {
    setSelected((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    )
    setListCopied(false)
  }

  async function copySelectedList() {
    const message = `Olá, Looplog! Tenho interesse em reciclar: ${selectedMaterials.map((item) => item.name).join(', ')}. Como funciona a entrega e a pontuação LoopCoin?`
    try {
      await navigator.clipboard.writeText(message)
      setListCopied(true)
    } catch {
      setListCopied(false)
    }
  }

  return (
    <main className="looplog-shell">
      <div className="announcement">
        <span className="announcement-dot" />
        Um futuro melhor começa no próximo descarte.
        <a href="#como-funciona">Descubra como <ArrowRight aria-hidden="true" /></a>
      </div>

      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="Looplog — início">
          <span className="brand-mark"><Recycle aria-hidden="true" /></span>
          <span>looplog<span className="brand-period">.</span><small>ECONOMIA QUE CIRCULA</small></span>
        </a>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Navegação principal">
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
          <a href="#materiais" onClick={() => setMenuOpen(false)}>Materiais</a>
          <a href="#loopcoin" onClick={() => setMenuOpen(false)}>LoopCoin</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre o projeto</a>
          <a className="nav-cta" href={instagramUrl} target="_blank" rel="noreferrer">Fale com a gente <ArrowUpRight aria-hidden="true" /></a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span /> SUSTENTABILIDADE QUE GERA VALOR</div>
          <h1>Seu lixo pode<br />valer <span>muito mais.</span></h1>
          <p className="hero-lead">Recicle. Ganhe. Transforme.</p>
          <p className="hero-description">Na Looplog, materiais que seriam descartados ganham um novo ciclo — e podem render LoopCoins para você.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#materiais">Quero reciclar <ArrowRight aria-hidden="true" /></a>
            <a className="button-text" href="#como-funciona">Conheça o projeto <ArrowDown aria-hidden="true" /></a>
          </div>
          <div className="hero-proof"><div className="proof-icons"><span><Leaf /></span><span><Earth /></span><span><Recycle /></span></div><p>Pequenas atitudes.<br /><strong>Um impacto que se multiplica.</strong></p></div>
        </div>
        <div className="hero-art">
          <div className="hero-art-glow" />
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dMhq8ys7bRN36YWb5jx4PfM34mAnnj.png" alt="Arte da Looplog com o planeta Terra, uma moeda LoopCoin e a mensagem: seu lixo pode valer muito mais." />
          <div className="floating-note"><span className="note-icon"><Recycle /></span><span>UM NOVO CICLO<br /><strong>COMEÇA COM VOCÊ</strong></span></div>
          <div className="hero-caption"><span>01 / 04</span><span>RECICLE. GANHE. TRANSFORME.</span></div>
        </div>
      </section>

      <section className="impact-strip" aria-label="Princípios da Looplog">
        <div><span>01</span><p>DESCARTE CONSCIENTE</p></div><i />
        <div><span>02</span><p>ECONOMIA CIRCULAR</p></div><i />
        <div><span>03</span><p>RECOMPENSA COM PROPÓSITO</p></div>
      </section>

      <section className="how-section section-wrap" id="como-funciona">
        <div className="section-heading"><div><div className="eyebrow"><span /> UM CICLO SIMPLES, UM IMPACTO REAL</div><h2>Fazer a diferença<br />pode ser <em>simples.</em></h2></div><p>O que não serve mais para você pode ser o começo de algo novo. Veja como a Looplog conecta descarte e transformação.</p></div>
        <div className="steps-grid">
          <article className="step-card"><span className="step-number">01</span><span className="step-icon"><Search /></span><h3>Separe</h3><p>Identifique os materiais recicláveis da sua casa, escola ou comércio.</p><span className="step-bottom">CADA MATERIAL CONTA</span></article>
          <article className="step-card step-highlight"><span className="step-number">02</span><span className="step-icon"><Recycle /></span><h3>Conecte</h3><p>Consulte a Looplog para saber como encaminhar os materiais corretamente.</p><span className="step-bottom">UM DESTINO MELHOR</span></article>
          <article className="step-card"><span className="step-number">03</span><span className="step-icon"><Sparkles /></span><h3>Transforme</h3><p>O material volta para a cadeia produtiva e você pode receber LoopCoins.</p><span className="step-bottom">VALOR QUE CIRCULA</span></article>
        </div>
      </section>

      <section className="catalog-section" id="materiais">
        <div className="section-wrap">
          <div className="section-heading catalog-heading"><div><div className="eyebrow"><span /> O QUE PODE GANHAR UM NOVO CICLO</div><h2>Materiais que <em>movem</em><br />a mudança.</h2></div><p>Conheça alguns dos materiais que podem ser encaminhados para reciclagem. Tem dúvidas sobre um item? Chame a equipe Looplog.</p></div>
          <div className="catalog-controls">
            <div className="category-tabs" role="group" aria-label="Filtrar materiais por categoria">{categories.map((item) => <button key={item} className={category === item ? 'category-tab active' : 'category-tab'} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div>
            <label className="search-box"><Search aria-hidden="true" /><span className="sr-only">Buscar material</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar material..." /></label>
          </div>
          <div className="materials-grid">
            {filteredMaterials.map((material, index) => {
              const isSelected = selected.includes(material.name)
              return <article className="material-card" key={material.name} style={{ animationDelay: `${index * 70}ms` }}>
                <div className={`material-image ${material.tone}`}><img src={material.image} alt={`Exemplos de ${material.name.toLowerCase()} para reciclagem`} loading="lazy" /><span className="material-category">{material.category}</span><span className="material-symbol" aria-hidden="true">{material.icon}</span></div>
                <div className="material-info"><div className="material-title"><h3>{material.name}</h3><span className="rate">{material.rate}</span></div><p>{material.detail}</p><div className="material-footer"><span>{material.unit}</span><button className={isSelected ? 'select-material selected' : 'select-material'} onClick={() => toggleMaterial(material.name)} aria-pressed={isSelected}>{isSelected ? <><Check /> Adicionado</> : <>Tenho esse material <ArrowRight /></>}</button></div></div>
              </article>
            })}
            {filteredMaterials.length === 0 && <div className="empty-results"><CircleHelp /><h3>Não encontramos esse material</h3><p>Experimente outro termo ou converse com a equipe Looplog.</p><a href={instagramUrl} target="_blank" rel="noreferrer">Fale com a gente <ArrowUpRight /></a></div>}
          </div>
          <div className="catalog-footnote"><CircleHelp aria-hidden="true" /><p>As pontuações são ilustrativas. A elegibilidade, pesagem e quantidade de LoopCoins dependem da avaliação do projeto.</p><a href={instagramUrl} target="_blank" rel="noreferrer">Tire suas dúvidas <ArrowUpRight /></a></div>
        </div>
      </section>

      <section className="coin-section" id="loopcoin">
        <div className="coin-orb" aria-hidden="true"><div className="coin-ring"><span>LOOP</span><Recycle /><span>COIN</span></div></div>
        <div className="coin-copy"><div className="eyebrow light"><span /> UMA MOEDA COM PROPÓSITO</div><h2>Conheça a<br /><em>LoopCoin.</em></h2><p>Uma forma de reconhecer atitudes sustentáveis. A proposta da LoopCoin é transformar a participação na economia circular em valor para a comunidade.</p><div className="coin-points"><div><span><Check /></span><p>Recompensar ações sustentáveis</p></div><div><span><Check /></span><p>Valorizar a reciclagem local</p></div><div><span><Check /></span><p>Incentivar escolhas conscientes</p></div></div><a href={instagramUrl} target="_blank" rel="noreferrer" className="button-lime">Quero saber mais <ArrowUpRight /></a><p className="coin-note">Projeto em desenvolvimento. Carteira digital, saldo e resgates ainda não estão ativos.</p></div>
      </section>

      <section className="about-section section-wrap" id="sobre"><div className="about-mark"><div className="about-circle"><Recycle /><span>LOOPLOG</span><small>UM MUNDO MELHOR</small></div><div className="about-stamp">JEEP<br /><span>SEBRAE</span></div></div><div className="about-copy"><div className="eyebrow"><span /> IDEIAS QUE FAZEM A DIFERENÇA</div><h2>Aprender a empreender.<br />Empreender para <em>transformar.</em></h2><p>A Looplog é um projeto desenvolvido por alunos para o JEEP — Jovens Empreendedores Primeiros Passos, do Sebrae. Uma ideia que une educação empreendedora, economia circular e cuidado com o meio ambiente.</p><a href={instagramUrl} target="_blank" rel="noreferrer" className="button-outline">Acompanhe no Instagram <ArrowUpRight /></a></div></section>

      <section className="join-section"><div><span className="join-kicker">O PRÓXIMO CICLO COMEÇA AGORA</span><h2>Vamos fazer o bem<br />circular?</h2><p>Traga sua escola, comércio ou comunidade para essa ideia.</p></div><a href={instagramUrl} target="_blank" rel="noreferrer" className="join-button">Converse com a Looplog <ArrowUpRight /></a><div className="join-decoration" aria-hidden="true"><span>∞</span></div></section>

      <footer className="site-footer"><a href="#inicio" className="brand footer-brand"><span className="brand-mark"><Recycle aria-hidden="true" /></span><span>looplog<span className="brand-period">.</span><small>ECONOMIA QUE CIRCULA</small></span></a><p>Seu lixo vira loop, seu loop vira dinheiro.</p><div className="footer-right"><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight /></a><span>© 2026 Looplog · Projeto JEEP Sebrae</span></div></footer>

      {selected.length > 0 && <div className="selection-bar"><div className="selection-count"><span><ShoppingBag /></span><div><strong>{selected.length} {selected.length === 1 ? 'material selecionado' : 'materiais selecionados'}</strong><small>Monte sua lista e fale com a Looplog</small></div></div><button className="selection-clear" onClick={() => setSelected([])} aria-label="Limpar materiais selecionados"><X /></button><button type="button" onClick={copySelectedList} className="selection-cta">{listCopied ? 'Lista copiada' : 'Copiar lista'} <Check /></button></div>}
      {showCart && <div className="cart-overlay" onClick={() => setShowCart(false)} role="presentation"><div className="cart-panel" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="cart-title"><button className="cart-close" onClick={() => setShowCart(false)} aria-label="Fechar"><X /></button><ShoppingBag /><h2 id="cart-title">Sua lista de materiais</h2><p>Selecione os materiais que você quer encaminhar para reciclagem no catálogo.</p>{selectedMaterials.map((material) => <div className="cart-row" key={material.name}><span>{material.name}</span><button onClick={() => toggleMaterial(material.name)} aria-label={`Remover ${material.name}`}><X /></button></div>)}<a href={contactUrl} target="_blank" rel="noreferrer" className="button-primary">Consultar pelo Instagram <ArrowUpRight /></a><small>Sem compra ou envio automático. Combine os detalhes diretamente com a equipe.</small></div></div>}
      <a className="floating-bag" href="#materiais" aria-label={`Ver catálogo de materiais (${selected.length} selecionados)`} onClick={() => setShowCart(true)}><ShoppingBag />{selected.length > 0 && <span>{selected.length}</span>}</a>
    </main>
  )
}
