import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, X } from 'lucide-react'
import { journeyData } from './journeyData'

function JourneyDetail({ chapter, index, onClose, onSelectChapter }) {
  const previous = journeyData[index - 1]
  const next = journeyData[index + 1]

  const goToContact = () => {
    onClose()
    window.requestAnimationFrame(() => {
      window.location.hash = 'contact'
    })
  }

  return (
    <motion.div
      className={`journey-detail ${chapter.open ? 'journey-detail-open' : ''}`}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      role="dialog"
      aria-modal="true"
      aria-label={`${chapter.number} ${chapter.title}`}
    >
      <div className="journey-detail-topbar">
        <button className="journey-back-button" type="button" onClick={onClose}>
          <ChevronLeft size={17} /> Back to Journey
        </button>
        <span>{chapter.number} / 09</span>
        <button className="journey-close-button" type="button" onClick={onClose} aria-label="Close chapter">
          <X size={19} />
        </button>
      </div>

      <div className="journey-detail-hero">
        <motion.img
          src={chapter.image}
          alt={chapter.alt}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
        <div className="journey-detail-hero-shade" />
        <div className="journey-detail-hero-copy">
          <span className="journey-detail-number">Chapter {chapter.number}</span>
          <h2>{chapter.title}</h2>
          <p>{chapter.subtitle}</p>
        </div>
      </div>

      <div className="journey-detail-body">
        <div className="journey-detail-intro">
          <span className="journey-kicker">A page from the story</span>
          <p>{chapter.story}</p>
          <blockquote>“{chapter.quote}”</blockquote>
        </div>

        <div className="journey-detail-columns">
          <article>
            <span className="journey-kicker">Key learnings</span>
            <ul>{chapter.learnings.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <span className="journey-kicker">Highlights</span>
            <ul>{chapter.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <span className="journey-kicker">Tools & threads</span>
            <div className="journey-detail-tags">
              {chapter.technologies.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
        </div>

        <div className="journey-reflection">
          <span className="journey-kicker">Personal reflection</span>
          <p>{chapter.reflection}</p>
        </div>

        <div className="journey-detail-navigation">
          {previous ? (
            <button type="button" onClick={() => onSelectChapter(index - 1)}>
              <ArrowLeft size={17} />
              <span><small>Previous chapter</small>{previous.title}</span>
            </button>
          ) : <span />}
          {next ? (
            <button type="button" onClick={() => onSelectChapter(index + 1)}>
              <span><small>Next chapter</small>{next.title}</span>
              <ArrowRight size={17} />
            </button>
          ) : (
            <button type="button" onClick={goToContact}>
              <span><small>The next chapter</small>Maybe the next chapter includes you.</span>
              <ArrowUpRight size={17} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function JourneySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [maxOffset, setMaxOffset] = useState(0)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !trackRef.current) return
      setMaxOffset(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (selectedIndex === null) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedIndex(null)
      if (event.key === 'ArrowRight' && selectedIndex < journeyData.length - 1) setSelectedIndex(selectedIndex + 1)
      if (event.key === 'ArrowLeft' && selectedIndex > 0) setSelectedIndex(selectedIndex - 1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex])

  const cardStep = () => {
    const card = trackRef.current?.querySelector('.journey-card')
    if (!card) return 320
    return card.getBoundingClientRect().width + 18
  }

  const moveTo = (nextIndex) => {
    setActiveIndex(Math.max(0, Math.min(journeyData.length - 1, nextIndex)))
  }

  return (
    <>
      <section className="journey section-shell" id="journey">
        <div className="journey-heading">
          <div>
            <div className="section-label">My journey</div>
            <h2>A timeline of a curious mind.</h2>
          </div>
          <p>Different chapters, same girl — learning, building, creating and figuring it out as I go.</p>
        </div>

        <div className="journey-carousel-head">
          <span className="journey-caption">Nine chapters, one ongoing story</span>
          <div className="journey-controls">
            <button type="button" onClick={() => moveTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous journey chapter">
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => moveTo(activeIndex + 1)} disabled={activeIndex === journeyData.length - 1} aria-label="Next journey chapter">
              <ArrowRight size={18} />
            </button>
            <span className="journey-progress-count">{String(activeIndex + 1).padStart(2, '0')} / 09</span>
          </div>
        </div>

        <div className="journey-viewport" ref={viewportRef}>
          <motion.div
            className="journey-track"
            ref={trackRef}
            animate={{ x: -Math.min(activeIndex * cardStep(), maxOffset) }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            drag="x"
            dragConstraints={{ left: -maxOffset, right: 0 }}
            dragElastic={0.14}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50 || info.velocity.x < -400) moveTo(activeIndex + 1)
              if (info.offset.x > 50 || info.velocity.x > 400) moveTo(activeIndex - 1)
            }}
          >
            {journeyData.map((chapter, index) => (
              <motion.button
                className={`journey-card ${chapter.open ? 'journey-card-open' : ''} ${activeIndex === index ? 'is-active' : ''}`}
                key={chapter.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.985 }}
                aria-label={`Explore chapter ${chapter.number}: ${chapter.title}`}
              >
                <img src={chapter.image} alt={chapter.alt} draggable="false" />
                <span className="journey-card-shade" />
                <span className="journey-card-topline"><b>{chapter.number}</b><span>{chapter.open ? 'In progress' : 'Chapter'}</span></span>
                <span className="journey-card-content">
                  <strong>{chapter.title}</strong>
                  <small>{chapter.shortDescription}</small>
                </span>
                <span className="journey-card-action">Explore chapter <ArrowUpRight size={16} /></span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div className="journey-progress-line" aria-hidden="true">
          <span style={{ width: `${((activeIndex + 1) / journeyData.length) * 100}%` }} />
        </div>
        <p className="journey-hint">Drag, swipe or choose a chapter to enter the story.</p>
      </section>

      <AnimatePresence>
        {selectedIndex !== null && (
          <JourneyDetail
            chapter={journeyData[selectedIndex]}
            index={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            onSelectChapter={setSelectedIndex}
          />
        )}
      </AnimatePresence>
    </>
  )
}
