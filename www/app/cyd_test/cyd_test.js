app.controller('cydTestController', function($scope,$http) {
	
	$scope.Status = 'Test Started';
	$scope.atr = [];
	//counts
	$scope.testCount = 0;
	$scope.SuccessCount = 0;
	$scope.FailedCount = 0;

	$scope.wrong_username_test = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'login',
			data:{
				'username':'firstblood21',
				'password':'pass123'
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message.username[0] == 'The selected username is invalid.'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
			$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Login. Wrong Username Test',
				SampOutput: response.data.message.username[0],
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.wrong_password_test();

		}, function errorCallback(response) {

			$scope.FailedCount++;
			console.log(response);
		});
	}


	$scope.wrong_password_test = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'login',
			data:{
				'username':'user_1',
				'password':'51232312'
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message.password[0] == 'Password incorrect.'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Login. Wrong Username Test',
				SampOutput: response.data.message.password[0],
				result: testR,
			};
			$scope.atr.push(arrayText);
			console.log(response);

			//call next test
		}, function errorCallback(response) {

			$scope.FailedCount++;
			console.log(response);
		});
	}
	
	//run first test
	$scope.wrong_username_test();

});