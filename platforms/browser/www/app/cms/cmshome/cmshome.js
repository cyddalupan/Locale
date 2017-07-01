app.controller('cmshomeController', function($scope, $location, $cookies) {
    $scope.$parent.hideNav = 1;

    // Check if user is logged
    if ($cookies.get('user_type_id') < 4){
		//user is correct
	}else{
		$location.path('/login');
	}
	
	$scope.userTypeId = $cookies.get('user_type_id');

});