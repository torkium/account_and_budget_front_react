import { useMenu } from "../../context/MenuContext"
import "./sidebar.css"
import BankAccountDropDown from "./Dropdown/BankAccountDropDown"

const SideBar = () => {
  const { isSidebarOpen } = useMenu()

  return (
    <div id="sidebar" className={isSidebarOpen ? "" : "hidden"}>
      <a href="/dashboard" className="navItem">
        Dashboard
      </a>
      <BankAccountDropDown />
    </div>
  )
}

export default SideBar
