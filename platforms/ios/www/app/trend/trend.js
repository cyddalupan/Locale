app.controller('trendController', function($scope, $http, $cookies, $location, $filter) {
	$scope.$parent.hideNav = 0;
	$scope.events = '';
	$scope.$parent.isDesktop = 0;

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

			$scope.events = $filter('filter')($scope.events,{'is_featured': 1});

			$scope.count = 1;
			angular.forEach($scope.events, function(value, key) {

				$scope.events[key].count = $scope.count;

				$scope.count++;
				if ($scope.count > 12) {
					$scope.count = 1;
				}
			});		
		});
	}
	$scope.getAllEvents()

});