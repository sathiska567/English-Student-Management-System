require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");

require("./db/db");
const studentRegistration = require("./routes/StudentRecordsRoute/StudentRegistrationRecord") 

const app = express();

app.use(express.json()); // middlewares
app.use(cors());

// CREATE API ROUTES
app.use("/api/v1/registration", studentRegistration);


const PORT = process.env.PORT || 3000; // Define a default port if PORT is not set in .env

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});