app.controller('appmapViewController', function($scope, $http, $cookies, $location, $routeParams) {
    $scope.$parent.hideNav = 1;
    $scope.mapEmbed = '';
	$scope.host_id = $routeParams.host_id;

	// Check if user is logged
    if ($cookies.get('user_type_id') <= 4){
		//user is correct
	}else{
		$location.path('/login');
	}

	//Get Host Function
	$scope.get_host = function(){
		$http({
			method: 'POST',
			url: api_url+'get_host',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'host_id':$scope.host_id
			}
		}).then(function successCallback(response) {

			$scope.host = response.data.host;	
			//load the map to mapview div
			$('.map-view-frame').html($scope.host.google_map_embed);

		});
	}
	$scope.get_host();
});