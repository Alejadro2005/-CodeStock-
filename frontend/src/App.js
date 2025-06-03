import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Productos from './components/Productos';
import Ventas from './components/Ventas';
import Usuarios from './components/Usuarios';
import Historial from './components/Historial';

const theme = createTheme({
  palette: {
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Dashboard userRole={userRole} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/productos"
            element={
              isAuthenticated ? (
                <Productos />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/ventas"
            element={
              isAuthenticated ? (
                <Ventas />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/usuarios"
            element={
              isAuthenticated && userRole === 'admin' ? (
                <Usuarios />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/historial"
            element={
              isAuthenticated ? (
                <Historial />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 