import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import BankAccount from "./pages/BankAccount/BankAccount";
import BankAccountSettings from "./pages/BankAccountSettings/BankAccountSettings";
import ErrorNotFound from "./pages/Error/404";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/generic/ProtectedRoute";
import Logout from "./components/generic/Logout";
import BankAccountImport from "./pages/BankAccountImport/BankAccountImport";
import FinancialCategory from "./pages/FinancialCategory/FinancialCategory";
import MainLayout from "./components/Layout/MainLayout";
import LoginLayout from "./components/Layout/LoginLayout";
import { useAuth } from "./context/generic/AuthContext";
import { useApp } from "./context/AppContext";

function RoutingApp() {
  const { isAuthenticated } = useAuth();
  const app = useApp();
  return (isAuthenticated && app.profileSelection) ? (
    <>
      <MainLayout>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/financial-category" element={<FinancialCategory />} />
            <Route
              path="/bank-account/:bankAccountId/import"
              element={<BankAccountImport />}
            />
            <Route
              path="/bank-account/:accountId/settings"
              element={<BankAccountSettings />}
            />
            <Route path="/bank-account/:accountId" element={<BankAccount />} />
          </Route>
        </Routes>
      </MainLayout>
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </>
  ) : (
    <LoginLayout>
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </LoginLayout>
  );
}

export default RoutingApp;
