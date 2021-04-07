const express = require("express");
const path = require("path");
const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname + "/pages"));

app.get("/docs", (req, res) => { // redirects to the new docs
  res.redirect("/docs/api")

app.get("/docs/api", (req, res) => {
  res.render("index.ejs");

module.exports = docs;
