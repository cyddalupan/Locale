app.controller('addHostadminController', function($scope, $http, $cookies, $location) {
    $scope.$parent.hideNav = 1;
    $scope.mapEmbed = '';

	// Check if user is logged
    if ($cookies.get('user_type_id') < 4){
		//user is correct
	}else{
		$location.path('/login');
	}

	
	//Save host Function
	$scope.msg = '';
    $scope.addHost = function () {
       $http({
			method: 'POST',
			url: api_url+'create_admin',
			data:{
                'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'host_id':$scope.host_id,
				'username':$scope.host.name,
				'password':$scope.host.img_url,
				'password_confirmation':$scope.host.short_description,
				'fullname':$scope.host.long_description,
				'email':$scope.host.google_map_embed,
				'img':$scope.admin.img
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
	
	// Map View onchange
	$scope.mapChange = function () {
		$('.mapview-host').html($scope.host.google_map_embed);
	}
});
