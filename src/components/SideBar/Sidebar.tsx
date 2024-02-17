import React, { useEffect, useRef } from "react"
import "./navbar.css"

const Navbar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const toggleSidebar = () => {
      if (sidebarRef.current) {
        sidebarRef.current.classList.toggle("hidden")
      }
    };

    const sideMenuButton = document.getElementById("sideMenuButton")

    sideMenuButton?.addEventListener("click", toggleSidebar)

    return () => {
      sideMenuButton?.removeEventListener("click", toggleSidebar)
    };
  }, []);


  return (
    <>
      <div id="sidebar" className="hidden">
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
    </>
  );
};

export default Navbar;
