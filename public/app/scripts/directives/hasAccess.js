'use strict';

angular.module('basicbussines')
      .directive('hasAccess',function(){
          return function(scope,elem,attr){
              return scope.$on('permissions',function(e,name){
                  if(name.key === attr.hasAccess && name.value !== 1){
                      return elem.hide();
                  }
              });
          };
      });
