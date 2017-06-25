app.controller('categoriesadminController', function($scope, $http, $cookies) {
	$scope.$parent.hideNav = 1;
	$scope.categories = '';

    // Check if user is logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}

	//Get all Categories
	$scope.getCategories = function(){
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
	}

	//Delete category button
	$scope.deleteCategory = function(category_id){
		if(confirm('Are you sure you want to Delete?')){
			$http({
				method: 'POST',
				url: api_url+'delete_category',
				data: {
					'user_id':$cookies.get('user_id'),
					'hash':$cookies.get('hash'),
					'category_id':category_id
				}
			}).then(function successCallback(response) {
				console.log(response);
				$scope.getCategories();
			});
		}
	}
	$scope.getCategories();
});
