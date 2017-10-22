const request = require("request");

/*
* sends http request to obtain the body of the text file hosted on ttt Website
* @returns - Promise with request function on execution [.then()]
*/
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

/*
* @params - para | String - body of the txt
*					- howManyResults | Integer - number of results to return
*					- inbuiltSort | Boolean - use inbuilt browser sort function or
*						custom quicksort algorithm
*  - replaces escape characters and capitalized strings to lower case
*  - splits it into array of words
*  - sorts them by descending order of their frequency
*  @returns - Array of Word objects [:word, :count variables]
*/
function operateTxt(para, howManyResults, inbuiltSort) {
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
			if (inbuiltSort) {
				wordsArrayWithCount.sort(function(a, b) {
					return b.count - a.count;
				});
			} else {
					wordsArrayWithCount = _quicksort(wordsArrayWithCount);
			}

			let count = 0;
			let finalArray = [];

			for (var i = 0; i < howManyResults; i++) {
				finalArray.push(wordsArrayWithCount[i]);
			}

			return finalArray;
		}
}

/*
* @param - wordsArrayWithCount
*/
var _quicksort = function(array) {
	if (array.length <= 1) return array;
	// do the sort - PART 1 - Divide
	var marker = Math.floor((array.length - 1) / 2);
	// marker word object to be swapped, greater than marker and less than the
	// marker arrays
	var markerWord = array[marker], gt=[], lt=[];
	// remove marker from original
	array = array.slice(0, marker).concat(array.slice(marker + 1));

	for (var word in array) {
		if (word.count > markerWord.count) {
			gt.push(word);
		} else {
			lt.push(word);
		}
	}
	// sort the lt[], gt[] same way and concat
	// in descending order because top N
	return (_quicksort(gt)).concat([markerWord], _quicksort(lt));
}

module.exports = {
	txt: requestTxt,
	operate: operateTxt
}
