const express = require("express");
const app = express();

app.listen(3001);

app.get("/", async function(req, res) {
    res.status(200).json({message: "Hello World!"});
});