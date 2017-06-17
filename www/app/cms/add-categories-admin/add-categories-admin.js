app.controller('addcategoriesadminController', function($scope, $http, $cookies, $location) {
    $scope.msg = '';
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
