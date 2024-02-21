import React, { useCallback, useState } from "react"
import BankAccountPushModal from "./Modals/BankAccountPushModal"
import { BankAccountInterface } from "../../../interfaces/Bank"

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
  const [isBankAccountPushModalOpen, setIsBankAccountPushModalOpen] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState<BankAccountInterface | null>(null);

  const toggleDropdown = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setIsOpen(!isOpen)
  }

  const openModal = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setIsBankAccountPushModalOpen(true)
  }

  const closeBankAccountPushModal = useCallback(() => {
    setIsBankAccountPushModalOpen(false);
    setSelectedBankAccount(null);
  }, []);

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
      <BankAccountPushModal
        isOpen={isBankAccountPushModalOpen}
        onClose={closeBankAccountPushModal}
        onSubmit={() => {}}
        bankAccount={selectedBankAccount}
      />
    </>
  )
}

export default Dropdown
