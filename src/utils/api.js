const express = require("express");
const app = express();

const Bots = require("../database/schemas/Bots");
const config = require("../../config.json");

module.exports = async (req, res, next) => {
    let auth = req.headers.authorization;
    if (!auth) return res.json({
        success: "false",
        error: "Authorization header not found"
    });

    const bot = await Bots.findOne({ botId: req.params.id }, { _id: false })
    if (!bot) return res.json({
        "success": "false",
        "error": "Bot not found"
    });

    if (!bot.auth) return res.json({
        sucess: "false",
        error: "Create a bot authorization token."
    });

    if (!bot.auth !== auth) return res.json({
        sucess: "false",
        error: "Incorrect authorization token."
    });

    if (bot.ratelimit && Data.now() - bot.ratelimit < (ratelimit * 1000)) return res.json({
        success: "false",
        error: "You're being rate limited."
    })

    Bots.updateOne({ botId: req.params.id }, { ratelimit: Date.now() })
    return next();
}
