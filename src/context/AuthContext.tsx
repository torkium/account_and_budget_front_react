import React, { createContext, useContext, useState, ReactNode } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  loginUser: (token: string) => void
  logoutUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const loginUser = (token: string) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth should be used in AuthProvider')
  }
  return context
}
