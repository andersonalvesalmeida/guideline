'use strict';

angular
  .module('app', ['ngRoute', 'app.controllers'])
  .config(['$provide', '$routeProvider'
    , function ($provide, $routeProvider) {

    $routeProvider
      .when('/', {
        redirectTo: '/home'
      })
      .when('/:menu', {
        templateUrl: function (params) {
          return 'views/' + params.menu + '.html';
        }
      })
  }]);

angular.bootstrap(document, ['app']);