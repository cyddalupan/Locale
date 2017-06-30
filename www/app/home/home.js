app.controller('homeController', function($scope, $http, $cookies, $location) {
	
	$scope.events = '';


	$http({
		method: 'POST',
		url: api_url+'all_events',
		data:{
			'user_id':$cookies.get('user_id'),
			'hash':$cookies.get('hash')
		}
	}).then(function successCallback(response) {
		$scope.events = response.data.events;
		console.log(response);
	});
});