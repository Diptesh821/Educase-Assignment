const express = require('express');
const router = express.Router();
const School = require('../models/School');  
const validateSchool=require("../middlewares/validateSchool.js")



router.post('/addSchool',validateSchool, async (req, res) => {
    
    const { name, address, latitude, longitude } = req.body;

  try {
      // Add the school to the database
      const schoolId = await School.create(name, address, latitude, longitude);
      res.status(201).json({ message: 'School added successfully', id: schoolId });
    } catch (error) {
      console.error('Error adding school:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports=router;