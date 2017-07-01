app.controller('editcategoriesadminController', function($scope, $http, $cookies, $location, $routeParams) {
    $scope.category = '';
    $scope.category_id = $routeParams.category_id;
    $scope.$parent.hideNav = 1;

    //Check if user logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}

    //Get single category
    $http({
        method: 'POST',
        url: api_url+'get_category',
        data: {
            'user_id':$cookies.get('user_id'),
            'hash':$cookies.get('hash'),
            'category_id':$scope.category_id
        }
    }).then(function successCallback(response) {
        
        $scope.category = response.data.category;
        console.log($scope.category);
    });

    // Save edit Category function
    $scope.editCategory = function(){
        $http({
			method: 'POST',
			url: api_url+'update_category',
			data:{
                'user_id':$cookies.get('user_id'),
                'hash':$cookies.get('hash'),
				'name':$scope.category.name,
				'img_url':$scope.category.img_url,
                'category_id':$scope.category_id
			}
		}).then(function successCallback(response) {

            if (response.data.result == 'failed') {
                $scope.msg = response.data.message;
            } else {
                alert(response.data.message);
                $location.path('/categoriesadmin');
            }
                console.log(response) 
		});
    }
});
