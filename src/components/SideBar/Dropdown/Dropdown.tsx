import React, { useState } from "react"
import Modal from "../../Modal/Modal"

interface DropdownProps {
  label: string
  items: { id: number, label: string, href: string }[]
  className?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleDropdown = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setIsOpen(!isOpen)
  }

  const openModal = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setIsModalOpen(true)
  }

  return (
    <>
      <div className={`dropdown ${className}`}>
        <a href="" className="dropbtn navItem" onClick={toggleDropdown}>
          {label}
        </a>
        <div className={`dropdown-content ${isOpen ? "" : "hidden"}`}>
          {items.map((item) => (
            <a href={item.href} key={item.id}>
              {item.label}
            </a>
          ))}
          <a href="" key="0" onClick={openModal}>
            +
          </a>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="large"
      >
        <p>Contenu de la modal</p>
        <button onClick={() => setIsModalOpen(false)}>Fermer</button>
      </Modal>
    </>
  )
}

export default Dropdown
