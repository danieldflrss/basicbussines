'use strict';
angular.module('basicbussines')
      .factory('modals',['$modal',function($modal){
              return function(tipo,callback,datos){
                  var params = {};
                  switch(tipo){
                      case 'reporte':
                          params = {
                              templateUrl : 'views/modals/modalReportes.html',
                              controller : 'modalReporteCtrl',
                              resolve : {
                                  src : function(){
                                      return datos;
                                  }
                              }
                          };
                          break;
                      case 'alert':
                          params = {
                              templateUrl : 'views/modals/modalAlert.html',
                              controller : 'modalAlertCtrl',
                              resolve : {
                                  msg : function(){
                                      return datos;
                                  }
                              }
                          };
                          break;
                  }
                  $modal.open(params).result.then(function(res){
                      if(angular.isFunction(callback)){
                          callback(res);
                      }
                  });
              };
          }]);