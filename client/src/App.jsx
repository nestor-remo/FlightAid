import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import CreateTrip from './pages/CreateTrip'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import api from './services/api'


const App = () => {
  const API_URL = 'http://localhost:3001'
  const [user, setUser] = useState(null)

  useEffect(() =>{
    const getUser = async () => {
      try {
        const response = await api.get('/auth/login/success')
        setUser(response.data.user)
        console.log("User data:", response.data.user)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }
    getUser()
  }, [])

    
  const logout = async () => {
    try {
      await api.get('/auth/logout')
      setUser(null);
      console.log("User logged out")
      window.location.href = "/"
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const isAuthenticated = user && user.id

  const routes = useRoutes([
    { 
      path: '/',
      element: <Landing /> 
    },
    {
      path: '/new',
      element: isAuthenticated ?
        <CreateTrip api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: '/dashboard',
      element: isAuthenticated ? 
        <Dashboard api_url={API_URL}/> : <Login api_url={API_URL} />
    }
  ])

  return (  
    <div>
      {
        user && user.id ? (
          <div>
            <h1> FlightAid </h1>
            <Link to ="/dashboard">Dashboard</Link>
            <Link to ="/new">Create Trip</Link>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <></>
        )
      }
      {routes}
    </div>
  )
}

export default App