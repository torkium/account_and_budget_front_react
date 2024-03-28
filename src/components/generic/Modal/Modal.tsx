import React, { ReactNode, useEffect, useRef } from "react"
import "./modal.css"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title: string
  size?: "small" | "large"
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = "small",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    };
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${size}`} ref={modalRef}>
        <button className="modal-close-button" onClick={onClose}>
          ✕
        </button>
        <div className={`modal-title`}>{title}</div>
        {children}
      </div>
    </div>
  )
}

export default Modal
