'use strict';
angular.module('security.interceptor',['security.retryQueue'])

// This http interceptor listens for authentication failures
      .factory('securityInterceptor',['$injector','securityRetryQueue','$rootScope',function($injector,queue,$rootScope){
              return function(promise){
                  // Intercept failed requests
                  return promise.then(null,function(originalResponse){
                      if(originalResponse.status === 401){
                          // The request bounced because it was not authorized - add a new request to the retry queue
                          promise = queue.pushRetryFn(originalResponse.data.msg,function retryRequest(){
                              // We must use $injector to get the $http service to prevent circular dependency
                              return $injector.get('$http')(originalResponse.config);
                          });

                      }else if(originalResponse.status === 500 || originalResponse.status === 400){
                          $rootScope.$broadcast('alert',originalResponse.data);
                      }
                      return promise;
                  });
              };
          }])

// We have to add the interceptor to the queue as a string because the interceptor depends upon service instances that are not available in the config block.
      .config(['$httpProvider',function($httpProvider){
              $httpProvider.responseInterceptors.push('securityInterceptor');
          }])

      .run(['$http','$rootScope','security',function($http,$rootScope,security){
              $http.defaults.transformRequest.push(function(data){
                  $rootScope.$broadcast('httpStart');
                  return data;
              });
              $http.defaults.transformResponse.push(function(data){
                  $rootScope.$broadcast('httpStop');
                  return data;
              });
              security.requestCurrentUser();
          }]);





