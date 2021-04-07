const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-discord");
const { fetch } = require("node-fetch");
const { OAuth2Scopes } = require('discord-api-types/v8');

const User = require("../database/schemas/User");
const config = require("../../config.json");

const router = express.Router();

const strategy = new Strategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: 'http://localhost:3000/auth/callback',
    scope: ['identify']
  }, async (accessToken, refreshToken, profile, done) => {
    const { id, username, discriminator, avatar } = profile;
    try {
        const findUser = await User.findOneAndUpdate({ discordId: id }, {
            discordTag: `${username}#${discriminator}`,
            avatar: avatar,
        }, { new: true });
        if (findUser) {
            return done(null, findUser);
        } else {
            const newUser = await User.create({
                discordId: id,
                discordTag: `${username}#${discriminator}`,
                avatar: avatar,
            });
            return done(null, newUser);
        }
    } catch(err) {
        console.log(err);
        return done(err, null);
    }
})

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.discordId)
});

passport.deserializeUser(async (discordId, done) => {
    try {
        const user = await User.findOne({ discordId });
        return user ? done(null, user) : done(null, null);
    } catch (err) {
        console.log(err)
        done(err, null);
    }
});

module.exports = router;
