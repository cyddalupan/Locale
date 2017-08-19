app.controller('addLocaleuserController', function($scope, $http, $cookies, $location) {
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
			url: api_url+'register_user',
			data:{
                'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'username':$scope.admin.username,
				'password':$scope.admin.password,
				'password_confirmation':$scope.admin.password_confirmation,
				'fullname':$scope.admin.fullname,
				'email':$scope.admin.email,
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
	
});
