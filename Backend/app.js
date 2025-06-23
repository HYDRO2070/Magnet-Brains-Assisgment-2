const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/order", require("./Routes/orderRoutes"));
app.use('/api', require("./Routes/ProductRoutes"));
app.use('/api/stripe', require("./Routes/stripeRoutes"));


app.listen(process.env.PORT, () => console.log(`Data base running on Port:${process.env.PORT}`));

