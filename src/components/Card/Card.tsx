import { ReactNode } from "react"
import "./card.css"

interface CardProps {
  children: ReactNode
}

export default function Card({ children }: CardProps) {
  return (
    <div className="card">
        {children}
    </div>
  )
}
