import Login from "./pages/Login/Login"
import Dashboard from "./pages/Dashboard/Dashboard"
import BankAccount from "./pages/BankAccount/BankAccount"
import BankAccountSettings from "./pages/BankAccountSettings/BankAccountSettings"
import ErrorNotFound from "./pages/Error/404"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppProvider from "./context/AppContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Logout from "./components/Logout"


function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bank-account/:accountId/settings" element={<BankAccountSettings />} />
            <Route path="/bank-account/:accountId" element={<BankAccount />} />
          </Route>

          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </AppProvider>
    </Router>
  )
}

export default App
