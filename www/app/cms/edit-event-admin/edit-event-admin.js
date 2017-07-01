app.controller('editEventadminController', function($scope, $http, $cookies, $location, $routeParams) {
    $scope.$parent.hideNav = 1;
	$scope.event_id = $routeParams.event_id;
    $scope.eventHost = '';
	$scope.eventCategory = '';
    $scope.event = '';
    // Check if user is logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}
	
	$scope.get_Event = function(){
		$http({
			method: 'POST',
			url: api_url+'get_event',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'event_id':$scope.event_id
			}
		}).then(function successCallback(response) {
			$scope.event = response.data.event;
			console.log(response)
		});
	}
	$scope.get_Event();

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
			console.log($scope.eventCategory)
		});
	}
	$scope.getCategories()


	//Save edit event
	$scope.editEvent = function(){
        $http({
			method: 'POST',
			url: api_url+'edit_event',
			data:{
                'user_id':$cookies.get('user_id'),
                'hash':$cookies.get('hash'),
				'event_id':$scope.event.event_id,
				'event_name':$scope.event.event_name,
				'img_url':$scope.event.img_url,
				'short_description':$scope.event.short_description,
				'description':$scope.event.long_desc.description,
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
                $location.path('/event-list-admin');
            }
                console.log(response) 
		});
    }
});
