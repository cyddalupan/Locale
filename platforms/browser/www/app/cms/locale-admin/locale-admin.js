app.controller('localeadminController', function($scope, $http, $cookies, $location) {
    $scope.$parent.hideNav = 1;
    $scope.getAdmin = '';

    // Check if user is logged
    if ($cookies.get('user_type_id') < 2){
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
            console.log(response);
        });
    }

    $scope.deleteHost = function(admin_id){
		if(confirm('Are you sure you want to Delete?')){
			$http({
				method: 'POST',
				url: api_url+'delete_user',
				data: {
					'user_id':$cookies.get('user_id'),
					'hash':$cookies.get('hash'),
					'get_user_id':admin_id
				}
			}).then(function successCallback(response) {
				console.log(response);
				$scope.getAlladmin();
			});
		}
	}
    $scope.getAlladmin()
});
