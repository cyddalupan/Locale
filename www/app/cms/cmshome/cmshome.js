app.controller('cmshomeController', function($scope, $location, $cookies, $http) {
    $scope.$parent.hideNav = 1;

    // Check if user is logged
    if ($cookies.get('user_type_id') < 4){
		//user is correct
	}else{
		$location.path('/login');
	}

	$scope.userTypeId = $cookies.get('user_type_id');

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
			
		});
	}

});