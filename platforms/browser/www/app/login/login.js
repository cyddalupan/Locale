app.controller('apploginController', function($scope, $http, $location, $cookies, $timeout) {
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
                $scope.loginAlertMessage=false;
                $(".error-message-shell").show();
                $(".error-message-shell").fadeOut(4000);
                $timeout(function () { 
                    $scope.loginAlertMessage = true;
                }, 4000);  
            } else {
                //Put this info when user is logged
                $cookies.put('user_id',response.data.user_id);
                $cookies.put('user_type_id',response.data.user_type_id);
                $cookies.put('hash',response.data.hash);
                $cookies.put('fullname',response.data.fullname);
                $cookies.put('img',response.data.img);
                if (response.data.user_type_id < 4){
                    $location.path('/cms-home');
                    $scope.$parent.adminOnly = 1;
                }else {
                    if (response.data.user_type_id = 4){
                        $location.path('/');
                        $scope.$parent.adminOnly = 0;
                    }
                }
            }


            console.log(response.data);

		}, function errorCallback(response) {
			console.log(response);
		});
	}
    $scope.visitPage = function(){
        $location.path('/sign-up')
    }

});