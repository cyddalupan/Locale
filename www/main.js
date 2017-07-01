app.controller('mainController', function($scope, $location, $http, $cookies) {
	$scope.hideNav = 0;
	$scope.localSettings = false;
	$scope.localSettings = function() {
		$scope.localsettingsActive = !$scope.localsettingsActive;
	}
	
	$scope.logoutAll = function(){
		$http({
			method: 'POST',
			url: api_url+'logout',
			data:{
				'user_id':$cookies.get('user_id')
			}
		}).then(function successCallback(response) {

			//delete cookie on logout
			$cookies.remove('user_id');
			$cookies.remove('hash');
			$location.path('/login')
			$scope.localsettingsActive = !$scope.localsettingsActive;
		});
	}
});