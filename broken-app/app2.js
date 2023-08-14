const express = require("express");
let axios = require("axios");
var app = express();

app.post("/", function (req, res, next) {
    try {
        let results = req.body.developers.map(async (devName) => {
            return await axios.get(`https://api.github.com/users/${devName}`);
        });
        let out = results.map((result) => ({
            name: result.data.name,
            bio: result.data.bio,
        }));

        return res.send(JSON.stringify(out));
    } catch (err) {
        next(err);
    }
});

app.listen(3000);
