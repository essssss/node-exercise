const express = require("express");
const axios = require("axios");
const app = express();
const ExpressError = require("./expressError");
app.use(express.json());

app.post("/", async function (req, res, next) {
    try {
        let results = await Promise.all(
            req.body.developers.map(async (devName) => {
                return await axios.get(
                    `https://api.github.com/users/${devName}`
                );
            })
        );

        console.log(results);
        let out = results.map((result) => ({
            name: result.data.name,
            bio: result.data.bio,
        }));

        return res.send(JSON.stringify(out));
    } catch (err) {
        next(err);
    }
});

app.use(function (req, res) {
    return new ExpressError("Not Found", 404);
});
app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;

    // set the status and alert the user
    return res.status(status).json({
        error: {
            message: err.message,
            status: status,
        },
    });
});

app.listen(3000, function () {
    console.log("Server is listening on port 3000");
});
