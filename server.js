// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
const express = require('express');

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
// If we are in production (Heroku), process.env.PORT is true, 
// If we are in development it is false, default to 2109
const PORT = process.env.PORT || 2020;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ===============================================================================
// ROUTING
// ===============================================================================

// API GET Requests
require("./routes/apiRoutes")(app);

// HTML GET Requests
require("./routes/htmlRoutes")(app);


// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================
// app.use(express.static('public'));
app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });