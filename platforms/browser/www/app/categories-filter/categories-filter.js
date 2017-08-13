app.controller('categoriesFilterController', function($scope, $http, $cookies, $location, $routeParams) {
	$scope.$parent.hideNav = 0;
	$scope.events = '';
	$scope.id = $routeParams.category_id;

	$scope.eventCount = 1;
	$( "#test" ).each(function( index ) {
		var index = $("#test").addClass('event_' + $scope.eventCount);
		$scope.eventCount++;
		if ($scope.eventCount > 12) {
			$scope.eventCount = 1;
		}
	});
	

	// Check if user is logged
    if ($cookies.get('user_type_id') <= 4){
		//user is correct
	}else{
		$location.path('/login');
	}

	$scope.getAllEvents = function() {
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
			if ($cookies.get('user_type_id') < 4){
				$scope.$parent.adminOnly = 1;
			}else {
				$scope.$parent.adminOnly = 0;
			}
		});
	}
	$scope.getAllEvents()
});