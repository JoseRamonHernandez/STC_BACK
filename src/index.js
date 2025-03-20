const express = require('express');
const cors = require('cors'); 
const mongoose = require("mongoose");
require("dotenv").config();
const stcRoutes = require("./routes/routes");

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', stcRoutes);

// routes
app.get("/", (req, res) => {
    res.send("API STC")
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connect to MongoDB Atlas"))
    .catch((error) => console.log(error));

app.listen(port, () => console.log('Server Listening on Port ', port));