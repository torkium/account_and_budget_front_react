import { ReactNode } from "react"
import "./main-layout.css"
import Navbar from "../Navbar/Navbar"
import SideBar from "../SideBar/Sidebar"

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <SideBar />
        <div className="page-container">{children}</div>
      </div>
    </>
  )
}
