app.controller('mainController', function($scope, $location, $http, $cookies) {
	$scope.hideNav = 0;
	$scope.localSettings = false;

    if ($cookies.get('user_type_id') < 4){
		$scope.adminOnly = 1
	}else{
		$scope.adminOnly = 0
	}

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
			$cookies.remove('fullname');
			$cookies.remove('img');
			$cookies.remove('user_type_id');
			$location.path('/login')
			$scope.localsettingsActive = !$scope.localsettingsActive;
		});
	}
	
});