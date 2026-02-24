import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { db } from '../firebase'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'

const fallbackPosts = [
  {
    slug: 'building-my-site',
    title: 'Building My Personal Site with React + Vue',
    date: '2026-02-24',
    excerpt: 'How I rebuilt my personal site from a Django resume challenge into a modern React+Vue SPA hosted on Google Cloud.',
    content: `After completing the AWS Cloud Resume Challenge with Django, I decided it was time to rebuild my personal site from scratch using modern frontend frameworks.\n\nThis time around I went with React for the main application shell and routing, and Vue.js for interactive components like the photo gallery and this blog editor. The whole thing is bundled with Vite and hosted on Google Cloud.\n\nThe design preserves what I had before — Manrope font, clean black-and-white aesthetic, alternating gallery layout — but now it's a proper SPA with client-side routing.\n\nMore posts coming soon.`,
  },
]

export default function Blog() {
  const { slug } = useParams()
  const [posts, setPosts] = useState(fallbackPosts)

  useEffect(() => {
    async function load() {
      try {
        const q = query(collection(db, 'posts'), orderBy('date', 'desc'))
        const snap = await getDocs(q)
        if (snap.docs.length > 0) {
          setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        }
      } catch {
        // Firestore not configured yet — use fallback posts
      }
    }
    load()
  }, [])

  if (slug) {
    const post = posts.find(p => p.slug === slug)
    if (!post) return <section className="blog-page"><h2>Post not found</h2></section>

    return (
      <section className="blog-page">
        <Link to="/blog" className="back-link">&larr; Back to all posts</Link>
        <article className="blog-post-full">
          <h1 className="post-title">{post.title}</h1>
          <time className="post-date">{post.date}</time>
          {post.content.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>
      </section>
    )
  }

  return (
    <section className="blog-page">
      <h1 className="page-title">Blog</h1>

      <div className="blog-posts">
        {posts.map((post, i) => (
          <article key={post.slug || i} className="blog-card">
            <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
            <time className="post-date">{post.date}</time>
            <p>{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="read-more">Read more &rarr;</Link>
          </article>
        ))}
      </div>
    </section>
  )
}
