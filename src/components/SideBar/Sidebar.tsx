import { useMenu } from "../../context/MenuContext"
import "./sidebar.css"

const SideBar = () => {
  const { isSidebarOpen } = useMenu()

  return (
    <div id="sidebar" className={isSidebarOpen ? "" : "hidden"}>
      <a href="#dashboard" className="navItem">
        Dashboard
      </a>
      <div className="dropdown">
        <a href="#my-accounts" className="dropbtn navItem">
          Mes comptes
        </a>
        <div className="dropdown-content hidden">
          <a href="#">CCP LBP 1</a>
          <a href="#">LA LBP 1</a>
          <a href="#">CCP BNP 1</a>
          <a href="#">+</a>
        </div>
      </div>
    </div>
  );
};

export default SideBar
