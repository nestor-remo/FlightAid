import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TripCard from '../components/TripCard';

const Dashboard = ({ api_url }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get('/api/trips');
        setTrips(response.data);
      } catch (err) {
        console.error('Error fetching trips:', err);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Trips</h1>

      {trips.length === 0 ? (
        <p className="text-center text-gray-500">You have no trips yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              title={trip.title}
              destination={trip.destination_name}
              imgUrl={trip.img_url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
