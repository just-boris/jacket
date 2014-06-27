angular.module('jacket.jenkins', ['ngResource']).factory('jenkins', ['$resource', '$http', '$q', '$route', '$modal', 'apiUrl', function($resource, $http, $q, $route, $modal, apiUrl) {
    "use strict";
    function authorize() {
        return $modal.open({
            templateUrl: 'templates/common/services/login.tpl.html',
            controller: 'LoginCtrl'
        }).result;
    }
    function addAuthHeader(data, headersGet) {
        headersGet().Authorization = auth;
        return data;
    }
    function getAuth(data) {
        return 'Basic ' + btoa(data.login + ':' + data.password);
    }
    function url(base) {
        return apiUrl + base + '/api/json';
    }
    var auth;
    var interceptor = {
        responseError: function(response) {
            if(response.status === 403) {
                authorize().then(function(data) {
                    auth = getAuth(data);
                    $route.reload();
                });
            }
            return $q.reject(response);
        }
    };
    var jenkins = $resource(url(''), {}, {
        'get':    {method:'GET', transformRequest: addAuthHeader, interceptor: interceptor},
        'me':  {method: 'GET', url: url('/me'), transformRequest: addAuthHeader, interceptor: interceptor}
    });
    jenkins.login = function(auth) {
        return $http.get(url('/me'), {transformRequest: function(data, headersGet) {
            headersGet().Authorization = getAuth(auth);
            return data;
        }}).then(function(response) {
            return response.data;
        });
    };
    return jenkins;
}]).controller('LoginCtrl', ['$scope', 'jenkins', function($scope, jenkins) {
    "use strict";
    $scope.login = function() {
        jenkins.login($scope.data).then(function() {
            $scope.$close($scope.data);
        }, function() {
            $scope.loginError = true;
        });
    };
    $scope.data = {};
}]);
