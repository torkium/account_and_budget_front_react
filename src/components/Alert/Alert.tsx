import React, { useEffect, useState } from 'react'
import './alert.css'

type AlertProps = {
  message: string
  type: 'error' | 'warning' | 'success'
  duration?: number
}

const Alert: React.FC<AlertProps> = ({ message, type, duration = 3000 }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    const timer = setTimeout(() => {
      setShow(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [message, duration])

  return (
    <div className={`alert alert-${type} ${show ? 'alert-slide-in' : 'alert-slide-out'}`}>
      {message}
    </div>
  )
}

export default Alert
