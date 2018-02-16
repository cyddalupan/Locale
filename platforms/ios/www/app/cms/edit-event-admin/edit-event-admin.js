app.controller('editEventadminController', function($scope, $http, $cookies, $location, $routeParams, screenSize) {
    $scope.$parent.hideNav = 1;
	$scope.event_id = $routeParams.event_id;
    $scope.eventHost = '';
	$scope.eventCategory = '';
	$scope.event = '';
	$scope.hostidget = $scope.hostid;
	$scope.$parent.isDesktop = screenSize.onChange($scope, 'md, sm, lg', function(isMatch){
		$scope.isDesktop = isMatch;
	});
	
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
			console.log($scope.event)
			$scope.hostid = response.data.event.host_id;
			$scope.categoryid = response.data.event.category_id;
			$scope.get_host();
			$scope.callCategory();
			$scope.event.event_date = new Date($scope.event.event_date);
		});
	}
	$scope.get_Event();
    $scope.callCategory = function(){
		$http({
		method: 'POST',
		url: api_url+'get_category',
		data: {
			'user_id':$cookies.get('user_id'),
			'hash':$cookies.get('hash'),
			'category_id':$scope.categoryid
		}
		}).then(function successCallback(response) {
			
			$scope.category = response.data.category;
			console.log($scope.category);
		});
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
        });
    }
	$scope.getAllhost()
	
	//Get Host Function
	$scope.get_host = function(){
		$http({
			method: 'POST',
			url: api_url+'get_host',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'host_id':$scope.hostid
			}
		}).then(function successCallback(response) {
			$scope.host = response.data.host;
			//load the map to mapview div
			$('.mapview-host').html($scope.host.google_map_embed);

		});
	}
	
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
	$scope.getCategories()


	//Save edit event
	$scope.editEvent = function(){
        $http({
			method: 'POST',
			url: api_url+'edit_event',
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
                $location.path('/event-list-admin');
            }
		});
	}
	


	
});
