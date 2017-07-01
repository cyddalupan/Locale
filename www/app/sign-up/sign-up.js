app.controller('appsignUpController', function($scope, $location, $http) {
    $scope.$parent.hideNav = 1;
    $scope.register = '';


    $scope.register_user = function(){
		$http({
			method: 'POST',
			url: api_url+'register_user',
			data:{
				'username':$scope.register.username,
				'password':$scope.register.password,
				'password_confirmation':$scope.register.password_confirmation,
				'fullname':$scope.register.fullname,
				'email':$scope.register.email,
				'img' : $scope.register.img
			}
		}).then(function successCallback(response) {

            console.log(response)
			$scope.register_user_id = response.data.user.id;


		});
	}
});