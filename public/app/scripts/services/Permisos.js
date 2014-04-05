'use strict';

angular.module('basicbussines')
      .factory('Permisos',['$http','$q',function($http,$q){

              return function(){
                  var defer = $q.defer();
                  $http.get('../permisos').then(function(res){
                      defer.resolve(res);
                  },function(){
                      defer.reject('error al guardar');
                  });
                  return defer.promise;
              };

          }]);