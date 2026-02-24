import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Resume from './pages/Resume'
import GalleryPage from './pages/GalleryPage'
import Blog from './pages/Blog'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Admin from './pages/Admin'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
