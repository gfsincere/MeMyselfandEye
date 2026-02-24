import React, { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase'

const ALLOWED_EMAIL = 'gregorie.thomas@gmail.com'
const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const firebaseReady = isFirebaseConfigured()

  useEffect(() => {
    if (!firebaseReady || !auth) {
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
  }, [firebaseReady])

  async function login() {
    if (!auth) throw new Error('Firebase is not configured. Add .env with Firebase credentials.')
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
    <AuthContext.Provider value={{ user, loading, login, logout, firebaseReady }}>
      {children}
    </AuthContext.Provider>
  )
}
