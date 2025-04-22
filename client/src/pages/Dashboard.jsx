import React from 'react'
import { useState, useEffect } from 'react'
import api from '../services/api'

const Dashboard = () => {
    const [trips, setTrips] = useState([])

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await api.get('/api/trips')
                setTrips(response.data)
                console.log("Trips data:", response.data)
            } catch (error) {
                console.error("Error fetching trips:", error)
            }
        }
        fetchTrips()
    }, [])

    return (
        <div>
            <h1>Dashboard</h1> 
            <h2>Your Trips</h2>
            <ul>
                {trips.map((trip) => (
                    <li key={trip.id}>
                        <h3>{trip.title}</h3>
                        <p>Description: {trip.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard