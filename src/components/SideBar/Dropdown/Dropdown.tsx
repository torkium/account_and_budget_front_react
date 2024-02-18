import React, { useState } from 'react'

interface DropdownProps {
  label: string
  items: { id: number, label: string, href: string }[]
  className?: string
}

const Dropdown: React.FC<DropdownProps> = ({ label, items, className='' }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <div className={`dropdown ${className}`}>
      <a href="" className="dropbtn navItem" onClick={toggleDropdown}>
        {label}
      </a>
      <div className={`dropdown-content ${isOpen ? '' : 'hidden'}`}>
        {items.map((item) => (
          <a href={item.href} key={item.id}>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
