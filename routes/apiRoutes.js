// ===============================================================================
// LOAD DATA
// We are using `fs` module to store and retrieve a user's note, aka "data" source 
// that's located in ./db/db.json.
// ===============================================================================

const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

let count = 0;

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Request
  // Below code reads the `db.json` file and return all saved notes as JSON.
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    
      try {
        readFileAsync("./db/db.json", "utf8")
        .then(function(data) {
          // Parse the JSON string to an object
          const notes = JSON.parse(data);

          if (notes.length > 0)
            count = notes.length;

          res.json(notes);
        });
      } catch (err) {
        console.log("Failed to read from db.json file.");
      }
  });

  // API POST Request
  // Below code receives a new note to save on the request body, add it to 
  // the `db.json` file, and then return the new note to the client.
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    
    try {

      // Checking if there are entries to save or not
      // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
      // It will do this by sending out the value "true" have a table
      // req.body is available since we're using the body parsing middleware
      let incoming = {...req.body, id: count++};

      readFileAsync("./db/db.json", "utf8")
      .then(function(data) {
        // Parse the JSON string to an object
        const notes = JSON.parse(data);
        notes.push(incoming);

        writeFileAsync("./db/db.json", JSON.stringify(notes));

        // Return the new note to the client
        res.json(JSON.stringify(notes));
      });

  
    } catch (err) {
      console.log("Failed to save to db.json file.");
    }
    
  });



  // API DELETE Request
  // Below code receives a query parameter containing the id of a note to 
  // delete. This means you'll need to find a way to give each note a unique `id` 
  // when it's saved. In order to delete a note, you'll need to read all notes 
  // from the `db.json` file, remove the note with the given `id` property, and 
  // then rewrite the notes to the `db.json` file.
  // ---------------------------------------------------------------------------
  app.delete("/api/notes/:id", function(req, res) {
    try {
      readFileAsync("./db/db.json", "utf8")
      .then(function(data) {
        // Parse the JSON string to an object
        const notes = JSON.parse(data);
        const array = [];

        for (let i = 0; i < notes.length; i++){
          if (parseInt(req.params.id) === notes[i].id) {
            notes.splice(i, 1);
          }
          else {
            array.push(notes[i]);
          }
        }

        writeFileAsync("./db/db.json", JSON.stringify(array));

        res.json(JSON.stringify(array));
      });
    } catch (err) {
      console.log(`Failed to delete from db.json file.`);
    }
  });
};