import React, { createContext, useContext, useState, ReactNode } from "react"
import Alert from "../../components/generic/Alert/Alert"

type AlertContextType = {
  showAlert: (message: string, type: "success" | "error" | "warning") => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider")
  }
  return context
}

type AlertProviderProps = {
  children: ReactNode
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null)

  const showAlert = (message: string, type: "success" | "error" | "warning") => {
    setAlert({ message, type })
    setTimeout(() => setAlert(null), 5000)
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <Alert message={alert.message} type={alert.type} />}
    </AlertContext.Provider>
  )
}
