import React, { useState } from 'react';
import api from '../services/api';

const CreateTrip = () => {
    const [trip, setTrip] = useState({
        title: '',
        description: '',
        img_url: '',
        num_days: 0,
        start_date: '',
        total_cost: 0,
        destination_name: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTrip((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const createTrip = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/api/trips', trip);
            console.log("Trip created:", response.data);
        } catch (error) {
            console.error("Error creating trip:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Let's Create a Trip</h1>
            <form onSubmit={createTrip} className="space-y-4">
                <div>
                    <label className="block font-medium">Title:</label>
                    <input type="text" name="title" value={trip.title} onChange={handleChange} required
                        className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-medium">Description:</label>
                    <input type="text" name="description" value={trip.description} onChange={handleChange} required
                        className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-medium">Number of Days:</label>
                    <input type="number" name="num_days" value={trip.num_days} onChange={handleChange} required
                        className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-medium">Start Date:</label>
                    <input type="date" name="start_date" value={trip.start_date} onChange={handleChange} required
                        className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-medium">Total Cost:</label>
                    <input type="number" name="total_cost" value={trip.total_cost} onChange={handleChange} required
                        className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-medium">City Name:</label>
                    <input type="text" name="destination_name" value={trip.destination_name} onChange={handleChange} required
                        className="w-full border rounded p-2" />
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                        Create Trip
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTrip;
