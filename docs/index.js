const = require("express")
const app = express();

app.get("/docs", (req, res) => {
  res.redirect("/docs/api")

app.get("/docs/api", (req, res) => {
  res.render("index.ejs");

module.exports = docs;
