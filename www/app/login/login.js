app.controller('apploginController', function($scope, $http, $location, $cookies) {
   $scope.$parent.hideNav = 1;
   $scope.errormsg = '';

   $scope.loginS = function () {
       $http({
			method: 'POST',
			url: api_url+'login',
			data:{
				'username':$scope.username,
				'password':$scope.password
			}
		}).then(function successCallback(response) {
            if (response.data.result == 'failed') {
                $scope.errormsg = response.data.message;
            } else {
                //Put this info when user is logged
                $cookies.put('user_id',response.data.user_id);
                $cookies.put('user_type_id',response.data.user_type_id);
                $cookies.put('hash',response.data.hash);
                $cookies.put('fullname',response.data.fullname);
                $cookies.put('img',response.data.img);
                if (response.data.user_type_id == 2){
                    $location.path('/cms-home');
                }else {

                }
            }


            console.log(response.data);

		}, function errorCallback(response) {
			console.log(response);
		});
	}
});