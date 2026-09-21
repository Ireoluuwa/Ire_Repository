import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { leadershipExperience, professionalExperience } from './experienceData'

function ExperienceDetail({ item }) {
  return (
    <motion.div
      className="experience-detail"
      key={item.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
    >
      <div className="experience-detail-intro">
        <span className="experience-number">{item.number}</span>
        <div>
          <span className="experience-category">{item.category}</span>
          <h3>{item.role}</h3>
          <p className="experience-company">{item.company} <span>/</span> {item.date}</p>
        </div>
      </div>
      <p className="experience-full-description">{item.fullDescription}</p>

      <div className="experience-detail-grid">
        <div>
          <span className="experience-kicker">What I did</span>
          <ul>
            {item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
          </ul>
        </div>
        <div>
          <span className="experience-kicker">What I worked with</span>
          <div className="experience-tags">
            {item.technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
          <span className="experience-kicker experience-kicker-spaced">What I learned</span>
          <ul>
            {item.learnings.map((learning) => <li key={learning}>{learning}</li>)}
          </ul>
        </div>
      </div>

      <div className="experience-highlights">
        {item.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
      </div>
    </motion.div>
  )
}

function ExperienceList({ items, activeId, onSelect }) {
  return (
    <div className="experience-list" role="tablist" aria-label="Experience entries">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`experience-list-item ${activeId === item.id ? 'is-selected' : ''}`}
          onClick={() => onSelect(item)}
          role="tab"
          aria-selected={activeId === item.id}
        >
          <span className="experience-list-number">{item.number}</span>
          <span className="experience-list-copy">
            <strong>{item.company}</strong>
            <small>{item.role}</small>
          </span>
          <ChevronRight className="experience-list-arrow" size={18} />
        </button>
      ))}
    </div>
  )
}

function ExperienceReader({ item, index, onClose, onSelect }) {
  const allExperience = [...professionalExperience, ...leadershipExperience]
  const previous = allExperience[index - 1]
  const next = allExperience[index + 1]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && previous) onSelect(previous)
      if (event.key === 'ArrowRight' && next) onSelect(next)
    }
    document.body.style.overflow = 'hidden'
    document.body.classList.add('experience-reader-open')
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('experience-reader-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [next, onClose, onSelect, previous])

  return (
    <motion.div
      className="experience-reader"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.role} at ${item.company}`}
    >
      <div className="experience-reader-topbar">
        <button type="button" className="experience-return-button" onClick={onClose}>
          <ChevronLeft size={17} /> Return to Experiences
        </button>
        <span>{item.number} / 07</span>
        <button type="button" className="experience-reader-close" onClick={onClose} aria-label="Close experience">
          <X size={19} />
        </button>
      </div>

      <div className="experience-reader-hero">
        <motion.img
          src={item.image}
          alt={item.alt}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <div className="experience-reader-shade" />
        <div className="experience-reader-hero-copy">
          <span>{item.category}</span>
          <h2>{item.role}</h2>
          <p>{item.company} <b>/</b> {item.date}</p>
        </div>
      </div>

      <div className="experience-reader-body">
        <ExperienceDetail item={item} />
        <div className="experience-reader-navigation">
          {previous ? (
            <button type="button" onClick={() => onSelect(previous)}>
              <ArrowLeft size={17} /><span><small>Previous experience</small>{previous.role}</span>
            </button>
          ) : <span />}
          {next ? (
            <button type="button" onClick={() => onSelect(next)}>
              <span><small>Next experience</small>{next.role}</span><ArrowRight size={17} />
            </button>
          ) : <span />}
        </div>
      </div>
    </motion.div>
  )
}

export function ExperienceSection() {
  const allExperience = [...professionalExperience, ...leadershipExperience]
  const [activeItem, setActiveItem] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const activeId = selectedItem?.id ?? null
  const selectedIndex = selectedItem ? allExperience.findIndex((item) => item.id === selectedItem.id) : -1
  const previewItem = activeItem ?? professionalExperience[0]

  const openExperience = (item) => {
    setActiveItem(item)
    setSelectedItem(item)
  }

  return (
    <section className="experience section-shell" id="experience">
      <div className="experience-heading">
        <div>
          <div className="section-label">Experience</div>
          <h2>Where curiosity became practice.</h2>
        </div>
        <p>Professional work, project ownership, teaching and leadership, collected in one living archive.</p>
      </div>

      <div className="experience-archive">
        <div className="experience-feature">
          <button className="experience-feature-visual" type="button" onClick={() => openExperience(previewItem)} aria-label={`Open ${previewItem.role}`}>
            <AnimatePresence mode="wait">
              <motion.img
                key={previewItem.id}
                src={previewItem.image}
                alt={previewItem.alt}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            </AnimatePresence>
            <div className="experience-feature-shade" />
            <div className="experience-feature-meta">
              <span>{selectedItem ? `${previewItem.number} / 07` : '07 experiences'}</span>
              <span>{selectedItem ? previewItem.category : 'Select a chapter'}</span>
            </div>
            <div className="experience-feature-label">
              <span>{selectedItem ? 'Open experience' : 'Choose an experience'}</span>
              <ArrowUpRight size={18} />
            </div>
          </button>
          <a className="experience-project-link" href="#work">See what I've built <ArrowUpRight size={16} /></a>
        </div>

        <div className="experience-archive-content">
          <div className="experience-selection-note">
            <span className="experience-kicker">Professional archive</span>
            <p>Select an experience to enter its story.</p>
            <ExperienceList items={professionalExperience} activeId={activeId} onSelect={openExperience} />
          </div>
        </div>
      </div>

      <div className="experience-subsection">
        <div className="experience-subsection-heading">
          <div className="section-label">Leadership & Community</div>
          <p>Experience that happens with people, not only systems.</p>
        </div>
        <ExperienceList items={leadershipExperience} activeId={activeId} onSelect={openExperience} />
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ExperienceReader
            item={selectedItem}
            index={selectedIndex}
            onClose={() => setSelectedItem(null)}
            onSelect={openExperience}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
