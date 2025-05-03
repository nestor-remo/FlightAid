import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const UpdateTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    description: '',
    num_days: 0,
    start_date: '',
    end_date: '',
    total_cost: 0,
  });

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/api/trips/${id}`);
        const t = res.data;
        setTrip({
          description: t.description,
          num_days: t.num_days,
          start_date: t.start_date.split('T')[0],
          end_date: t.end_date.split('T')[0],
          total_cost: t.total_cost,
        });
      } catch (err) {
        console.error('Error fetching trip:', err);
      }
    };

    fetchTrip();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTrip((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateTrip = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/api/trips/${id}`, trip);
      navigate(`/trip/${id}`);
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Trip</h1>
      <form onSubmit={updateTrip} className="space-y-4">
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
          <label className="block font-medium">End Date:</label>
          <input type="date" name="end_date" value={trip.end_date} onChange={handleChange} required
            className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium">Total Cost:</label>
          <input type="number" name="total_cost" value={trip.total_cost} onChange={handleChange} required
            className="w-full border rounded p-2" />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTrip;
