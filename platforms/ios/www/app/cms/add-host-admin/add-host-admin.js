app.controller('addHostadminController', function($scope, $http, $cookies, $location, screenSize) {
    $scope.$parent.hideNav = 1;
    $scope.host = '';
	$scope.$parent.isDesktop = screenSize.onChange($scope, 'md, sm, lg', function(isMatch){
		$scope.isDesktop = isMatch;
	});
    // Check if user is logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}

	//Save Button
	$scope.msg = '';
    $scope.addHostadmin = function () {
       $http({
			method: 'POST',
			url: api_url+'create_host_user',
			data:{
                'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'username':$scope.host.username,
				'password':$scope.host.password,
				'password_confirmation':$scope.host.password_confirmation,
				'fullname':$scope.host.fullname,
				'email':$scope.host.email,
				'img':$scope.host.img
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
