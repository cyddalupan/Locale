app.controller('categoriesController', function($scope, $cookies, $http, $location) {
	$scope.$parent.hideNav = 0;
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
	});


});
