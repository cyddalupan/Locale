app.controller('addEventHostController', function($scope, $http, $cookies, $location, screenSize) {
    $scope.$parent.hideNav = 1;
    $scope.mapEmbed = '';
	$scope.host = '';
	$scope.$parent.isDesktop = screenSize.onChange($scope, 'md, sm, lg', function(isMatch){
		$scope.isDesktop = isMatch;
	});
	// Check if user is logged
    if ($cookies.get('user_type_id') < 4){
		//user is correct
	}else{
		$location.path('/login');
	}

	
	//Save host Function
	$scope.msg = '';
    $scope.addHost = function () {
       $http({
			method: 'POST',
			url: api_url+'create_host',
			data:{
                'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'host_id':$scope.host_id,
				'name':$scope.host.name,
				'img_url':$scope.host.img_url,
				'facebook':$scope.host.facebook,
				'instagram':$scope.host.instagram,
				'twitter':$scope.host.twitter,
				'short_description':$scope.host.short_description,
				'long_description':$scope.host.long_description,
				'google_map_embed':$scope.host.google_map_embed
			}
		}).then(function successCallback(response) {
            console.log(response)
            if (response.data.result == 'failed') {
                $scope.msg = response.data.message;
            } else {
                alert(response.data.message);
            }
		}, function errorCallback(response) {

		});
    }
	
	// Map View onchange
	$scope.mapChange = function () {
		$('.mapview-host').html($scope.host.google_map_embed);
	}
});
