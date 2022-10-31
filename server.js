const fs = require("fs");
const express = require("express");
const util = require("util");
const path = require("path");
const api = require("./develop/public/assets/js/index");

// Setting up server
const PORT = process.env.PORT || 3001;

const app = express();

// Asynchronous processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ entended: true }));

app.use(express.static("./develop/public"));

// GET Route for homepage
app.get("./api/notes", function (req, res) {
  readFileAsync("./develop/db/db.json", "utf-8").then(function (data) {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});
