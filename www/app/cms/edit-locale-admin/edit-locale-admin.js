app.controller('editLocaleadminController', function($scope, $http, $cookies, $location) {
    $scope.$parent.hideNav = 1;

    // Check if user is logged
    if ($cookies.get('user_type_id') = 1){
		//user is correct
	}else{
		$location.path('/login');
	}
});
