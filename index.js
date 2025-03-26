
const express = require('express');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));


const addSchoolRoute=require("./routes/addSchool.js");
const listSchoolsRoute=require("./routes/listSchools.js");



// 1. Add School API (POST /addSchool)

app.use("/",addSchoolRoute);
app.use("/",listSchoolsRoute);


// 2. List Schools API (GET /listSchools)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
