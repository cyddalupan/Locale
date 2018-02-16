app.controller('addcategoriesadminController', function($scope, $http, $cookies, $location, screenSize) {
    $scope.$parent.hideNav = 1;
    $scope.msg = '';
    $scope.$parent.isDesktop = screenSize.onChange($scope, 'md, sm, lg', function(isMatch){
		$scope.isDesktop = isMatch;
	});
    // Check if user is logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}

    // Create Category
    $scope.addCategory = function () {
       $http({
			method: 'POST',
			url: api_url+'create_category',
			data:{
                'user_id':$cookies.get('user_id'),
				'name':$scope.name,
				'img_url':$scope.img_url,
				'hash':$cookies.get('hash')
			}
		}).then(function successCallback(response) {

            if (response.data.result == 'failed') {
                $scope.msg = response.data.message;
            } else {
                alert(response.data.message);
                $location.path('/categoriesadmin');
            }
                console.log(response)
		}, function errorCallback(response) {

		});
    }
    

});
