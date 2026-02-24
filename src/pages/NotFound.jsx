import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="notfound-page">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/" className="cta-link">Back to Home</Link>
    </section>
  )
}
