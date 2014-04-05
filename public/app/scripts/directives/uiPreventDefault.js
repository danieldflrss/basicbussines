'use strict';

angular.module('basicbussines')
      .directive('uiPreventDefault',function(){
          return function(scope,element){
              element.on('keydown',function(event){
                  var key = (event.wich) ? event.wich : event.keyCode;
                  if(key === 13){
                      event.preventDefault();
                  }
              });
          };
      });
