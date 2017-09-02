app.controller('addEventadminController', function($scope, $http, $cookies, $location, screenSize) {
    $scope.$parent.hideNav = 1;
	$scope.event = [];
	$scope.msg = '';
	$scope.$parent.isDesktop = screenSize.onChange($scope, 'md, sm, lg', function(isMatch){
		$scope.isDesktop = isMatch;
	});
    
    // Check if user is logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}
	
	$scope.getAllhost = function(){
        $http({
			method: 'POST',
			url: api_url+'get_all_host',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash')
			}
		}).then(function successCallback(response) {
            $scope.eventHosts = response.data.hosts;
			$scope.getCategories()	
        });
    }
	$scope.getAllhost()
	
	//Get all Categories
	$scope.getCategories = function(){
		$http({
			method: 'POST',
			url: api_url+'all_category',
			data: {
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash')
			}
		}).then(function successCallback(response) {
			$scope.eventCategory = response.data.categories;
		});
	}

	//Save host Function
    $scope.addEvent = function (event_id) {
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
				'long_description':$scope.event.long_desc.description,
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
