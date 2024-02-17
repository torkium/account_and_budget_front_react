import React, { ReactNode } from "react"
import { MenuProvider } from "./MenuContext"
import { AlertProvider } from "./AlertContext"
import { AuthProvider } from "./AuthContext"

type AppProviderProps = {
  children: ReactNode
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AlertProvider>
      <AuthProvider>
        <MenuProvider>{children}</MenuProvider>
      </AuthProvider>
    </AlertProvider>
  );
};

export default AppProvider
