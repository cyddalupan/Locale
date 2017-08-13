app.controller('hostadminController', function($scope, $cookies, $location, $http) {
    $scope.$parent.hideNav = 1;
    $scope.getAdmin = '';

    // Check if user is logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}
    
    // Get all Host admin
    $scope.getAllhost = function(){
        $http({
			method: 'POST',
			url: api_url+'all_host',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash')
			}
		}).then(function successCallback(response) {
            $scope.getHost = response.data.users;
            console.log(response);
        });
    }

    $scope.deleteHost = function(user_id){
		if(confirm('Are you sure you want to Delete?')){
			$http({
				method: 'POST',
				url: api_url+'delete_user',
				data: {
					'user_id':$cookies.get('user_id'),
					'hash':$cookies.get('hash'),
					'get_user_id':user_id
				}
			}).then(function successCallback(response) {
				console.log(response);
				$scope.getAllhost();
			});
		}
	}
    $scope.getAllhost()
});
