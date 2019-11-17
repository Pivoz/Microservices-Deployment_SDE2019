const express = require("express");
const app = express();
const fetch = require("node-fetch");
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(3000);

app.get("/n2wadapter", async function(req, res) {

    //Check the query params of the request
    let number = req.query.number;
    let lang = req.query.locale;

    if (number === undefined || parseFloat(number) == undefined || typeof lang !== "string"){
        res.status(400).send({message: "Bad query parameters"});
        return;
    }

    //Call n2w microservice
    const url = "http://grizzlyst.com:8081/number?number="+number+"&locale="+lang;
    let response = await fetch(url);

    if (!response.ok){
        res.status(500).json({message: "Unable to comunicate with n2w external microservice"});
        return;
    }

    let responseText = await response.text();
    res.status(200).json({result: responseText});
});