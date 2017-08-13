app.controller('editLocaleadminController', function($scope, $http, $cookies, $location, $routeParams) {
    $scope.$parent.hideNav = 1;
	$scope.locale_admin = $routeParams.locale_admin;
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
				'get_user_id':$scope.locale_admin
			}
		}).then(function successCallback(response) {
			$scope.admin = response.data.user;
			console.log($scope.admin)
		});
	}
	$scope.get_user();

	//Save admin Function
	$scope.msg = '';
    $scope.editAdmin = function () {
       $http({
			method: 'POST',
			url: api_url+'edit_user',
			data:{
                'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'get_user_id':$scope.admin.id,
				'username':$scope.admin.username,
				'password':$scope.admin.password,
				'password_confirmation':$scope.admin.password_confirmation,
				'fullname':$scope.admin.fullname,
				'email':$scope.admin.email,
				'img':$scope.admin.img,
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
