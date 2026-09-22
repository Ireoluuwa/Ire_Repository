import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, BrainCircuit, Code2, Hammer, Palette, Sparkles } from 'lucide-react'

const visualIcons = {
  software: Code2,
  ai: BrainCircuit,
  creative: Palette,
  building: Hammer,
}

function ServiceVisual({ area, compact = false }) {
  const Icon = visualIcons[area.id]

  return (
    <div className={`what-visual what-visual-${area.visual} ${compact ? 'compact' : ''}`} aria-hidden="true">
      {area.visual === 'browser' && (
        <div className="browser-art">
          <div className="browser-bar"><i /><i /><i /><span>ire / building.js</span></div>
          <div className="browser-body"><b>&lt;idea /&gt;</b><span>const useful = true</span><em>return somethingReal()</em></div>
          <div className="browser-panel"><span>API</span><span>DATA</span><span>UI</span></div>
        </div>
      )}
      {area.visual === 'network' && (
        <div className="network-art">
          <span className="node node-a" /><span className="node node-b" /><span className="node node-c" /><span className="node node-d" /><span className="node node-e" />
          <span className="network-line line-a" /><span className="network-line line-b" /><span className="network-line line-c" /><span className="network-line line-d" />
          <span className="network-orbit orbit-a" /><span className="network-orbit orbit-b" />
        </div>
      )}
      {area.visual === 'collage' && (
        <div className="collage-art"><span className="collage-word">MAKE</span><span className="collage-shape shape-a" /><span className="collage-shape shape-b" /><span className="collage-label">type / colour / feeling</span></div>
      )}
      {area.visual === 'stack' && (
        <div className="stack-art"><span className="stack-card stack-back">IDEA</span><span className="stack-card stack-middle">TRY</span><span className="stack-card stack-front">BUILD <ArrowUpRight size={18} /></span></div>
      )}
      <div className="what-visual-icon"><Icon size={compact ? 20 : 28} strokeWidth={1.5} /></div>
    </div>
  )
}

export function WhatIDoCard({ area, onOpen, onHover, onLeave }) {
  return (
    <motion.a
      href={`#${area.id}`}
      className={`what-card what-card-${area.colour}`}
      onClick={(event) => {
        event.preventDefault()
        onOpen(area.id)
      }}
      onMouseEnter={() => onHover('project')}
      onMouseLeave={onLeave}
      whileHover={{ y: -10 }}
      whileFocus={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="what-card-top"><span>{area.number}</span><span className="what-card-explore">Explore <ArrowUpRight size={16} /></span></div>
      <ServiceVisual area={area} compact />
      <div className="what-card-copy"><h3>{area.title}</h3><p>{area.shortDescription}</p></div>
      <div className="what-card-footer"><span>Open this door</span><ArrowRight size={18} /></div>
    </motion.a>
  )
}

export function WhatIDoPage({ area, previous, next, onNavigate }) {
  return (
    <motion.main
      className={`what-page what-page-${area.colour}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <section className="what-page-hero section-shell">
        <div className="what-page-back-row"><a href="#work" onClick={() => onNavigate('work')}><ArrowLeft size={16} /> Back to What I Do</a><span>{area.number} / 04</span></div>
        <div className="what-page-hero-grid">
          <div className="what-page-heading"><span className="section-label">What I do / {area.title}</span><h1>{area.title}</h1><p className="what-page-intro">{area.intro}</p><p className="what-page-description">{area.fullDescription}</p></div>
          <ServiceVisual area={area} />
        </div>
      </section>

      <section className="what-page-content section-shell">
        <div className="what-page-column"><span className="section-label">The toolkit</span><div className="what-skills">{area.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
        <div className="what-page-column what-page-work"><span className="section-label">Things in this room</span><div className="what-projects">{area.projects.map((project) => <article key={project.title}><div><span>{project.type}</span><h2>{project.title}</h2></div><p>{project.detail}</p></article>)}</div></div>
      </section>

      {area.id === 'creative' && <section className="creative-gallery section-shell"><div className="section-label">A little visual evidence</div><div className="creative-gallery-grid"><div className="gallery-tile gallery-type"><span>TYPE</span><strong>MAKE<br />IT FEEL<br />LIKE<br />SOMETHING.</strong></div><div className="gallery-tile gallery-colour"><span>COLOUR STUDY</span><i /><i /><i /><i /></div><div className="gallery-tile gallery-craft"><span>WORK IN PROGRESS</span><strong>hands busy,<br />head full.</strong><small>replaceable creative placeholder</small></div></div></section>}

      {area.id === 'building' && <section className="building-process section-shell"><span className="section-label">The recurring plot</span><div className="process-line">{['Idea', 'Experiment', 'Build', 'Break', 'Fix', 'Learn', 'Build again'].map((step, index) => <span key={step}><b>0{index + 1}</b>{step}{index < 6 && <ArrowRight size={16} />}</span>)}</div></section>}

      <section className="what-page-navigation section-shell"><a href="#work" onClick={() => onNavigate('work')}><ArrowLeft size={16} /> Back to What I Do</a><a className="next-door" href={`#${next.id}`} onClick={() => onNavigate(next.id)}><span><small>Next room</small>{next.title}</span><ArrowRight size={22} /></a></section>
    </motion.main>
  )
}
