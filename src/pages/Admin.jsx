import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db, storage } from '../firebase'
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  query, orderBy, getDocs, serverTimestamp
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { applyVueInReact } from 'veaury'
import BlogEditorVue from '../components/vue/BlogEditor.vue'

const BlogEditor = applyVueInReact(BlogEditorVue)

export default function Admin() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('blog')

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <section className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Sign Out</button>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab${tab === 'blog' ? ' active' : ''}`}
          onClick={() => setTab('blog')}
        >
          Blog
        </button>
        <button
          className={`admin-tab${tab === 'gallery' ? ' active' : ''}`}
          onClick={() => setTab('gallery')}
        >
          Gallery
        </button>
      </div>

      {tab === 'blog' && <BlogAdmin />}
      {tab === 'gallery' && <GalleryAdmin />}
    </section>
  )
}

function BlogAdmin() {
  const [posts, setPosts] = useState([])
  const [editing, setEditing] = useState(null)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [showEditor, setShowEditor] = useState(false)

  useEffect(() => { loadPosts() }, [])

  async function loadPosts() {
    try {
      const q = query(collection(db, 'posts'), orderBy('date', 'desc'))
      const snap = await getDocs(q)
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error('Failed to load posts:', err)
    }
  }

  function handleEdit(post) {
    setEditing(post)
    setTitle(post.title)
    setDate(post.date)
    setShowEditor(true)
  }

  function handleNew() {
    setEditing(null)
    setTitle('')
    setDate(new Date().toISOString().split('T')[0])
    setShowEditor(true)
  }

  async function handleSave(editorData) {
    const slug = (editorData.title || title)
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const postData = {
      title: editorData.title || title,
      content: editorData.content,
      slug,
      date: editorData.date || date,
      excerpt: editorData.content.substring(0, 200) + '...',
      updatedAt: serverTimestamp(),
    }

    try {
      if (editing) {
        await updateDoc(doc(db, 'posts', editing.id), postData)
      } else {
        postData.createdAt = serverTimestamp()
        await addDoc(collection(db, 'posts'), postData)
      }
      setShowEditor(false)
      setEditing(null)
      await loadPosts()
    } catch (err) {
      console.error('Failed to save post:', err)
      alert('Failed to save. Check Firebase config.')
    }
  }

  async function handleDelete(post) {
    if (!confirm(`Delete "${post.title}"?`)) return
    try {
      await deleteDoc(doc(db, 'posts', post.id))
      await loadPosts()
    } catch (err) {
      console.error('Failed to delete post:', err)
    }
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Blog Posts</h2>
        <button onClick={handleNew} className="admin-action-btn">New Post</button>
      </div>

      {showEditor && (
        <div className="admin-editor-area">
          <div className="admin-editor-fields">
            <div className="admin-field">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Post title"
              />
            </div>
            <div className="admin-field">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
          </div>
          <BlogEditor
            initialTitle={title}
            initialContent={editing?.content || ''}
            onSave={(data) => handleSave({ ...data, title, date })}
          />
          <button
            className="admin-cancel-btn"
            onClick={() => { setShowEditor(false); setEditing(null) }}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="admin-list">
        {posts.length === 0 && <p className="admin-empty">No posts yet. Click "New Post" to write one.</p>}
        {posts.map(post => (
          <div key={post.id} className="admin-list-item">
            <div className="admin-list-info">
              <strong>{post.title}</strong>
              <span className="admin-list-date">{post.date}</span>
            </div>
            <div className="admin-list-actions">
              <button onClick={() => handleEdit(post)} className="admin-edit-btn">Edit</button>
              <button onClick={() => handleDelete(post)} className="admin-delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GalleryAdmin() {
  const [photos, setPhotos] = useState([])
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => { loadPhotos() }, [])

  async function loadPhotos() {
    try {
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      setPhotos(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error('Failed to load gallery:', err)
    }
  }

  async function handleUpload(e) {
    e.preventDefault()
    if (!file || !caption.trim()) return

    setUploading(true)
    try {
      const filename = `gallery/${Date.now()}-${file.name}`
      const storageRef = ref(storage, filename)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)

      await addDoc(collection(db, 'gallery'), {
        src: url,
        caption: caption.trim(),
        filename,
        createdAt: serverTimestamp(),
      })

      setCaption('')
      setFile(null)
      if (fileRef.current) fileRef.current.value = ''
      await loadPhotos()
    } catch (err) {
      console.error('Failed to upload:', err)
      alert('Failed to upload. Check Firebase config.')
    }
    setUploading(false)
  }

  async function handleDeletePhoto(photo) {
    if (!confirm(`Delete photo "${photo.caption}"?`)) return
    try {
      await deleteDoc(doc(db, 'gallery', photo.id))
      await loadPhotos()
    } catch (err) {
      console.error('Failed to delete photo:', err)
    }
  }

  return (
    <div className="admin-section">
      <h2>Gallery Upload</h2>

      <form onSubmit={handleUpload} className="gallery-upload-form">
        <div className="admin-field">
          <label>Photo</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
          />
        </div>
        <div className="admin-field">
          <label>Caption</label>
          <input
            type="text"
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="e.g. Cape Palliser, New Zealand 2022"
          />
        </div>
        <button
          type="submit"
          className="admin-action-btn"
          disabled={uploading || !file || !caption.trim()}
        >
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </form>

      <div className="admin-gallery-list">
        {photos.length === 0 && <p className="admin-empty">No uploaded photos yet.</p>}
        {photos.map(photo => (
          <div key={photo.id} className="admin-gallery-item">
            <img src={photo.src} alt={photo.caption} />
            <div className="admin-gallery-info">
              <p>{photo.caption}</p>
              <button onClick={() => handleDeletePhoto(photo)} className="admin-delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
