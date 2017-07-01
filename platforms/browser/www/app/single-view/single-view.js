app.controller('appsingleViewController', function($scope, $http, $cookies, $location, $routeParams) {
    $scope.$parent.hideNav = 1;
	$scope.event_id = $routeParams.event_id;
    $scope.event = '';
    $scope.host = '';

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
        console.log(response);
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
            //load the map to mapview div
            $('.mapview-host').html($scope.host.google_map_embed);

        });
    }
    console.log($scope.host)
});