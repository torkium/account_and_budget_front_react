import { useMenu } from "../../context/MenuContext";
import { useAuth } from "../../context/generic/AuthContext";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { FormProvider, useForm } from "react-hook-form";
import ProfileSelect from "../Profile/Forms/ProfileSelect";
import { useEffect } from "react";

const Navbar = () => {
  const { toggleNavbarMenu, toggleSidebar, isNavbarMenuOpen } = useMenu();
  const { isAuthenticated, logoutUser } = useAuth();
  const navigate = useNavigate();
  const methods = useForm();
  const app = useApp();
  const wachedProfileSelectFilter = methods.watch("profileSelect");
  const wachedProfileSelectMobileFilter = methods.watch("profileSelectMobile");

  useEffect(() => {
    if (wachedProfileSelectFilter) {
      app.selectProfile(wachedProfileSelectFilter);
    }
  }, [wachedProfileSelectFilter]);
  useEffect(() => {
    if (wachedProfileSelectMobileFilter) {
      app.selectProfile(wachedProfileSelectMobileFilter);
    }
  }, [wachedProfileSelectMobileFilter]);

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    logoutUser();
    navigate("/login");
  };

  return (
    <>
      <nav className="">
        <div className="container">
          <button id="sideMenuButton" className="" onClick={toggleSidebar}>
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-16 6h7"></path>
            </svg>
          </button>
          <a href="#" className="navItem home">
            Gérez vos comptes
          </a>
          <button id="menuButton" onClick={toggleNavbarMenu}>
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
            {!isAuthenticated && (
              <a href="#" className="navItem">
                Inscription
              </a>
            )}
            {isAuthenticated && (
              <>
                <div className="navItem">
                  <FormProvider {...methods}>
                    <ProfileSelect
                      name="profileSelect"
                      label=""
                      validationRules={{ required: "Ce champ est requis" }}
                    />
                  </FormProvider>
                </div>
                <a href="/logout" className="navItem" onClick={handleLogout}>
                  Déconnexion
                </a>
              </>
            )}
          </div>
        </div>
        <div id="mobileNavItems" className={isNavbarMenuOpen ? "" : "hidden"}>
            {!isAuthenticated && (
              <a href="#" className="navItem">
                Inscription
              </a>
            )}
            {isAuthenticated && (
              <>
                <div className="navItem">
                  <FormProvider {...methods}>
                    <ProfileSelect
                      name="profileSelectMobile"
                      label=""
                      validationRules={{ required: "Ce champ est requis" }}
                    />
                  </FormProvider>
                </div>
                <a href="/logout" className="navItem" onClick={handleLogout}>
                  Déconnexion
                </a>
              </>
            )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
