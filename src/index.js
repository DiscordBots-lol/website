const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const config = require("../config.json");

const { auth } = require("./utils/client");
const Bots = require("./database/schemas/Bots");
const tokenManager = require("./utils/TokenManager");
const authorization = require("./utils/auth");
const api = require("./utils/api");

const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname + "/../views"));
app.use(express.static(path.join(__dirname + "/../assets/public")));

app.get("/", (req, res) => {
    res.render("index.ejs", { title: 'Home' });
})

app.get("/login",
    passport.authenticate('discord', {
     scope: ['identify'],
     prompt: 'consent'
}), (req, res) => {});

app.get("/logout", async (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get("/user/@me", auth, async (req, res) => {
    let user = await req.app.get("client").users.fetch(req.user.id);
    if (!user) return res.send('404', {user: req.user});

    res.render("me.ejs")
})

app.listen(config.port || 3000, () => {
    console.log(`Website is running on: http://localhost:${config.port || 3000}`)
});

module.exports = app;
