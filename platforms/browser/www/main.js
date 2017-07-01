app.controller('mainController', function($scope,$location) {
	$scope.hideNav = 0;
	$scope.localSettings = false;
	$scope.localSettings = function() {
		$scope.localsettingsActive = !$scope.localsettingsActive;
	};
});