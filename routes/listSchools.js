const express = require('express');
const router = express.Router();
const School = require('../models/School');  

// Accepts user's latitude and longitude as query parameters, then returns schools sorted by proximity.
router.get('/listSchools', async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
  
      if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
      }
  
      // Retrieve all schools and sort them by proximity
      const schools = await School.findAll();
      const sortedSchools = schools.map((school) => ({
        ...school,
        distance: calculateDistance(latitude, longitude, school.latitude, school.longitude),
      })).sort((a, b) => a.distance - b.distance);
  
    
      res.json(sortedSchools);
    } catch (error) {
      console.error('Error listing schools:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Haversine formula to calculate distance between two lat/lng coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  
 module.exports=router; 