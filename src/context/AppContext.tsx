import React, { ReactNode, useState, createContext, useContext, useEffect } from "react"
import { MenuProvider } from "./MenuContext"
import { AlertProvider } from "./generic/AlertContext"
import { AuthProvider } from "./generic/AuthContext"
import { apiService, setGlobalParamHandler } from '../services/generic/apiService'

type AppProviderProps = {
  children: ReactNode
}
type AppContextType = {
  profileSelection?: number
  selectProfile: (id: number) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [profileSelection, setProfileSelection] = useState<number|undefined>(undefined);

  const selectProfile = (id: number) => {
    setProfileSelection(id);
    console.log("test");
  }
  useEffect(() => {
    setGlobalParamHandler(() => ({
      profile_id: profileSelection
    }));
  }, [profileSelection]);

  return (
    <AppContext.Provider value={{ profileSelection, selectProfile }}>
      <AlertProvider>
        <AuthProvider>
          <MenuProvider>{children}</MenuProvider>
        </AuthProvider>
      </AlertProvider>
    </AppContext.Provider>
  );
};

export default AppProvider

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp should be used within an AppProvider')
  }
  return context
}
