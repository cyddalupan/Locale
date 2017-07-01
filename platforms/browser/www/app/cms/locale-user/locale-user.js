app.controller('localeUserController', function($scope, $cookies, $location, $http) {
    $scope.$parent.hideNav = 1;
    // Check if user is logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}
});
