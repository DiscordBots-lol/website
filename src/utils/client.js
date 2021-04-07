const fetch = require('node-fetch');

module.exports.auth = async(req, res, next) => {
    if (!req.user) return res.redirect("/login");
}

module.exports.getUser = async (user) => {
    let { accessToken } = user;

    user = await fetch(`https://discord.com/api/users/@me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    user = await user.json();

    if (user.code === 0) return false;
    return user;
};
