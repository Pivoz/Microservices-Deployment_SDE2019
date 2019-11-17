const express = require("express");
const app = express();

app.listen(3002);

app.get("/", function(req, res) {
    res.status(200).json({message: "Hola Mundo!"});
});