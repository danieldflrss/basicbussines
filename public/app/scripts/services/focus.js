'use strict';
angular.module('basicbussines').factory('focus',['$rootScope','$timeout',
    function($rootScope,$timeout){
        return function(name){
            return $timeout(function(){
                return $rootScope.$broadcast('focusOn',name);
            });
        };
    }]);