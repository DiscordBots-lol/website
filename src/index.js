const express = require("express");
const session = require("express-session");
const path = require("path");
const config = require("../config.json");

const tokenManager = require("./utils/TokenManager");
const auth = require("./utils/auth");
const api = require("./utils/api");
const main = require('./routes/index');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/../views"));
app.use(express.static(path.join(__dirname + "/../../assets/public")));

app.use('/', main);

app.use("/auth", auth);

app.listen(config.port || 3000, () => {
    console.log(`Website is running on: http://localhost:${config.port || 3000}`)
});

module.exports = app;
