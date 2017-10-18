const request = require("request");

async function requestTxt() {
	let requestOpt = {
		uri: "http://terriblytinytales.com/test.txt",
		method: "GET"
	}
	return new Promise(function (resolve, reject) {
		request(requestOpt, function(error, response, body) {
			if(error) { reject(error); };
			if(typeof(response) != "undefined") {
				if(response.statusCode == 200) { resolve(body); };
			} else {
				reject(response);
			}
			// console.log(body);
		});
	});
}

function operateTxt(para, howManyResults) {
	 let trimmedPara = para.replace(/(?!\w|\s)./g, '')
						    .replace(/\s+/g, ' ')
						    .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
	let wordsArray = trimmedPara.split(" ");

	// create hashmap .. empty one
	let wordsMap = {};
	// populate
	wordsArray.forEach(function(key) {
		if(wordsMap.hasOwnProperty(key)) {
			wordsMap[key]++;
		} else {
			wordsMap[key]= 1;
		}
	});

	let wordsArrayWithCount = [];
	wordsArrayWithCount = Object.keys(wordsMap).map(function(key) {
		return {
			word: key,
			count: wordsMap[key]
		}
	});

		if (howManyResults > wordsArrayWithCount.length) {
			return "Error: number of words requested is exceeding number of words queried";
		} else {
			wordsArrayWithCount.sort(function(a, b) {
				return b.count - a.count;
			});

			let count = 0;
			let finalArray = [];

			for (var i = 0; i < howManyResults; i++) {
				finalArray.push(wordsArrayWithCount[i]);
			}

			return finalArray;
		}
}

module.exports = {
	txt: requestTxt,
	operate: operateTxt
}
