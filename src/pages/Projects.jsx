import React from 'react'

const projects = [
  {
    title: 'AWS Cloud Resume Challenge',
    description: 'Built a full-stack personal website with Django, Docker, and AWS (EC2, ALB, Route53, S3). Containerized with Docker and deployed via GitHub Actions CI/CD pipeline.',
    tech: ['Python', 'Django', 'Docker', 'AWS', 'GitHub Actions', 'PostgreSQL'],
    link: 'https://github.com/gfsincere/resumechallenge',
  },
  {
    title: 'Me, Myself, and Eye',
    description: 'This site — a React + Vue.js personal website hosted on Google Cloud. Features a photo gallery, blog, resume, and project showcase.',
    tech: ['React', 'Vue.js', 'Vite', 'Google Cloud', 'Firebase Hosting'],
    link: 'https://github.com/gfsincere/MeMyselfandEye',
  },
]

export default function Projects() {
  return (
    <section className="projects-page">
      <h1 className="page-title">Projects</h1>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <div key={i} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-tags">
              {project.tech.map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub &rarr;
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
