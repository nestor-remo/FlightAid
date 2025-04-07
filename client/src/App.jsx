import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import axios from 'axios';

function App() {
  const API_URL = 'http://localhost:3001'

  const [trips, setTrips] = useState([]);
  
  useEffect(() => {
    axios.get(`${API_URL}/api/trips`)
      .then((response) => {
        setTrips(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data', error)
      })
  }, [])

  return (
    <div>
      API response
      <Login api_url={API_URL} />
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            <div>{trip.title}</div>
            <div>{trip.description}</div>
            <img src={trip.img_url} alt={trip.title} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
