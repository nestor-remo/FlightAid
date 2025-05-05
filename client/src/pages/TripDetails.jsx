import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [activities, setActivities] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/api/trips/${id}`);
        setTrip(res.data);
      } catch (err) {
        console.error('Failed to fetch trip:', err);
      }
    };

    const fetchActivities = async () => {
      try {
        const res = await api.get(`/api/activities?trip_id=${id}`);
        setActivities(res.data);
      } catch (err) {
        console.error('Failed to fetch activities:', err);
      }
    };

    fetchTrip();
    fetchActivities();
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

  const getAIRecommendations = async () => {
    if (!trip) return;
    setLoadingRecs(true);
    try {
      const res = await api.get(`/api/ai/recommendations?city=${encodeURIComponent(trip.destination_name)}`);
      setRecommendations(res.data);
    } catch (err) {
      console.error("Error getting AI recommendations:", err);
    } finally {
      setLoadingRecs(false);
    }
  };

  if (!trip) return <p className="text-center mt-10">Loading trip...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT COLUMN (Trip + AI Recommendations) */}
        <div className="md:col-span-2 space-y-6">
          {/* Trip Card */}
          <div className="bg-white shadow rounded p-6">
            <img src={trip.img_url} alt={trip.title} className="w-full h-64 object-cover rounded mb-4" />
            <h1 className="text-2xl font-bold mb-2">{trip.title}</h1>
            <p className="text-gray-600 mb-1">Destination: {trip.destination_name}</p>
            <p className="text-gray-600 mb-1">Start Date: {trip.start_date.split('T')[0]}</p>
            <p className="text-gray-600 mb-1">Number of Days: {trip.num_days}</p>
            <p className="text-gray-600 mb-1">Total Cost: {trip.total_cost}</p>
            <p className="text-gray-600 mb-1">End Date: {trip.end_date.split('T')[0]}</p>
            <p className="mb-4">{trip.description}</p>
            <div className="space-x-2">
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete Trip</button>
              <button className="
                bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                onClick={() => navigate(`/trip/${trip.id}/edit`)}
              > Update Trip</button>
              <button onClick={() => navigate(`/trip/${trip.id}/add-activities`)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Activities</button>
            </div>
          </div>

          {/* AI Recommendations Section */}
          <div className="bg-gray-100 rounded p-4">
            <button
              onClick={getAIRecommendations}
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 mb-4"
            >
              {loadingRecs ? 'Loading...' : 'Get AI Recommendations'}
            </button>

            {recommendations.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Popular Spots Recommended by AI</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendations.map((place, idx) => (
                    <div key={idx} className="bg-white p-4 rounded shadow">
                      <h4 className="font-semibold text-lg">{place.name}</h4>
                      <p className="text-gray-600">{place.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN (Activities) */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Activities</h2>
          {activities.length === 0 ? (
            <p className="text-gray-500">No activities yet.</p>
          ) : (
            activities.map((act) => (
              <div key={act.id} className="bg-white shadow rounded p-4">
                <h3 className="font-semibold">{act.name}</h3>
                <p className="text-sm text-gray-600">{act.type} – {act.location}</p>
                {act.image_url && (
                  <img src={act.image_url} alt={act.name} className="w-full h-32 object-cover rounded mt-2" />
                )}
                {act.notes && <p className="mt-2 text-sm text-gray-500">{act.notes}</p>}
                <button className="bg-red-500 pt-2 text-white px-3 py-1 rounded " onClick={async () => {
                  if (window.confirm("Are you sure you want to delete this activity?")) {
                    try {
                      await api.delete(`/api/activities/${act.id}`);
                      setActivities(activities.filter(a => a.id !== act.id));
                    } catch (err) {
                      console.error("Error deleting activity:", err);
                    }
                  }
                }
                }>Delete Activity</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;