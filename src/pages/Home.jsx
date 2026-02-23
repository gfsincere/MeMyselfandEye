import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="home-section">
      <div className="home-content">
        <div className="home-hero">
          <h1 className="hero-title">
            Hacker/<br />IT Architect/<br />Photographer
          </h1>
        </div>
        <div className="home-intro">
          <p>
            New Zealand based/Chicago raised experienced Information Security and
            Infrastructure Engineer specializing in cloud solutions, security architecture, and
            automating resilient, high-performance systems.
          </p>
          <br />
          <p className="home-tagline">...and sometimes I take pictures.</p>
        </div>
      </div>

      <div className="home-cta">
        <Link to="/gallery" className="cta-link">View Gallery</Link>
        <Link to="/resume" className="cta-link">View Resume</Link>
        <Link to="/blog" className="cta-link">Read Blog</Link>
      </div>

      <div className="social-icons">
        <a className="social-icon" href="https://www.linkedin.com/in/gregoriethomas" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a className="social-icon" href="https://github.com/gfsincere" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
      </div>
    </section>
  )
}
