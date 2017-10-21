const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var app = express();
//routes
var nnumber = require("./routes/nnumber")
// heroku port config
var port = process.env.PORT || 8080;

// parse request body as json
app.use(bodyParser.json());
app.use(express.static("view"));
app.use(express.static("node_modules"));

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + '/view/index.html'));
})

app.get('/api/nnumber/:number/:sort', nnumber);

app.listen(port, function () {
	console.log("Started express server on port - " + port);
});

module.exports = app;
