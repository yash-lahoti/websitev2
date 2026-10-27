import { useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { SmoothScroll } from './lib/smooth-scroll.jsx'
import { ScrollTrigger } from './lib/gsap'
import Preloader from './components/Preloader.jsx'
import Nav from './components/Nav.jsx'
import SlideViewer from './components/SlideViewer.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Experience from './sections/Experience.jsx'
import Research from './sections/Research.jsx'
import Works from './sections/Works.jsx'
import Publications from './sections/Publications.jsx'
import Capabilities from './sections/Capabilities.jsx'
import Footer from './sections/Footer.jsx'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Lock scroll until preloader finishes; refresh triggers after fonts/images settle.
    document.documentElement.classList.toggle('is-loading', !ready)
    if (ready) {
      window.__ready = true
      const t = setTimeout(() => ScrollTrigger.refresh(), 50)
      return () => clearTimeout(t)
    }
  }, [ready])

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll enabled={ready}>
        <Preloader onDone={() => setReady(true)} />
        <Nav />
        <div className="page">
          <main className="page__main">
            <Hero ready={ready} />
            <About />
            <Experience />
            <Research />
            <Works />
            <Publications />
            <Capabilities />
          </main>
          <Footer />
        </div>
        <SlideViewer ready={ready} />
      </SmoothScroll>
    </MotionConfig>
  )
}
