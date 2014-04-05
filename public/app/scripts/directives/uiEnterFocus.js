'use strict';
angular.module('basicbussines')
      .directive('uiEnterFocus',['$parse','focus',function($parse,focus){
              return function(scope,element,attr){
                  element.on('keyup',function(event){
                      var key = (event.wich) ? event.wich : event.keyCode;
                      if(key === 13){
                          focus(attr.uiEnterFocus);
                      }
                  });
              };
          }]);


