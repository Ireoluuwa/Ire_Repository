import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Database, FileText, GitBranch, Layers, Mic, ShieldCheck, Sparkles } from 'lucide-react'

const visualDetails = {
  feedsmart: { label: 'forecast / food / planning', icon: Sparkles },
  edumanage: { label: 'records / school / systems', icon: Database },
  ayo: { label: 'pits / stones / decisions', icon: Layers },
  uwaci: { label: 'voice / text / backend', icon: Mic },
  resq: { label: 'report / request / respond', icon: ShieldCheck },
  verified: { label: 'claim / evidence / trust', icon: FileText },
}

function ProjectVisual({ project, compact = false }) {
  const visual = visualDetails[project.visual]
  const Icon = visual.icon

  return (
    <div className={`case-visual case-visual-${project.visual} ${compact ? 'case-visual-compact' : ''}`} aria-label={`${project.title} visual placeholder`}>
      <div className="case-visual-grid" />
      {project.visual === 'feedsmart' && <><div className="food-tray"><i /><i /><i /><i /></div><div className="forecast-line"><span /><span /><span /><span /><span /></div><div className="forecast-axis">DEMAND / WEEK</div></>}
      {project.visual === 'edumanage' && <div className="school-dashboard"><span>STUDENT RECORDS</span><b /><b /><b /><b /><em>ATTENDANCE / PATTERNS</em></div>}
      {project.visual === 'ayo' && <div className="ayo-board"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>}
      {project.visual === 'uwaci' && <><div className="voice-wave"><i /><i /><i /><i /><i /><i /><i /></div><div className="api-stack"><span>API</span><span>DATA</span><span>LANG</span></div></>}
      {project.visual === 'resq' && <><div className="resq-alert">REQUEST <strong>OPEN</strong></div><div className="resq-lines"><i /><i /><i /></div><div className="resq-dot" /></>}
      {project.visual === 'verified' && <><div className="claim-document"><span>CLAIM / REVIEW</span><b /><b /><b /><em>TRUST SCORE / 0-100</em><strong>AI</strong></div><div className="verified-orbit" /></>}
      <div className="case-visual-caption"><Icon size={compact ? 16 : 20} /><span>{visual.label}</span></div>
    </div>
  )
}

export function ProjectCard({ project, onOpen, onHover, onLeave }) {
  return (
    <motion.a
      href={`#project-${project.id}`}
      className={`project-item ${project.size || ''} project-card-refined project-card-${project.visual}`}
      onClick={(event) => { event.preventDefault(); onOpen(project.id) }}
      onMouseEnter={() => onHover('project')}
      onMouseLeave={onLeave}
      whileHover={{ y: -8 }}
      whileFocus={{ y: -4 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <div className="project-visual"><ProjectVisual project={project} compact /></div>
      <div className="project-content">
        <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div>
        <h3>{project.title}</h3>
        <p>{project.shortDescription}</p>
        <div className="project-link">View case study <ArrowUpRight size={16} /></div>
      </div>
    </motion.a>
  )
}

function CaseStudyDiagram({ project }) {
  const steps = project.id === 'feedsmart'
    ? ['Historical meal data', 'Meal / attendance patterns', 'Demand forecasting', 'Expected students', 'Suggested quantity', 'Food planning']
    : project.id === 'ayo-game'
      ? ['Player move', 'Validate move', 'Distribute stones', 'Update board', 'Check score', 'Check win condition', 'AI decides next move']
      : project.id === 'verified'
        ? ['5 analysis modules', 'Trust score', 'Claim tier', 'Recommended action']
        : project.id === 'edumanage'
          ? ['Frontend', 'Backend / API', 'Database']
          : project.id === 'uwaci'
            ? ['Request', 'Traffic module', 'Validation + tests', 'Reliable response']
            : ['Report emergency', 'Manage request', 'Connect user + responder']

  return <div className={`case-diagram case-diagram-${project.id}`}>{steps.map((step, index) => <span key={step}><b>0{index + 1}</b>{step}{index < steps.length - 1 && <ArrowRight size={15} />}</span>)}</div>
}

export function ProjectCaseStudy({ project, previous, next, onNavigate }) {
  return (
    <motion.main className={`case-study case-study-${project.visual}`} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      <section className="case-hero section-shell">
        <div className="case-back-row"><a href="#creative" onClick={() => onNavigate('work')}><ArrowLeft size={16} /> Back to Featured Work</a><span>{project.number} / 06</span></div>
        <div className="case-hero-grid"><div className="case-heading"><div className="case-meta"><span>{project.category}</span><span>{project.year}</span></div><h1>{project.title}</h1><p>{project.longDescription}</p><div className="case-actions">{project.links.map((link) => <a key={link.href} className="case-live-link" href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={17} /></a>)}<span className="case-status">{project.status}</span></div></div><ProjectVisual project={project} /></div>
      </section>

      <section className="case-overview section-shell"><div className="case-overview-lead"><span className="section-label">Overview</span><h2>{project.role}</h2></div><div className="case-overview-copy"><p>{project.problem}</p><p>{project.approach}</p></div></section>

      <section className="case-story section-shell"><div className="case-story-main"><span className="section-label">The story</span><article><h2>The problem</h2><p>{project.problem}</p></article><article><h2>The idea / approach</h2><p>{project.approach}</p></article><article><h2>What I built</h2><div className="case-features">{project.features.map((feature) => <span key={feature}><Check size={15} />{feature}</span>)}</div></article><article><h2>The technical side</h2><p>{project.challenges}</p><CaseStudyDiagram project={project} /></article></div><aside className="case-toolkit"><span className="section-label">Technology</span><div>{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="case-note"><GitBranch size={18} /><p>Specific implementation details can keep growing here as the project evolves.</p></div></aside></section>

      <section className="case-reflection section-shell"><span className="section-label">What I learned</span><p>{project.outcome}</p><blockquote>“{project.reflection}”</blockquote></section>

      <section className="case-navigation section-shell"><a href={`#project-${previous.id}`} onClick={() => onNavigate(`project-${previous.id}`)}><ArrowLeft size={18} /><span><small>Previous project</small>{previous.title}</span></a><a href={`#project-${next.id}`} onClick={() => onNavigate(`project-${next.id}`)}><span><small>Next project</small>{next.title}</span><ArrowRight size={18} /></a></section>
    </motion.main>
  )
}
