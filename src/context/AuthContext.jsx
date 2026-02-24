import React, { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth, firebaseEnabled } from '../firebase'

const ALLOWED_EMAIL = 'gregorie.thomas@gmail.com'
const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!firebaseEnabled || !auth) {
      setLoading(false)
      return undefined
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
    if (!firebaseEnabled || !auth) {
      throw new Error('Firebase not configured')
    }

    const result = await signInWithPopup(auth, googleProvider)
    if (result.user.email !== ALLOWED_EMAIL) {
      await signOut(auth)
      throw new Error('Unauthorized account')
    }
    return result
  }

  async function logout() {
    if (!auth) return Promise.resolve()
    return signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
