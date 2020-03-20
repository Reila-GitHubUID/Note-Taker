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

// If we are in production (Heroku), process.env.PORT is true, 
// If we are in development it is false, default to 3000
// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 2109;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const path = require('path');


// ===============================================================================
// ROUTING
// ===============================================================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================
app.use(express.static('public'));
app.listen(PORT);