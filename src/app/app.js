/*global angular*/
angular.module('jacket', [
    'jacket.home',
    'jacket.config',
    'jacket.templates',
    'jacket.jenkins',
    'ngRoute',
    'ui.bootstrap'
]);

angular.module('jacket').config(['$routeProvider', function ($routeProvider) {
    "use strict";
    $routeProvider.otherwise({template: '404'});
}]);
angular.module('jacket.config', []).constant('apiUrl', '/jenkins');
