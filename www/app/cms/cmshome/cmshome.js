app.controller('cmshomeController', function($scope, $location, $cookies) {
	if ($cookies.get('user_type_id') < 3){
		//user is correct
	}else{
		$location.path('/login');
	}
});