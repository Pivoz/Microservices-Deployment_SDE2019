const express = require("express");
const app = express();
const fetch = require("node-fetch");
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(3002);

app.post("/compute", async function(req, res) {

    //Check the body of the incoming request
    let bodyReq = req.body;
    if (bodyReq === undefined){
        res.status(400).send({message: "Body undefined"});
        return;
    }

    //Check the query params of the request
    let toWord = req.query.toword;
    let lang =req.query.lang;

    if (toWord !== undefined && toWord === true)
        if (lang === undefined || typeof lang !== "string")
            res.status(400).send({message: "Bad query param format"});

    //Data extraction and check
    let op1 = parseFloat(bodyReq.op1);
    let op2 = parseFloat(bodyReq.op2);
    let sign = bodyReq.opSign;

    if (op1 === undefined || typeof op1 != 'number' || 
        op2 === undefined || typeof op2 != 'number' ||
        sign === undefined || typeof sign != 'string' || sign.length != 1
    ){
        res.status(400).send({message: "Bad body params format"});
        return;
    }

    let result = computeResult(op1,op2,sign);
    if (result == undefined){
        res.status(400).json({message: "Division by zero or sign not supported"});
        return;
    }
    
    result = result.toFixed(2);
    console.log("Result = " + result);

    //Call to number-to-word micfrom the body roservice
    if (toWord){
        let microserviceResult = await fetch("http://localhost:3001/n2w?number=" + result + "&locale=" + lang);
        if (!microserviceResult.ok){
            res.status(500).send({message: "Unable to comunicate with n2w microservice"});
            return;
        }

        let resJson = await microserviceResult.json();
        let response = {query: op1+" " + sign + " " + op2, result: resJson};
        res.status(200).json(response);
    }
    else
        res.status(200).json({query: op1+" " + sign + " " + op2, result: result});

});

function computeResult(op1, op2, sign){
    switch (sign){
        case '+': return op1+op2;
        case '-': return op1-op2;
        case '*': return op1*op2;
        case '/': return (op2 != 0) ? op1/op2 : undefined;
    }

    return undefined;
}
