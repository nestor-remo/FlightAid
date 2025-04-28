import express from 'express';
import axios from 'axios';

const router = express.Router();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// GET /api/places/search?location=Tokyo&keyword=museum
router.get('/search', async (req, res) => {

    const { location, keyword } = req.query;
  
    if (!location) {
      return res.status(400).json({ message: 'Location is required' });
    }
  
    try {
      console.log('Query received:', { location, keyword });

      const geoRes = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: location,
          key: GOOGLE_API_KEY
        }
      });
  
      console.log('Geocode response:', geoRes.data);
  
      const coords = geoRes.data.results[0]?.geometry?.location;
  
      if (!coords) {
        console.warn('Geocoding failed: No results found');
        return res.status(404).json({ message: 'Location not found' });
      }
  
      console.log('Using coordinates:', coords);

      const placesRes = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          location: `${coords.lat},${coords.lng}`,
          radius: 5000,
          keyword,
          key: GOOGLE_API_KEY
        }
      });
  
      console.log('Places API response status:', placesRes.data.status);
      console.log('Places found:', placesRes.data.results.length);
  
      res.json(placesRes.data.results);
    } catch (err) {
      console.error('Google API error:', err.response?.data || err.message);
      res.status(500).json({ message: 'Failed to fetch activity data' });
    }
  });
  

export default router;
