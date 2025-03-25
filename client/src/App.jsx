import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [trips, setTrips] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3001/api/trips')
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
