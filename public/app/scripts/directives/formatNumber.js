'use strict';
angular.module('basicbussines').directive('format',['$filter',function($filter){
        return {
            require : '^ngModel',
            link : function(scope,elem,attrs,ctrl){
                elem.autoNumeric('init',{aSign : '',vMin : '0',vMax : attrs.vmax});
                if(!ctrl){
                    return;
                }
                ctrl.$formatters.unshift(function(){
                    return $filter(attrs.format)(ctrl.$modelValue);
                });
                ctrl.$parsers.unshift(function(){
                    return elem[0].value;
                });
            }
        };
    }]);