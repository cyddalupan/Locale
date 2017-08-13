app.controller('editLocaleuserController', function($scope, $http, $cookies, $location, $routeParams) {
    $scope.$parent.hideNav = 1;
	$scope.locale_user = $routeParams.locale_user;
    // Check if user is logged
    if ($cookies.get('user_type_id') < 2){
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
				'get_user_id':$scope.locale_user
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
