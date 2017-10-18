var app = angular.module('ttt', ['ngMaterial']);
const serverUrl = "http://localhost:5000";
const getWordsUrl = serverUrl + "/api/nnumber/";

app.controller('defaultCtrl', function($scope, $http, $mdToast, $timeout, $mdSidenav, $log) {
	var input = document.getElementById("inputN");

	$scope.sortSwitch = false;
	$scope.toggleLeft = buildDelayedToggler('left');
	$scope.responses;
	$scope.settings = [
		{
			name: "Inbuilt",
			enabled: true
		}
	]

	$scope.showHideInstruction = function (shouldHide) {
			$scope.sortSwitch = shouldHide;
	}

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

	$scope.submitClick = function() {
		if (input.value == 0) {
			$scope.showToast('No results to display :)');
			if ($scope.responses.length > 0) {
				// somathing ij thare
				$scope.responses = [];
			}
		} else if (input.value == "") {
			$scope.showToast('Enter something ! Please ?', 3000);
		} else if (isNaN(input.value)) {
			$scope.showToast('You did not enter a number', 3000);
		} else {
			$scope.showToast('Querying results .. please wait', 1000);

				$http.get(getWordsUrl + input.value)
					.success(function(data, status, header, config) {
						if (typeof(data) == "string") {
							$scope.showToast(data.replace('"', ""), 4000);
						} else {
							$scope.responses = data;
						}
						console.log(data);
					});
		}
	}
});
