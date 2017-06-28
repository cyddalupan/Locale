app.controller('hostadminController', function($scope, $http, $cookies, $location) {
    $scope.$parent.hideNav = 1;
    $scope.getHosts = '';

    // Check if user is logged
    if ($cookies.get('user_type_id') < 4){
		//user is correct
	}else{
		$location.path('/login');
	}

	//
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

	//
    $scope.deleteHost = function(host_id){
		if(confirm('Are you sure you want to Delete?')){
			$http({
				method: 'POST',
				url: api_url+'delete_host',
				data: {
					'user_id':$cookies.get('user_id'),
					'hash':$cookies.get('hash'),
					'host_id':host_id
				}
			}).then(function successCallback(response) {
				console.log(response);
				$scope.getAllhost();
			});
		}
	}
    $scope.getAllhost()

});
