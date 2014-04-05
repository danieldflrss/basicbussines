'use strict';

angular.module('basicbussines')
      .directive('focusOn',function(){
          return function(scope,elem,attr){
              return scope.$on('focusOn',function(e,name){
                  if(name === attr.focusOn){
                      return elem[0].select();
                  }
              });
          };
      });
