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
			$scope.create_admin();

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
			$scope.create_admin();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.created_admin_id = 0;
	$scope.create_admin = function(){
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
				'password_confirmation':'12345',
				'fullname':'sample full name',
				'email':'sample_email_'+$scope.currdate+'@gmail.com',
				'img' : 'api/public/seed/user/1.jpg'
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
				Title: 'Create an admin',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.created_admin_id = response.data.user.id;
			$scope.create_admin_failed_by_same_username();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.create_admin_failed_by_same_username = function(){
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
				'password_confirmation':'12345',
				'fullname':'sample full name',
				'email':'sample_email_'+$scope.currdate+'@gmail.com'
			}
		}).then(function successCallback(response) {

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
				Title: 'Create an admin failed same username',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.get_user();

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
				'get_user_id':$scope.created_admin_id,
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
				Title: 'Get one user only',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.edit_admin();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.edit_admin = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'edit_user',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'get_user_id':$scope.created_admin_id,
				'username':'admin_'+$scope.currdate,
				'fullname':'sample full name edited',
				'email':'sample_email_edited'+$scope.currdate+'@gmail.com',
				'img' : 'api/public/seed/user/1.jpg'
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
				Title: 'Edit Admin',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.delete_admin();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.delete_admin = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'delete_user',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'get_user_id':$scope.created_admin_id
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
				Title: 'Delete admin',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.logout_super_admin();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.logout_super_admin = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'logout',
			data:{
				'user_id':$cookies.get('user_id')
			}
		}).then(function successCallback(response) {

			//delete cookie on logout
			$cookies.remove('user_id');
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
				Title: 'Logout Super Admin User',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.wrong_username_test();
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
			if(response.data.message == 'The selected username is invalid.'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
			$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Login. Wrong Username Test',
				SampOutput: response.data,
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
			if(response.data.message == 'Password incorrect.'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Login. Wrong Username Test',
				SampOutput: response.data.message,
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
				'name':'test_category'+$scope.currdate,
				'img_url':'http://localhost/phonegap/locale/www/api/public/seed/user/8.jpg'
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message == 'test_category'+$scope.currdate+' category added.'){
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
			$scope.get_category(response.data.category_id);
		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.get_category = function(category_id){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'get_category',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'category_id':category_id
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
				Title: 'Get Single Category',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.update_category(category_id);
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
				'name':'test_category_edited'+$scope.currdate,
				'img_url':'api/public/seed/user/5.jpg'
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message == 'test_category_edited'+$scope.currdate+' category updated.'){
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
				'name':'test_category_edited'+$scope.currdate
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message == 'The name has already been taken.'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Same Category name should fail',
				SampOutput: response.data.message,
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
			if(response.data.message == 'category test_category_edited'+$scope.currdate+' deleted.'){
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
			url: api_url+'logout',
			data:{
				'user_id':$cookies.get('user_id')
			}
		}).then(function successCallback(response) {

			//delete cookie on logout
			$cookies.remove('user_id');
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
			$scope.create_host_blank_name_should_fail();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.create_host_blank_name_should_fail = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'create_host',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'name':'',
				'img_url':'test_category',
				'short_description':'test_category',
				'long_description':'test_category',
				'google_map_embed':'test_category'
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message == 'The name field is required.'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Create host blank name should fail.',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.create_host();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.test_host_id = 0;
	$scope.create_host = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'create_host',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'name':'test host'+$scope.currdate,
				'img_url':'http://localhost/phonegap/locale/www/api/public/seed/event/7.jpg',
				'short_description':'short desc tes',
				'long_description':'long desc to text',
				'google_map_embed':'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.588934923989!2d121.02531531454524!3d14.565483989824811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9073750cc15%3A0xc3a53c8ba2ae6cc0!2sCentury+City+Mall!5e0!3m2!1sen!2sph!4v1497205778482" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'
			}
		}).then(function successCallback(response) {

			//save test host id
			$scope.test_host_id = response.data.host.id;

			//manage result
			if(response.data.message == 'test host'+$scope.currdate+' created'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Create host.',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.edit_host();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.edit_host = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'edit_host',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'host_id':$scope.test_host_id,
				'name':'edited test host'+$scope.currdate,
				'img_url':'http://localhost/phonegap/locale/www/api/public/seed/event/7.jpg',
				'short_description':'edited short desc tes',
				'long_description':'edited long desc to text',
				'google_map_embed':'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.588934923989!2d121.02531531454524!3d14.565483989824811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9073750cc15%3A0xc3a53c8ba2ae6cc0!2sCentury+City+Mall!5e0!3m2!1sen!2sph!4v1497205778482" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message == 'edited test host'+$scope.currdate+' updated'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Edit host.',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.get_single_host();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.get_single_host = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'get_host',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'host_id':$scope.test_host_id,
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message == 'get edited test host'+$scope.currdate+' from host'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Get single host',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.delete_host();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.delete_host = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'delete_host',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'host_id':$scope.test_host_id,
			}
		}).then(function successCallback(response) {
			//manage result 
			if(response.data.message == 'edited test host'+$scope.currdate+' deleted'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Delete host',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.get_all_host();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.get_all_host = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'get_all_host',
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
				Title: 'Get all host',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.logout_host_user();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}


	$scope.logout_host_user = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'logout',
			data:{
				'user_id':$cookies.get('user_id')
			}
		}).then(function successCallback(response) {

			//delete cookie on logout
			$cookies.remove('user_id');
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
				Title: 'Logout host User',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.login_admin_to_create_event();
		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}


	$scope.login_admin_to_create_event = function(){
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
				Title: 'Login admin admin to create event',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.create_event_failed_date();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.test_event_id = 0;
	$scope.create_event_failed_date = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'create_event',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'event_name':'test event',
				'img_url':'http://localhost/phonegap/locale/www/api/public/seed/event/10.jpg',
				'short_description':'short desc test',
				'long_description':'long <strong>description</stong>',
				'category_id':5,
				'host_id':5,
				'position_sort':5,
				'event_date':'wrong date',
				'is_featured':0
			}
		}).then(function successCallback(response) {
			//manage result
			if(response.data.message == 'The event date is not a valid date.'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Create event Failed date',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.create_event_success();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.create_event_success = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'create_event',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'event_name':'test event',
				'img_url':'http://localhost/phonegap/locale/www/api/public/seed/event/10.jpg',
				'short_description':'short desc test',
				'long_description':'long <strong>description</stong>',
				'category_id':5,
				'host_id':5,
				'position_sort':5,
				'event_date':'2018-08-10',
				'is_featured':0
			}
		}).then(function successCallback(response) {

			$scope.test_event_id = response.data.event.id;

			//manage result
			if(response.data.message == 'test event created'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Create event Success',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.edit_event();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.edit_event = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'edit_event',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'event_id':$scope.test_event_id,
				'event_name':'edited test event',
				'img_url':'http://localhost/phonegap/locale/www/api/public/seed/event/10.jpg',
				'short_description':'short desc test',
				'long_description':'long <strong>description</stong>',
				'category_id':5,
				'host_id':5,
				'position_sort':5,
				'event_date':'2018-08-20',
				'is_featured':0
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message == 'edited test event updated'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Edit event.',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.get_single_event();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.get_single_event = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'get_event',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'event_id':$scope.test_event_id
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message == 'edited test event selected'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Get single event',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.change_event_position();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.change_event_position = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'change_position',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'event_id':$scope.test_event_id,
				'position_sort':98

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
				Title: 'Change event position',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);
			//call next test
			$scope.delete_event();
		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.delete_event = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'delete_event',
			data:{
				'user_id':$cookies.get('user_id'),
				'hash':$cookies.get('hash'),
				'event_id':$scope.test_event_id
			}
		}).then(function successCallback(response) {

			//manage result
			if(response.data.message == 'edited test event deleted'){
				testR = "Success";
				$scope.SuccessCount++;
			}else{
				testR = "Failed";
				$scope.FailedCount++;
			}

			//Add to array
			arrayText = {
				Title: 'Delete event',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			$scope.all_events();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	$scope.all_events = function(){
		//count test
		$scope.testCount++;
		//run API
		$http({
			method: 'POST',
			url: api_url+'all_events',
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
				Title: 'Get all events',
				SampOutput: response.data.message,
				result: testR,
			};
			$scope.atr.push(arrayText);

			//call next test
			//$scope.change_event_position();

		}, function errorCallback(response) {
			$scope.FailedCount++;
			console.log(response);
		});
	}

	
//start from super admin account
	//$scope.login_super_admin();
//start from admin account
	//$scope.wrong_username_test();
//start from host account
	//$scope.login_host_user();
//start from creating event
	$scope.login_admin_to_create_event();
});