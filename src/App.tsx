import React from 'react';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorNotFound from './pages/Error/404';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
