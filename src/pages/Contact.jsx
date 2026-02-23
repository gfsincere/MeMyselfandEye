import React from 'react'

export default function Contact() {
  return (
    <section className="contact-page">
      <h2 className="contact-title">Contact Me</h2>
      <p className="contact-info">
        If you would like to get in touch with me about opportunities, please email me at:
      </p>
      <p className="contact-info">
        <a href="mailto:hello@gregoriethomas.com">hello@gregoriethomas.com</a>
      </p>
      <p className="contact-info">
        I am also available on LinkedIn at:
      </p>
      <p className="contact-info">
        <a href="https://www.linkedin.com/in/gregoriethomas" target="_blank" rel="noopener noreferrer">
          www.linkedin.com/in/gregoriethomas
        </a>
      </p>
    </section>
  )
}
