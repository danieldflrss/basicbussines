'use strict';
angular.module('basicbussines')
      .config(['$httpProvider',function($httpProvider){
              $httpProvider.responseInterceptors.push(['$q','$rootScope',function($q,$rootScope){
                      return function(promise){
                          return promise.then(null,function(response){
                              switch(response.status){
                                  case 403 :
                                      window.location.href = 'login.php';
                                      break;
                                  case 404 :
                                      console.log('no se encontro la ruta');
                                      break;
                                  case 401 :
                                      break;
                                  case 500 :
                                      console.log('Internal Server Error');
                                      break;
                              }
                              $rootScope.$broadcast('alert',response.data);
                              return $q.reject(response);
                          });
                      };
                  }]);
          }]);