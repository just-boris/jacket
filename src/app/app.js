/*global angular*/
angular.module('jacket', [
    'jacket.config',
    'jacket.templates',
    'ngRoute',
    'ui.bootstrap'
]);

angular.module('jacket').config(['$routeProvider', function ($routeProvider) {
    "use strict";
    $routeProvider.when('/', {templateUrl: 'templates/app/home.tpl.html'});
    $routeProvider.otherwise({template: '404'});
}]);
angular.module('jacket.config', []).constant('apiUrl', '/api/json/');
