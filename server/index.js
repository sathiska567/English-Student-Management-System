const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./db/db');
const registrationRoute = require('./routes/StudenRegistrationRoutes/StudentRegistrationRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/registration',registrationRoute);

// Set PORT
PORT = process.env.PORT || 5000;

// Connect server
app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
})
 
