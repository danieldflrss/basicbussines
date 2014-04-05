'use strict';
angular.module('basicbussines').directive('fecha',['$filter',function($filter){
        return {
            restrict : 'E',
            link : function postLink(scope,element){
                setInterval(function(){
                    scope.isSelected();
                },100);
                scope.isSelected = function(){
                    var fecha = new Date();
                    var ff = $filter('date')(fecha,'dd | MMMM | yyyy   HH:mm ');
                    element.text(ff + 'hrs.');
                };
            }
        };
    }]);