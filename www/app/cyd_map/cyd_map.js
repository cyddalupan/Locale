app.controller('cydMapController', function($scope,$http,$cookies) {

	$scope.mapEmbed = '';

	$scope.get_host = function(){
		//count test
		$scope.testCount++;
		//run API
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
			$('.mapview').html($scope.mapEmbed);

		}, function errorCallback(response) {
			console.log(response);
		});
	}
	$scope.get_host();
});