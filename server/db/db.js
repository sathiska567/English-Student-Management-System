const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url)

const connection = mongoose.connection;

connection.once("open",()=>{
    try {
        console.log("MongoDB database connected");
    } catch (error) {
        console.log("Mongodb connecting have an error");
    }
})