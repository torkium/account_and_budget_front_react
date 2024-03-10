import React, { createContext, useContext, useState, ReactNode } from 'react'
import { apiService } from '../services/apiService'
import { useNavigate } from 'react-router-dom'

type AuthContextType = {
  isAuthenticated: boolean
  loginUser: (token: string) => void
  logoutUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(localStorage.getItem('token') !== null);
  const navigate = useNavigate();

  const loginUser = (token: string) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  apiService.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  apiService.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        logoutUser();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

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
