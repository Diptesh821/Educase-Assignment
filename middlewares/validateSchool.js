function validateSchoolData(req,res,next){
    const { name, address, latitude, longitude } = req.body;
     
      // Validate the inputs
      if (!name || !address || latitude === undefined || longitude === undefined||!latitude||!longitude) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
   // Check data types
  // name, address should be strings
  if (typeof name !== 'string' || typeof address !== 'string') {
    return res.status(400).json({ error: 'Name and address must be strings' });
  }

  const mustHaveLetterRegex = /[A-Za-z]/;
  if (!mustHaveLetterRegex.test(name)||!mustHaveLetterRegex.test(address)) {
    return res.status(400).json({ error: 'Name and address must contain at least one letter.' });
  }

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({ error: 'Name must be between 2 and 100 characters.' });
  }

  if (address.length < 2 || address.length > 255) {
    return res.status(400).json({ error: 'Address must be between 2 and 255 characters.' });
  }

  // latitude, longitude should be valid numbers
  const latNum = parseFloat(latitude);
  const lonNum = parseFloat(longitude);
  if (isNaN(latNum) || isNaN(lonNum)) {
    return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
  }

  return next();
}
module.exports=validateSchoolData;