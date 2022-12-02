const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

// port
const port = process.env.PORT || 8080;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

//Get data
app.get("/getData", (req, res) => {
  res.send(projectData).status(200).end();
});

// Post data
app.post("/postData", (req, res) => {
  projectData = {
    city: req.body.city,
    temp: req.body.temp,
    date: req.body.date,
    feelings: req.body.feelings,
  };
  res.send(projectData).status(200).end();
});
