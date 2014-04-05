'use strict';

angular.module('basicbussines')
      .directive('uiFocus',function(){
          return function(scope,element){
              element[0].focus();
          };
      });

