const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var app = express();
//routes
var nnumber = require("./routes/nnumber") 

// parse request body as json
app.use(bodyParser.json());
app.use(express.static("view"));

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + '/view/index.html'));
})

app.get('/api/nnumber/:number', nnumber);

app.listen(5000);
console.log("Started express server !");

module.exports = app;