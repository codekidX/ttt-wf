var app = angular.module('ttt', ['ngMaterial']);
const serverUrl = "https://ttt-wf.herokuapp.com";
const testServerUrl = "http://localhost:8080";
const getWordsUrl = testServerUrl + "/api/nnumber/";

app.controller('defaultCtrl', function($scope, $http, $mdToast, $timeout, $mdSidenav, $log) {
	var input = document.getElementById("inputN");

	$scope.sortSwitch = false;
	// scoped function to toggle nav drawer
	$scope.toggleLeft = buildDelayedToggler('left');
	// responses from backend server [word frequency and it's count]
	$scope.responses;
	// settings for sorting [ng-repeat action on this array]
	$scope.settings = [
		{
			name: "Inbuilt",
			enabled: true
		}
	]

	/*
	* custom keypress actions
	*/
	$scope.wfKeyEvent = function (keyEvent) {
		if (keyEvent.which === 13) {
			$scope.submitClick();
		}
	}
	/*
	* show/hide instructions regarding sorting options
	* @param - shouldHide | Boolean
	*/
	$scope.showHideInstruction = function (shouldHide) {
			$scope.sortSwitch = shouldHide;
	}

	/*
	* shows a material toast type dialog
	* @params - message | String - message to display
	*					- time | Integer - in milliseconds to exit
	*/
	$scope.showToast = function (message, time) {
		$mdToast.show(
				$mdToast.simple()
					.textContent(message)
					.position('bottom left')
					.hideDelay(time)
			);
	}

	function debounce(func, wait, context) {
		var timer;

		return function debounced() {
			var context = $scope,
					args = Array.prototype.slice.call(arguments);
			$timeout.cancel(timer);
			timer = $timeout(function() {
				timer = undefined;
				func.apply(context, args);
			}, wait || 10);
		};
	}

	/**
	 * Build handler to open/close a SideNav; when animation finishes
	 * report completion in console
	 */
	function buildDelayedToggler(navID) {
		return debounce(function() {
			// Component lookup should always be available since we are not using `ng-if`
			$mdSidenav(navID)
				.toggle()
				.then(function () {
					$log.debug("toggle " + navID + " is done");
				});
		}, 200);
	}

	function buildToggler(navID) {
		return function() {
			// Component lookup should always be available since we are not using `ng-if`
			$mdSidenav(navID)
				.toggle()
				.then(function () {
					$log.debug("toggle " + navID + " is done");
				});
		};
	}

	/*
	* ng-click action - sends an http request to backend with the value of the
	* 									input textarea and the sorting type
	*/
	$scope.submitClick = function() {

		let userInput = Math.round(input.value);

		if (userInput <= 0) {
			$scope.showToast('No results to display :)', 2000);
			if ($scope.responses.length > 0) {
				// somathing ij thare
				$scope.responses = [];
			}
		} else if (userInput == "") {
			$scope.showToast('Enter something ! Please ?', 3000);
		} else if (isNaN(userInput)) {
			$scope.showToast('You did not enter a number', 3000);
		} else {
			$scope.showToast('Querying results .. please wait', 1000);

				$http.get(getWordsUrl + userInput + '/' + $scope.settings[0].enabled)
					.success(function(data, status, header, config) {
						if (typeof(data) == "string") {
							$scope.showToast(data, 4000);
						} else {
							$scope.responses = data;
						}
					});
		}
	}
});
