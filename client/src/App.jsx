import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import { useState, useEffect } from 'react'
import api from './services/api'


const App = () => {

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

  const routes = useRoutes([
    { 
      path: '/',
      element: user && user.id ? 
        <Dashboard /> : <Login api_url={import.meta.env.VITE_API_URL} />
    },
    { 
      path: '/landing', 
      element: <Landing /> 
    },
  ])

  return (
    <div>
      {routes}
    </div>
  )
}

export default App