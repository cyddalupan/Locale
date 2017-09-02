app.controller('categoriesController', function($scope, $cookies, $http, $location) {
	$scope.$parent.hideNav = 0;
	$scope.$parent.isDesktop = 0;
	// Check if user is logged
    if ($cookies.get('user_type_id') <= 4){
		//user is correct
	}else{
		$location.path('/login');
	}

	//Get all Categories
	$http({
		method: 'POST',
		url: api_url+'all_category',
		data: {
			'user_id':$cookies.get('user_id'),
			'hash':$cookies.get('hash')
		}
	}).then(function successCallback(response) {
		$scope.categories = response.data.categories;
		console.log($scope.categories)
	});


});
