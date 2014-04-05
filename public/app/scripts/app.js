'use strict';

angular
      .module('basicbussines',[
          'ngCookies',
          'ngResource',
          'ngSanitize',
          'ngRoute',
          'ui.bootstrap',
          'security',
      ])
      .config(function($routeProvider){
          $routeProvider
                .when('/',{
                    templateUrl : '../views',
                    controller : 'MainCtrl'
                })
                .otherwise({
                    redirectTo : '/'
                });
      }).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('#{');
    $interpolateProvider.endSymbol('}');
});
