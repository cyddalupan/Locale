app.controller('cydTestController', function($scope,$http,$cookies) {
	
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

			//call next test
			$scope.admin_login();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.admin_login = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'login',
			data:{
				'username':'user_2',
				'password':'12345'
			}
		}).then(function successCallback(response) {

			//Put this info when user is logged
			$cookies.put('user_id',response.data.user_id);
			$cookies.put('user_type_id',response.data.user_type_id);
			$cookies.put('hash',response.data.hash);
			$cookies.put('fullname',response.data.fullname);
			$cookies.put('img',response.data.img);

			//manage result
			if(response.data.message == 'User Logged'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Admin Login',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.insert_category_wrong_hash();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.insert_category_wrong_hash = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'create_category',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':'incorrecthash',
				'name':'test_category'
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message == 'invalid user'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Insert category wrong hash',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.create_category();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.create_category = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'create_category',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'name':'test_category'
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message == 'test_category category added.'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Create Category',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.update_category(response.data.category_id);
		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.update_category = function(category_id){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'update_category',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'category_id':category_id,
				'name':'test_category_edited'
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message == 'test_category_edited category updated.'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Update Category',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}
	
	//run first test
	$scope.wrong_username_test();

});