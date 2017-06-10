app.controller('cydTestController', function($scope,$http,$cookies) {
	
	$scope.Status = 'Test Started';
	$scope.atr = [];
	//counts
	$scope.testCount = 0;
	$scope.SuccessCount = 0;
	$scope.FailedCount = 0;

	//current date
	$scope.currdate = new Date().getTime();

	$scope.login_super_admin = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'login',
			data:{
				'username':'user_1',
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
				Title: 'Login super admin.',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.get_all_admin();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.get_all_admin = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'all_admin',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash')
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.result == 'success'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Get all admin',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.create_admin_wrong_password_confirmation();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.create_admin_wrong_password_confirmation = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'create_admin',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'username':'admin_'+$scope.currdate,
				'password':'12345',
				'password_confirmation':'123456',
				'fullname':'sample full name',
				'email':'sample_email_'+$scope.currdate+'@gmail.com',
				'img':'api/public/seed/user/5.jpg'
			}
		}).then(function successCallback(response) {

			console.log(response);

			//manage result
			if(response.data.result == 'failed'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Create an admin with wrong password confirmation',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			//$scope.insert_category_wrong_hash();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.get_user = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'get_user',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'get_user_id':5,
			}
		}).then(function successCallback(response) {

			console.log(response);

			//manage result
			if(response.data.result == 'success'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Get one user only',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			//$scope.insert_category_wrong_hash();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

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
			$scope.get_all_category();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.get_all_category = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'all_category',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash')
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.result == 'success'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Get all category',
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
			$scope.same_category_should_fail(category_id);

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.same_category_should_fail = function(category_id){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'create_category',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'name':'test_category_edited'
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message.name[0] == 'The name has already been taken.'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Same Category name should fail',
				SampOutput: response.data.message.name[0],
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.delete_category(category_id);
		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.delete_category = function(category_id){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'delete_category',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'category_id':category_id
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message == 'category test_category_edited deleted.'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Delete category',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.logout_admin();
		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.logout_admin = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'logout'
		}).then(function successCallback(response) {

			//delete cookie on logout
			$cookies.remove('user_i');
			$cookies.remove('hash');

			//manage result
			if(response.data.message == 'User Logout.'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Logout Admin User',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.login_host_user();
		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.login_host_user = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'login',
			data:{
				'username':'user_3',
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
				Title: 'Login host user',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.host_should_fail_creating_category();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.host_should_fail_creating_category = function(){
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
			if(response.data.message == 'invalid user'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Host should fail creating category.',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			//$scope.insert_category_wrong_hash();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}
	
//start from super admin account
	$scope.login_super_admin();
//start from admin account
	//$scope.wrong_username_test();
//start from host account
	//$scope.login_host_user();

});