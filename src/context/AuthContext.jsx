import React, { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth, isConfigured } from '../firebase'

const ALLOWED_EMAIL = 'gregorie.thomas@gmail.com'
const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(isConfigured)

  useEffect(() => {
    if (!isConfigured || !auth) {
      setLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && u.email !== ALLOWED_EMAIL) {
        signOut(auth)
        setUser(null)
      } else {
        setUser(u)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  async function login() {
    if (!isConfigured || !auth) {
      throw new Error('Firebase not configured. Add credentials to .env file.')
    }
    const result = await signInWithPopup(auth, googleProvider)
    if (result.user.email !== ALLOWED_EMAIL) {
      await signOut(auth)
      throw new Error('Unauthorized account')
    }
    return result
  }

  async function logout() {
    if (!auth) return
    return signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}
