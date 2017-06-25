app.controller('eventListadminController', function($scope, $http, $cookies) {
    $scope.$parent.hideNav = 1;
	$scope.events = '';

    // Check if user is logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}

	$scope.getAllEvents = function(){
        $http({
			method: 'POST',
			url: api_url+'all_events',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash')
			}
		}).then(function successCallback(response) {
            $scope.events = response.data.events;
            console.log($scope.events);
        });
    }
	$scope.getAllEvents();
});
