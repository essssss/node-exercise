const fs = require("fs");
const process = require("process");
const axios = require("axios");

function getListOfUrls(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log("Unable to read file");
            process.exit(1);
        }
        let urlArray = data.split("\n");
        for (let url of urlArray) {
            getWebPage(url);
        }
    });
}

async function getWebPage(url) {
    try {
        let res = await axios.get(url);
        handleOutput(res.data, url);
    } catch (err) {
        handleOutput("error", url);
    }
}

async function handleOutput(data, url) {
    let baseUrl = url.split("/")[2];
    if (data === "error") {
        console.log(`Couldn't write to ${baseUrl}`);
    } else {
        fs.writeFile(baseUrl, data, "utf8", function (err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            {
                console.log(`Wrote to ${baseUrl}`);
            }
        });
    }
}

let path = process.argv[2];
getListOfUrls(path);
