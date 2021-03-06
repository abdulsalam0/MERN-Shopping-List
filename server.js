const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require("./routes/api/items")

const app = express();

// bodyparser middleware
// using the bodyparser in the express app
app.use(bodyParser.json());

// Get DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db,{useNewUrlParser:true ,useUnifiedTopology: true,})
    .then(() => console.log('MongoDB linked...'))
    .catch( err => console.log(err));

// Use routes
app.use("/api/items",items);

    const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));