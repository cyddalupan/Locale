app.controller('editHostadminController', function($scope, $http, $cookies, $location) {
    $scope.$parent.hideNav = 1;
    $scope.mapEmbed = '';

	// Check if user is logged
    if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}

	//Get Host Function
	$scope.get_host = function(){
		$http({
			method: 'POST',
			url: api_url+'get_host',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'host_id':1,
			}
		}).then(function successCallback(response) {

			console.log(response);			

			$scope.mapEmbed = response.data.host.google_map_embed;
			//load the map to mapview div
			$('.mapview-host').html($scope.mapEmbed);

		}, function errorCallback(response) {
			console.log(response);
		});
	}
	$scope.get_host();
	
	//Save host Function
	$scope.msg = '';
    $scope.addHost = function () {
       $http({
			method: 'POST',
			url: api_url+'create_host',
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
