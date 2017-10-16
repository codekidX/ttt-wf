var app = angular.module('ttt', ['ngMaterial']);
const serverUrl = "http://localhost:5000";
const getWordsUrl = serverUrl + "/api/nnumber/";

app.controller('defaultCtrl', function($scope, $http, $mdToast) {
	var input = document.getElementById("inputN");

	$scope.submitClick = function() {
		if (isNaN(input.value)) {
			$mdToast.show(
		      $mdToast.simple()
		        .textContent('You did not enter a number')
		        .position('bottom right')
		        .hideDelay(3000)
		    );
		} else {
			$mdToast.show(
		      $mdToast.simple()
		        .textContent('Querying results .. please wait')
		        .position('bottom right')
		        .hideDelay(3000)
		    );

		    $http.get(getWordsUrl + input.value)
		    	.success(function(data, status, header, config) {
		    		console.log(data);
		    	})
		}
	}
});