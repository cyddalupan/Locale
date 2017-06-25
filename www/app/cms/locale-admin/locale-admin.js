app.controller('localeadminController', function($scope, $http, $cookies) {
    $scope.$parent.hideNav = 1;
    $scope.getAdmin = '';

    // Check if user is logged
    if ($cookies.get('user_type_id') = 1){
		//user is correct
	}else{
		$location.path('/login');
	}
    
    // Get all admin
    $scope.getAlladmin = function(){
        $http({
			method: 'POST',
			url: api_url+'all_admin',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash')
			}
		}).then(function successCallback(response) {
            $scope.getAdmin = response.data.users;
            console.log($scope.getAdmin);
        });
    }
    $scope.getAlladmin()
});
