import { Link } from "react-router-dom"
import { useMenu } from "../../context/MenuContext"
import "./sidebar.css"
import BankAccountDropDown from "./Dropdown/BankAccountDropDown"

const SideBar = () => {
  const { isSidebarOpen } = useMenu()

  return (
    <div id="sidebar" className={isSidebarOpen ? "" : "hidden"}>
      <Link to="/dashboard" className="navItem">
        Dashboard
      </Link>
      <BankAccountDropDown />
      <Link to="/financial-category" className="navItem">
        Catégories financières
      </Link>
    </div>
  )
}

export default SideBar
