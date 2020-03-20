// ===============================================================================
// LOAD DATA
// We are using `fs` module to store and retrieve a user's note, aka "data" source 
// that's located in ../db/db.json.
// ===============================================================================

const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Request
  // Below code reads the `db.json` file and return all saved notes as JSON.
  // ---------------------------------------------------------------------------

  app.get("/api/tables", function(req, res) {
      
    res.json(tableData);
  });

  // API POST Request
  // Below code receives a new note to save on the request body, add it to 
  // the `db.json` file, and then return the new note to the client.
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {

    res.json(tableData);

  });



  // API DELETE Request
  // Below code receives a query parameter containing the id of a note to 
  // delete. This means you'll need to find a way to give each note a unique `id` 
  // when it's saved. In order to delete a note, you'll need to read all notes 
  // from the `db.json` file, remove the note with the given `id` property, and 
  // then rewrite the notes to the `db.json` file.
  // ---------------------------------------------------------------------------
  app.delete("/api/notes/:id", function(req, res) {

    res.json(tableData);

  });
};


// adding to the `db.json` file
// ----------------------------

function saveFile() {
  // fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  // const html = fs.readFileSync(`../Assets/${result.githubUID}.html`, 'utf8');
  try {
    writeFileAsync(`../db/db.json`, generateHTML.generateHTML(result))
    .then(function() {
      console.log(`Successfully updated db.json file`);
    });
  } catch (err) {
    console.log("Failed to save to db.json file.");
  }
}

function getFile() {
  try {
    const dbFile = fs.readFileAsync(`../db/db.json`, 'utf8');
  } catch (err) {
    console.log("Failed to read from db.json file.");
  }

}