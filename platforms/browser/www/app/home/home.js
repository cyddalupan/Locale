app.controller('homeController', function($scope, $http, $cookies, $location) {
	$scope.$parent.hideNav = 0;
	$scope.events = '';
    
	// Check if user is logged
    if ($cookies.get('user_type_id') <= 4){
		//user is correct
	}else{
		$location.path('/login');
	}

	$http({
		method: 'POST',
		url: api_url+'all_events',
		data:{
			'user_id':$cookies.get('user_id'),
			'hash':$cookies.get('hash')
		}
	}).then(function successCallback(response) {
		$scope.events = response.data.events;
		console.log(response);
	});
});