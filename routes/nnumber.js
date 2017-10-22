// custom
var general = require("../helpers/general");

// export route action on request to /api/nnumber
module.exports = function(req, res) {
	general.txt().then(function(result) {
		res.send(JSON.stringify(general.operate(result, req.params.number, req.params.sort)));
	}).catch(function(reason) {
		// res.send("errorr!");
		console.log("Promise rejected ... TTT error or mine? - " + reason);
	});

}
