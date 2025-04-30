import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/api/trips/${id}`);
        setTrip(res.data);
      } catch (err) {
        console.error('Failed to fetch trip:', err);
      }
    };

    fetchTrip();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    try {
      await api.delete(`/api/trips/${id}`);
      navigate('/dashboard');
    } catch (err) {
      console.error("Error deleting trip:", err);
    }
  };

  if (!trip) return <p className="text-center mt-10">Loading trip...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <img src={trip.img_url} alt={trip.title} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-2xl font-bold">{trip.title}</h1>
      <p className="text-gray-600 mb-2">Destination: {trip.destination_name}</p>
      <p className='text-gray-600 mb-2'>Number of Days: {trip.num_days}</p>
      <p className='text-gray-600 mb-2'>Start Date: {trip.start_date}</p>
      <p className='text-gray-600 mb-2'>Budget: {trip.total_cost}</p>
      <p className='text-gray-600 mb-2'>End Date: {trip.end_date}</p>
      <p className="mb-4">{trip.description}</p>
      <div className="space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Trip
        </button>

        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Update Trip
        </button>

        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Activities
        </button>
      </div>
    </div>
  );
};

export default TripDetails;
