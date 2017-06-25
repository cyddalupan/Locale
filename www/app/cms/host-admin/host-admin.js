app.controller('hostadminController', function($scope, $http, $cookies) {
    $scope.$parent.hideNav = 1;
    $scope.getHosts = '';
    // Check if user is logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}
    $scope.getAllhost = function(){
        $http({
			method: 'POST',
			url: api_url+'get_all_host',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash')
			}
		}).then(function successCallback(response) {
            $scope.getHosts = response.data.hosts;
            console.log(response);
        });
    }
    $scope.getAllhost()
});
