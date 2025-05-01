import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddActivitiesPage = ({ api_url }) => {
  const { id: trip_id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [keyword, setKeyword] = useState('things to do');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`${api_url}/api/trips/${trip_id}`, { withCredentials: true });
        setTrip(res.data);
      } catch (err) {
        console.error("Error fetching trip:", err);
      }
    };
  
    fetchTrip();
  }, [trip_id]);  

  const handleSearch = async () => {
    if (!trip) return;
  
    try {
      const res = await axios.get(`${api_url}/api/places/search`, {
        params: { location: trip.destination_name, keyword },
        withCredentials: true
      });
      setResults(res.data);
    } catch (err) {
      console.error('Error searching places:', err);
    }
  };
  

  const getPlaceImageUrl = (photoReference) => {
    if (!photoReference) return '';
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
  };

  const toggleSelection = (place) => {
    setSelected((prev) => {
      const exists = prev.find((p) => p.place_id === place.place_id);
      return exists
        ? prev.filter((p) => p.place_id !== place.place_id)
        : [...prev, place];
    });
  };

  const handleAddSelected = async () => {
    try {
      const payload = selected.map((place) => ({
        trip_id,
        name: place.name,
        type: place.types?.[0] || 'unknown',
        location: place.vicinity || 'unknown',
        notes: `Rating: ${place.rating || 'N/A'}`,
        image_url: place.photos?.[0]
          ? getPlaceImageUrl(place.photos[0].photo_reference)
          : ''
      }));

      await axios.post(`${api_url}/api/activities/bulk`, { activities: payload }, { withCredentials: true });
      navigate(`/trip/${trip_id}`);
    } catch (err) {
      console.error('Error adding activities:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Search for Activities</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Keyword (e.g. museum)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 w-1/2 rounded"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((place, idx) => {
          const isSelected = selected.find((p) => p.place_id === place.place_id);
          return (
            <div key={idx} className="border rounded p-4 shadow">
              <h3 className="font-semibold text-lg">{place.name}</h3>
              <p>{place.vicinity || 'Unknown location'}</p>
              <p>Rating: {place.rating || 'N/A'}</p>
              {place.photos?.[0] ? (
                <img
                  src={getPlaceImageUrl(place.photos[0].photo_reference)}
                  alt={place.name}
                  className="w-full h-40 object-cover mt-2 rounded"
                />
              ) : <p>No image</p>}

              <button
                onClick={() => toggleSelection(place)}
                className={`mt-3 w-full py-1 rounded ${isSelected ? 'bg-red-500' : 'bg-green-500'} text-white`}
              >
                {isSelected ? 'Remove' : 'Add'}
              </button>
            </div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleAddSelected}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Add {selected.length} Activities to Trip
          </button>
        </div>
      )}
    </div>
  );
};

export default AddActivitiesPage;
