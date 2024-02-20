import { useEffect, useState } from "react"
import { useMenu } from "../../context/MenuContext"
import { BankAccountInterface } from "../../interfaces/Bank"
import {apiBankAccountService} from "../../services/apiBankAccountService"
import { useAlert } from "../../context/AlertContext"
import Dropdown from './Dropdown/Dropdown'
import "./sidebar.css"

const SideBar = () => {
  const { isSidebarOpen } = useMenu()
  const { showAlert } = useAlert()
  const [bankAccounts, setBankAccounts] = useState<BankAccountInterface[]>([])

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const accounts = await apiBankAccountService.get()
        setBankAccounts(accounts)
      } catch (error) {
        showAlert("Impossible de récupérer les comptes", "error")
      }
    }

    fetchBankAccounts()
  }, [])

  const accountItems = bankAccounts.map(account => ({
    id: account.id,
    label: account.label,
    href: `/bank-account/${account.id}`,
  }))

  return (
    <div id="sidebar" className={isSidebarOpen ? "" : "hidden"}>
      <a href="/dashboard" className="navItem">
        Dashboard
      </a>
      <Dropdown label="Mes comptes" items={accountItems} />
    </div>
  )
}

export default SideBar
