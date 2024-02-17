import React, { useEffect, useRef } from "react";
import "./navbar.css";

const Navbar = () => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toggleMenu = () => {
      if (mobileNavItemsRef.current) {
        mobileNavItemsRef.current.classList.toggle("hidden");
      }
    };

    const menuButton = menuButtonRef.current;

    menuButton?.addEventListener("click", toggleMenu);

    return () => {
      menuButton?.removeEventListener("click", toggleMenu);
    };
  }, []);

  return (
    <>
      <nav className="">
        <div className="container">
          <a href="#" className="navItem home">
            Gérez vos comptes
          </a>
          <button ref={menuButtonRef} id="menuButton" className="">
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <div className="navItems">
            <a href="#" className="navItem">
              Inscription
            </a>
          </div>
        </div>
        <div ref={mobileNavItemsRef} id="mobileNavItems" className="hidden">
          <a href="#" className="navItem">
            Inscription
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
