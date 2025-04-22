import React, { useState } from 'react'
import api from '../services/api'

const CreateTrip = () => {
    
    const [trip, setTrip] = useState({
        title: '',
        description: '',
        img_url: '',
        num_days: 0,
        start_date: '',
        end_date: '',
        total_cost: 0
    })


    const handleChange = (event) => {
        const { name, value } = event.target
        
        setTrip((prev) =>{
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const createTrip = async (event) => {
        event.preventDefault()
        try {
            const response = await api.post('/api/trips', trip)
            console.log("Trip created:", response.data)
        } catch (error) {
            console.error("Error creating trip:", error)
        }   
    }

    return (
        <div>
            <h1> Let's create a Trip: </h1>
            <form>
                <label>Title:</label>
                <input type="text" name="title" value={trip.title} onChange={handleChange} required />
                <br />

                <label>Description:</label>
                <input type="text" name="description" value={trip.description} onChange={handleChange} required />
                <br />
                
                <label>Image URL:</label>
                <input type="text" name="img_url" value={trip.img_url} onChange={handleChange} required />
                <br />

                <label>Number of Days:</label>
                <input type="number" name="num_days" value={trip.num_days} onChange={handleChange} required />
                <br />

                <label>Start Date:</label>
                <input type="date" name="start_date" value={trip.start_date} onChange={handleChange} required />
                <br />
                
                <label>End Date:</label>
                <input type="date" name="end_date" value={trip.end_date} onChange={handleChange} required />
                <br />

                <label>Total Cost:</label>
                <input type="number" name="total_cost" value={trip.total_cost} onChange={handleChange} required />
                <br /> 

                <input type="submit" value="Create Trip" onClick={createTrip} />
            </form>
        </div>

    )
}

export default CreateTrip