// custom
var general = require("../helpers/general");


module.exports = function(req, res) {
	general.txt().then(function(result) {
		res.send(JSON.stringify(general.operate(result, req.params.number)));
	}).catch(function(reason) {
		// res.send("errorr!");
		console.log("Promise rejected ... TTT error or mine? - " + reason);
	});

}
