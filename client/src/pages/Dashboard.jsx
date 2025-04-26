import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = ({ api_url }) => {
  const [location, setLocation] = useState('');
  const [keyword, setKeyword] = useState('things to do');
  const [results, setResults] = useState([]);

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${api_url}/api/places/search`, {
        params: { location, keyword },
        withCredentials: true
      });
      setResults(res.data);
    } catch (err) {
      console.error('Error searching places:', err);
    }
  };

  const getPlaceImageUrl = (photoReference) => {
    if (!photoReference) return '';
    console.log('Photo reference:', photoReference);
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
  };

  return (
    <div>
      <h2>Search for Activities</h2>
      <div>
        <input
          type="text"
          placeholder="Enter city (e.g., Tokyo)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter keyword (e.g., museum)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        <h3>Results:</h3>
        {results.length === 0 && <p>No results yet.</p>}
        <ul>
          {results.map((place, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
              <strong>{place.name}</strong><br />
              {place.vicinity || 'Location not available'}<br />
              Rating: {place.rating || 'N/A'}
              <br />
              {place.photos && place.photos.length > 0 ? (
                <img
                  src={getPlaceImageUrl(place.photos[0].photo_reference)}
                  alt={place.name}
                  style={{ width: '300px', height: 'auto', marginTop: '10px' }}
                />
              ) : (
                <p>No image available</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
