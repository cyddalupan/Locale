app.controller('editHostadminController', function($scope, $http, $cookies, $location, $routeParams, screenSize) {
    $scope.$parent.hideNav = 1;
	$scope.host_id = $routeParams.host_id;
	$scope.$parent.isDesktop = screenSize.onChange($scope, 'md, sm, lg', function(isMatch){
		$scope.isDesktop = isMatch;
	});
    // Check if user is logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}

	//Get user Function
	$scope.get_user = function(){
		$http({
			method: 'POST',
			url: api_url+'get_user',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'get_user_id':$scope.host_id
			}
		}).then(function successCallback(response) {
			$scope.user = response.data.user;
			console.log($scope.user)
		});
	}
	$scope.get_user();

	//Save guest Function
	$scope.msg = '';
    $scope.editGuest = function () {
       $http({
			method: 'POST',
			url: api_url+'edit_user',
			data:{
                'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'get_user_id':$scope.user.id,
				'username':$scope.user.username,
				'password':$scope.user.password,
				'password_confirmation':$scope.user.password_confirmation,
				'fullname':$scope.user.fullname,
				'email':$scope.user.email,
				'img':$scope.user.img,
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
