import { ReactNode } from "react"
import "./login-layout.css"
import Navbar from "../Navbar/Navbar"

interface LoginLayoutProps {
  children: ReactNode
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
        <Navbar />
        <div className="login-main-container">
          {children}
        </div>
    </>
  )
}
