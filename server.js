const fs = require("fs");
const express = require("express");
const util = require("util");
const path = require("path");
// const api = require("./develop/public/assets/js/index");

// Setting up server
const PORT = process.env.PORT || 3001;

const app = express();

// Asynchronous processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// API Route for "GET" request
app.get("/api/notes", function (req, res) {
  readFileAsync("./db/db.json", "utf-8").then(function (data) {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

// API Route for "POST" request
app.post("/api/notes", function (req, res) {
  const note = req.body;
  readFileAsync("./db/db.json", "utf-8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      note.id = notes.length + 1;
      notes.push(note);
      return notes;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.json(note);
    });
});

// Wildcard route to direct users to a 404 page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT" + PORT);
});
