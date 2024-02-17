import React, { ReactNode } from "react";
import './login-layout.css'
import Navbar from "../Navbar/Navbar";

interface LoginLayoutProps {
  children: ReactNode;
}

// Pass the child props
export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
        <Navbar />
        <div className="main-container">
          {children}
        </div>
    </>
  );
}
