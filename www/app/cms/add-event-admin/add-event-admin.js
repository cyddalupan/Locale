app.controller('addEventadminController', function($scope, $http, $cookies, $location) {
    $scope.$parent.hideNav = 1;
	$scope.event = [];
    
    // Check if user is logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}

	//Save host Function
	$scope.msg = '';
    $scope.addEvent = function () {
       $http({
			method: 'POST',
			url: api_url+'create_event',
			data:{
                'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'event_id':$scope.event_id,
				'event_name':$scope.event.event_name,
				'img_url':$scope.event.img_url,
				'short_description':$scope.event.short_description,
				'long_description':$scope.event.long_description,
				'category_id':$scope.event.category_id,
				'host_id':$scope.event.host_id,
				'position_sort':$scope.event.position_sort,
				'event_date':$scope.event.event_date,
				'is_featured':$scope.event.is_featured
			}
		}).then(function successCallback(response) {

            if (response.data.result == 'failed') {
                $scope.msg = response.data.message;
            } else {
                alert(response.data.message);
            }
                console.log(response)
		}, function errorCallback(response) {

		});
    }


});
