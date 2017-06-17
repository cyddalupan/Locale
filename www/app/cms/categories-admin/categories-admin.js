app.controller('categoriesadminController', function($scope, $http, $cookies) {
	    $scope.categories = '';

		$scope.getCategories = function(){
			$http({
				method: 'POST',
				url: api_url+'all_category'
			}).then(function successCallback(response) {
				$scope.categories = response.data.categories;
			});
		}
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
