app.controller('addLocaleadminController', function($scope, $http, $cookies, $location) {
    $scope.$parent.hideNav = 1;
    
    // Check if user is logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}

	//Save Button
	$scope.msg = '';
    $scope.addAdmin = function () {
       $http({
			method: 'POST',
			url: api_url+'create_host',
			data:{
                'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'host_id':$scope.host_id,
				'name':$scope.host.name,
				'img_url':$scope.host.img_url,
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
	
});
