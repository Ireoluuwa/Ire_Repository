import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Music2,
  Phone,
  X,
} from 'lucide-react'
import { LogoMark } from './Logo'
import { ExperienceSection } from './ExperienceSection'
import { JourneySection } from './JourneySection'

const navItems = ['Work', 'About', 'Creative', 'Journey', 'Contact']

const menuPreviews = {
  Work: {
    eyebrow: 'selected work',
    title: 'Ideas, made useful.',
    detail: 'AI food systems / student tools / playful experiments',
    className: 'preview-work',
  },
  About: {
    eyebrow: 'a little context',
    title: 'Hi, that\'s me.',
    detail: 'code + curiosity + a little crochet',
    className: 'preview-about',
    image: '/img_6988.png',
  },
  Creative: {
    eyebrow: 'the visual side',
    title: 'Make it feel like something.',
    detail: 'UI / digital design / visual thinking',
    className: 'preview-creative',
  },
  Journey: {
    eyebrow: 'still becoming',
    title: 'Learning in public.',
    detail: 'technology, places, questions, onward',
    className: 'preview-journey',
  },
  Contact: {
    eyebrow: 'come say hello',
    title: 'Let\'s make a thing.',
    detail: 'available for thoughtful collaborations',
    className: 'preview-contact',
  },
}

const services = [
  {
    index: '01',
    title: 'Software',
    description: 'Web applications, frontend development, backend systems and APIs.',
    accent: 'studio',
  },
  {
    index: '02',
    title: 'AI',
    description: 'Machine learning, AI experimentation, forecasting and intelligent systems.',
    accent: 'amber',
  },
  {
    index: '03',
    title: 'Creative',
    description: 'UI design, branding, visual content, websites and digital experiences.',
    accent: 'sand',
  },
  {
    index: '04',
    title: 'Building',
    description: 'Turning ideas into real products, experiments and projects.',
    accent: 'charcoal',
  },
]

const projects = [
  {
    slug: 'feedsmart',
    title: 'FeedSmart',
    type: 'AI food systems',
    summary: 'AI-based food management system focused on reducing food waste and optimizing food distribution.',
    detail: 'The project explores demand forecasting to estimate meal demand and help determine appropriate food preparation quantities.',
    tech: ['Python', 'Forecasting', 'Data modelling'],
    accent: 'sand',
    size: 'large',
  },
  {
    slug: 'edumanage',
    title: 'EduManage',
    type: 'Student system',
    summary: 'A student management platform involving records, attendance, academics, payments and scheduling.',
    detail: 'Built for streamlined administration, authentication and academic operations across an education workflow.',
    tech: ['Auth', 'Admin flows', 'Automation'],
    accent: 'charcoal',
    size: 'medium',
  },
  {
    slug: 'ayo-game',
    title: 'Ayo Game',
    type: 'Python game',
    summary: 'A Python implementation of the traditional Ayo game.',
    detail: 'A strategic, interactive board game experience built to explore logic, game systems and playful interfaces.',
    tech: ['Python', 'Game logic', 'UX'],
    accent: 'amber',
    size: 'small',
  },
  {
    slug: 'uwaci',
    title: 'UWACI',
    type: 'Backend engineering',
    summary: 'Privacy-first multilingual AI platform built with robust backend engineering foundations.',
    detail: 'Relevant technologies include Python, FastAPI, PostgreSQL, SQLAlchemy, Pydantic, async APIs and automated testing.',
    tech: ['FastAPI', 'PostgreSQL', 'Async APIs'],
    accent: 'neutral',
    size: 'medium',
  },
]

const exploration = ['JavaScript', 'React', 'Backend Engineering', 'Python', 'C', 'Linux', 'AI / Machine Learning', 'UI / Digital Design']

const explorationLinks = {
  JavaScript: 'https://www.w3schools.com/js/',
  React: 'https://www.w3schools.com/react/',
  'Backend Engineering': 'https://www.w3schools.com/nodejs/',
  Python: 'https://www.w3schools.com/python/',
  C: 'https://www.w3schools.com/c/',
  Linux: 'https://www.w3schools.com/linux/',
  'AI / Machine Learning': 'https://www.w3schools.com/ai/',
  'UI / Digital Design': 'https://www.w3schools.com/css/',
}

const personalityTraits = [
  'Determined',
  'Decisive',
  'Productive',
  'Confident',
  'Leadership-oriented',
  'Warm',
  'Friendly',
  'Enthusiastic',
  'Compassionate',
  'Spontaneous',
  'Outgoing',
  'Communicative',
  'Energetic',
  'Persuasive',
  'Resourceful',
]

function App() {
  const [cursorVariant, setCursorVariant] = useState('default')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState('Work')
  const [scrollY, setScrollY] = useState(0)
  const [activeProject, setActiveProject] = useState(projects[0])
  const cursorRef = useRef(null)

  useEffect(() => {
    const handleMove = (event) => {
      if (!cursorRef.current) return
      cursorRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
    }

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  const navState = useMemo(() => (scrollY > 28 ? 'compact' : 'top'), [scrollY])

  return (
    <div className="page-shell">
      <div ref={cursorRef} className={`custom-cursor ${cursorVariant}`} aria-hidden="true">
        <span>{cursorVariant === 'project' ? 'VIEW' : 'HELLO'}</span>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { opacity: 1 },
              closed: { opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
            }}
          >
            <motion.div
              className="menu-wash"
              variants={{ open: { scaleY: 1 }, closed: { scaleY: 0 } }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            />
            <div className="mobile-menu-inner">
              <motion.div
                className="mobile-menu-header"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.45 }}
              >
                <a href="#top" onClick={() => setMenuOpen(false)} aria-label="Ire home"><LogoMark /></a>
                <div className="menu-kicker">A small map of Ire</div>
                <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <span>CLOSE</span>
                  <X size={18} />
                </button>
              </motion.div>

              <div className="menu-layout">
                <div className="menu-navigation-column">
                  <motion.div
                    className="menu-intro"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                  >
                    <span className="menu-label">Hello, I&apos;m Ire.</span>
                    <p>Developer, creative, curious human.</p>
                  </motion.div>
                  <nav className="menu-navigation" aria-label="Full-screen navigation">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className={activeMenuItem === item ? 'active' : ''}
                        onMouseEnter={() => setActiveMenuItem(item)}
                        onFocus={() => setActiveMenuItem(item)}
                        onClick={() => setMenuOpen(false)}
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.48 + index * 0.07, duration: 0.45, ease: 'easeOut' }}
                      >
                        <span className="menu-number">0{index + 1}</span>
                        <span className="menu-link-label">{item}</span>
                        <span className="menu-link-action">Explore <ArrowUpRight size={17} /></span>
                      </motion.a>
                    ))}
                  </nav>
                </div>

                <motion.div
                  className="menu-story-column"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.6, ease: 'easeOut' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMenuItem}
                      className={`menu-preview ${menuPreviews[activeMenuItem].className}`}
                      initial={{ opacity: 0, y: 14, rotate: 1.5 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      exit={{ opacity: 0, y: -12, rotate: -1.5 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      {menuPreviews[activeMenuItem].image && (
                        <img src={menuPreviews[activeMenuItem].image} alt="Ire beneath the Eiffel Tower at night" />
                      )}
                      <div className="preview-overlay" />
                      <span className="preview-sticker">{activeMenuItem === 'About' ? "that's me :)" : 'in progress'}</span>
                      <div className="preview-copy">
                        <span>{menuPreviews[activeMenuItem].eyebrow}</span>
                        <strong>{menuPreviews[activeMenuItem].title}</strong>
                        <small>{menuPreviews[activeMenuItem].detail}</small>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <div className="menu-details">
                    <div><span>Currently</span><strong>building + learning</strong></div>
                    <div><span>Based in</span><strong>Nigeria</strong></div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="menu-footer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72, duration: 0.45 }}
              >
                <span className="menu-footer-note">Technology, creativity and curiosity in motion.</span>
                <div className="menu-socials" aria-label="Social links">
                  <a href="mailto:akandeoluwaire91@gmail.com">Email</a>
                  <a href="https://github.com/Ireoluuwa" target="_blank" rel="noreferrer">GitHub</a>
                  <a href="https://www.linkedin.com/in/iretomiwaakande" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`site-header ${navState}`}>
        <div className="nav-wrap">
          <a href="#top" className="brand" aria-label="Ire home"><LogoMark /></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
            ))}
          </nav>
          <div className="nav-meta">
            <span className="status-dot" />
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>
          <button className="menu-button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <Menu size={18} />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <motion.div className="hero-ambient" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} />
          <div className="eyebrow-row">
            <span>Computer Science</span>
            <span>•</span>
            <span>Software</span>
            <span>•</span>
            <span>AI</span>
            <span>•</span>
            <span>Creative technology</span>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <motion.div
                className="hero-portrait"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              >
                <img className="hero-portrait-image" src="/mee.png" alt="Ireoluwatomiwa Akande smiling in front of a living wall and AWS display" />
                <div className="hero-portrait-shade" aria-hidden="true" />
                <span className="hero-hand-note">hi, that&apos;s me :)</span>
                <div className="hero-content">
                  <span className="hero-greeting">Hi, I&apos;m Ire.</span>
                  <h1>Code, curiosity, and things worth making.</h1>
                  <div className="hero-actions">
                    <a href="#work" className="primary-link">
                      View work
                      <ArrowUpRight size={16} />
                    </a>
                    <a href="#contact" className="secondary-link">Let&apos;s talk</a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="scroll-note">Scroll to explore</div>
        </section>

        <section className="identity section-shell" id="about">
          <div className="section-label">Identity</div>
          <div className="identity-story">
            <span>I started with code.</span>
            <br />
            <span>Then I added curiosity.</span>
            <br />
            <span>Then I added craft.</span>
            <br />
            <span>Now I'm building whatever I'm curious about.</span>
            
          </div>
        </section>

        <section className="services section-shell" id="work">
          <div className="section-head">
            <div className="section-label">What I do</div>
            <h2>Strategic thinking, creative execution, real product building.</h2>
          </div>
          <div className="service-list">
            {services.map((item) => (
              <motion.article
                key={item.title}
                className={`service-card ${item.accent}`}
                whileHover={{ y: -8 }}
                onHoverStart={() => setCursorVariant('project')}
                onHoverEnd={() => setCursorVariant('default')}
              >
                <div className="service-index">{item.index}</div>
                <div className="service-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="service-arrow">
                  <ArrowRight size={18} />
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="featured section-shell" id="creative">
          <div className="section-head split">
            <div>
              <div className="section-label">Featured work</div>
              <h2>Selected projects shaped by curiosity and craft.</h2>
            </div>
            <a href="#contact" className="inline-link">Let’s build something <ChevronRight size={16} /></a>
          </div>

          <div className="project-showcase">
            <div className="project-list">
              {projects.map((project) => (
                <button
                  key={project.slug}
                  type="button"
                  className={`project-item ${project.size} ${activeProject.slug === project.slug ? 'active' : ''}`}
                  onMouseEnter={() => {
                    setActiveProject(project)
                    setCursorVariant('project')
                  }}
                  onMouseLeave={() => setCursorVariant('default')}
                  onFocus={() => setActiveProject(project)}
                >
                  <div className={`project-visual gradient-${project.accent}`}>
                    <span>{project.title}</span>
                  </div>
                  <div className="project-content">
                    <div className="project-meta">
                      <span>{project.type}</span>
                      <span>{project.tech[0]}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="project-link">View case study <ArrowUpRight size={16} /></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="about-ire section-shell" id="about-ire">
          <div className="about-intro-line">
            <div className="section-label">About me</div>
            <span>Okay, but who is Ire?</span>
          </div>
          <div className="about-layout">
            <motion.div
              className="about-portrait"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="portrait-card">
                <img src="/img_6988.png" alt="Ireoluwatomiwa Akande beneath the Eiffel Tower at night" />
                <span className="portrait-note portrait-note-top">hi, that's me</span>
                <span className="portrait-note portrait-note-side">probably thinking about the next project</span>
                <span className="portrait-caption">code + curiosity + a little crochet</span>
              </div>
            </motion.div>
            <motion.div
              className="about-copy"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
            >
              <p className="about-opening">Hi, I’m Ire. I’m a Computer Science girl with a slightly unreasonable number of tabs open in my head.</p>
              <p>
                I build software, explore AI, work with backend systems and make websites do useful things. I have also worked with digital media, ICT support and real businesses, which means I’m just as interested in how technology meets people as I am in how it runs behind the scenes.
              </p>
              <p>
                I like design, branding, crochet and crafting too. Basically, if I get curious about something, there is a decent chance I will try to make it. Sometimes that means a project; sometimes it means learning why one stubborn line of code refuses to behave.
              </p>
              <div className="about-thread-list" aria-label="Things that make Ire">
                <span>code</span>
                <span>design</span>
                <span>AI</span>
                <span>websites</span>
                <span>crochet</span>
                <span>ideas I couldn't leave alone</span>
              </div>
            </motion.div>
          </div>
        </section>

        <ExperienceSection />

        <JourneySection />

        <section className="exploring section-shell">
          <div className="section-head">
            <div className="section-label">Currently exploring</div>
            <h2>What’s shaping the next ideas.</h2>
          </div>
          <div className="explore-tags" aria-label="Topics currently exploring">
            {exploration.map((item) => (
              <a
                key={item}
                href={explorationLinks[item]}
                target="_blank"
                rel="noreferrer"
              >
                {item}
              </a>
            ))}
          </div>
        </section>

        <section className="personality section-shell">
          <div className="section-label">Personality</div>
          <div className="personality-grid">
            {personalityTraits.map((trait) => (
              <a
                key={trait}
                href={`https://www.google.com/search?q=meaning+of+${encodeURIComponent(trait)}`}
                target="_blank"
                rel="noreferrer"
              >
                {trait}
              </a>
            ))}
          </div>
        </section>

        <section className="contact section-shell" id="contact">
          <div className="contact-copy">
            <div className="section-label">Let’s build</div>
            <h2>So… what are we building?</h2>
          </div>
          <div className="contact-links">
            <a href="mailto:akandeoluwaire91@gmail.com"><Mail size={18} /> akandeoluwaire91@gmail.com</a>
            <a href="tel:+2347080134867"><Phone size={18} /> +234 708 013 4867</a>
            <a href="https://github.com/Ireoluuwa" target="_blank" rel="noreferrer"><Github size={18} /> GitHub / Ireoluuwa</a>
            <a href="https://www.linkedin.com/in/iretomiwaakande" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
            <a href="https://www.tiktok.com/@ire0luwa_tom1wa" target="_blank" rel="noreferrer"><Music2 size={18} /> TikTok / ire0luwa_tom1wa</a>
            <a href="https://www.instagram.com/iree_oluwaa?stkn=MTRvZnJqYjkwaXBvOQ%3D%3D&utm_source=qr" target="_blank" rel="noreferrer"><Instagram size={18} /> Instagram / iree_oluwaa</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>IRE</span>
        <p>Technology, creativity and curiosity in motion.</p>
      </footer>
    </div>
  )
}

export default App
