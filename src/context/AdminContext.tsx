'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AdminContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

// Simple password - in production, use proper authentication
const ADMIN_PASSWORD = 'bakery123'

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if admin is logged in (from session storage)
    const adminAuth = sessionStorage.getItem('admin-auth')
    if (adminAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin-auth', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin-auth')
  }

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
