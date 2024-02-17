// Dans MenuContext.tsx (anciennement SidebarContext.tsx)

import React, { createContext, useContext, useState, ReactNode } from 'react'

type MenuContextType = {
  isSidebarOpen: boolean
  isNavbarMenuOpen: boolean
  toggleSidebar: () => void
  toggleNavbarMenu: () => void
  closeMenus: () => void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNavbarMenuOpen, setIsNavbarMenuOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    if (isNavbarMenuOpen) setIsNavbarMenuOpen(false)
  }

  const toggleNavbarMenu = () => {
    setIsNavbarMenuOpen(!isNavbarMenuOpen)
    if (isSidebarOpen) setIsSidebarOpen(false)
  }

  const closeMenus = () => {
    setIsSidebarOpen(false)
    setIsNavbarMenuOpen(false)
  }

  return (
    <MenuContext.Provider value={{ isSidebarOpen, isNavbarMenuOpen, toggleSidebar, toggleNavbarMenu, closeMenus }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (context === undefined) {
    throw new Error('useMenu should be used in MenuProvider')
  }
  return context
}
