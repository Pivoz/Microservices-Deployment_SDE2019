const express = require("express");
const app = express();
const fetch = require("node-fetch");
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(3001);

app.get("/n2w", async function(req, res) {

    //Check the query params of the request
    let number = req.query.number;
    let lang = req.query.locale;

    if (number === undefined || parseFloat(number) == undefined || typeof lang !== "string"){
        res.status(400).send({message: "Bad query parameters"});
        return;
    }

    //Split the number in its integer and decimal parts
    let splitted = number.split(".");
    const headers = ["integer", "decimal"];
    const result = {};

    for (var i=0; i<splitted.length; i++){
        let n2wResponse = await fetch("http://localhost:3000/n2wadapter?number="+splitted[i]+"&locale="+lang);
        if (!n2wResponse.ok){
            res.status(500).json({message: "Unable to comunicate with external microservice n2w"});
            return;
        }

        let textResponse = await n2wResponse.json();
        result[headers[i]]=textResponse.result;
    }

    res.status(200).json(result);
});