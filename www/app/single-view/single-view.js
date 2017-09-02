app.controller('appsingleViewController', function($scope, $http, $cookies, $location, $routeParams, $window,$timeout) {
    $scope.$parent.hideNav = 1;
	$scope.event_id = $routeParams.event_id;
    $scope.event = '';
    $scope.host = '';
    $scope.modalExit = 0;
	$scope.$parent.isDesktop = 0;

    $scope.modalView = function() {
        $scope.modalExit = 0;
		$scope.modalDisplay = 1;
    }
    $scope.modalHide = function() {
        $scope.modalExit = 1;
        $timeout(function () { 
            $scope.modalDisplay = 0;
        }, 250);
	}
    // Check if user is logged
    if ($cookies.get('user_type_id') <= 4){
		//user is correct
	}else{
		$location.path('/login');
	}

    $http({
        method: 'POST',
        url: api_url+'get_event',
        data:{
            'user_id':$cookies.get('user_id'),
            'hash':$cookies.get('hash'),
            'event_id':$scope.event_id
        }
    }).then(function successCallback(response) {
        $scope.event = response.data.event;
        
        $scope.getHost($scope.event.host_id);

    });

    $scope.getHost = function(bkbjkhbhb) {
        $http({
            method: 'POST',
            url: api_url+'get_host',
            data:{
                'user_id':$cookies.get('user_id'),
                'hash':$cookies.get('hash'),
                'host_id':bkbjkhbhb
            }
        }).then(function successCallback(response) {
            
            $scope.host = response.data.host;
            console.log($scope.host);
            //load the map to mapview div
            $('.mapview-host').html($scope.host.google_map_embed);

        });
    }
    
    $scope.changeSiteFacebook = function() {
        $window.location.href = $scope.host.facebook;
    }
    $scope.changeSiteInstagram = function() {
        $window.location.href = $scope.host.instagram;
    }
    $scope.changeSiteTwitter = function() {
        $window.location.href = $scope.host.twitter;
    }

});