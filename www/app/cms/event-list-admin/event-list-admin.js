app.controller('eventListadminController', function($scope, $http, $cookies, $location, screenSize) {
    $scope.$parent.hideNav = 1;
	$scope.events = '';
	$scope.$parent.isDesktop = screenSize.onChange($scope, 'md, sm, lg', function(isMatch){
		$scope.isDesktop = isMatch;
	});

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
            console.log(response);
        });
    }

	$scope.deleteEvent = function(event_id){
		if(confirm('Are you sure you want to Delete?')){
			$http({
				method: 'POST',
				url: api_url+'delete_event',
				data: {
					'user_id':$cookies.get('user_id'),
					'hash':$cookies.get('hash'),
					'event_id':event_id
				}
			}).then(function successCallback(response) {
				console.log(response);
				$scope.getAllEvents();
			});
		}
	}
	$scope.getAllEvents();
});
