import React, { useState, useEffect } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import api from './services/api';
import Layout from './layouts/Layout';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreateTrip from './pages/CreateTrip';

const App = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get('/auth/login/success');
        setUser(response.data.user);
        console.log("User data:", response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, []);

  const logout = async () => {
    try {
      await api.get('/auth/logout');
      setUser(null);
      console.log("User logged out");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isAuthenticated = user && user.id;

  const routes = useRoutes([
    {
      path: '/',
      element: <Layout isAuthenticated={isAuthenticated} logout={logout} />,
      children: [
        { path: '/', element: <Landing /> },
        { path: '/dashboard', element: isAuthenticated ? <Dashboard api_url={API_URL} /> : <Navigate to="/login" replace /> },
        { path: '/new', element: isAuthenticated ? <CreateTrip api_url={API_URL} /> : <Navigate to="/login" replace /> },
        { path: '/login', element: <Login api_url={API_URL} /> }
      ]
    }
  ]);

  return (
    <>
      {routes}
    </>
  );
};

export default App;
