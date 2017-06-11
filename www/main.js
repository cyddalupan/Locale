app.controller('mainController', function($scope,$location) {
	$scope.localSettings = false;
	$scope.localSettings = function() {
		$scope.localsettingsActive = !$scope.localsettingsActive;
	};

	$scope.$on('$routeChangeStart', function(next, current) { 
		if($location.url() == '/login' || $location.url() == '/single-view'){
			$scope.hideNav = 1;
		}else{
			$scope.hideNav = 0;
		}
	});
});