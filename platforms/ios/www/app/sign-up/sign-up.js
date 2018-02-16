app.controller('appsignUpController', function($scope, $location, $http) {
    $scope.$parent.hideNav = 1;
    $scope.register = '';
	$scope.$parent.isDesktop = 0;


    $scope.register_user = function(){
		$scope.register.email = $scope.register.username;
		$scope.register.fullname = $scope.register.username;
		$scope.register.img = $scope.register.username;
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
            console.log(response);
		});
	}
});