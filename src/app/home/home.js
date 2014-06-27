angular.module('jacket.home', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
    "use strict";
    $routeProvider.when('/', {
        templateUrl: 'templates/app/home/home.tpl.html',
        controller: 'HomeCtrl',
        resolve: {
            home: ['jenkins', function(jenkins) {
                return jenkins.get().$promise;
           }]
        }
    });
}]).controller('HomeCtrl', ['$scope', 'home', function($scope, home) {
    "use strict";
    $scope.data = home;
}]);
