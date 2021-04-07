const express = require("express");
const path = require("path");
const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname + "/views"));

app.get("/docs", (req, res) => {
  res.redirect("/docs/api")

app.get("/docs/api", (req, res) => {
  res.render("index.ejs");

module.exports = docs;
