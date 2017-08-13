app.controller('editEventHostController', function($scope, $http, $cookies, $location, $routeParams) {
    $scope.$parent.hideNav = 1;
    $scope.mapEmbed = '';
	$scope.host_id = $routeParams.host_id;

	// Check if user is logged
    if ($cookies.get('user_type_id') < 4){
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
			$('.mapview-host').html($scope.host.google_map_embed);

		});
	}
	$scope.get_host();
	
	//Save host Function
	$scope.msg = '';
    $scope.editHost = function () {
       $http({
			method: 'POST',
			url: api_url+'edit_host',
			data:{
                'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'host_id':$scope.host_id,
				'name':$scope.host.name,
				'img_url':$scope.host.img_url,
				'facebook':$scope.host.facebook,
				'instagram':$scope.host.instagram,
				'twitter':$scope.host.twitter,
				'short_description':$scope.host.short_description,
				'long_description':$scope.host.long_description,
				'google_map_embed':$scope.host.google_map_embed
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
	
	//Map onchange
	$scope.mapChange = function () {
		$('.mapview-host').html($scope.host.google_map_embed);
	}
});
