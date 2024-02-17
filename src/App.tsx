import React from 'react';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorNotFound from './pages/Error/404';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AlertProvider } from './context/AlertContext';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Router>
      <AlertProvider>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </AlertProvider>
    </Router>
  );
}

export default App;
