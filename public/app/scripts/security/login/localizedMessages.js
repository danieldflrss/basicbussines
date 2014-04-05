angular.module('localizedMessages',[])
      .factory('localizedMessages',['$interpolate','i18nmessages',function($interpolate,i18nmessages){

              var handleNotFound = function(msg,msgKey){
                  return msg || '?' + msgKey + '?';
              };
              return {
                  get : function(msgKey,interpolateParams){
                      var msg = i18nmessages[msgKey];
                      if(msg){
                          return $interpolate(msg)(interpolateParams);
                      }else{
                          return handleNotFound(msg,msgKey);
                      }
                  }
              };
          }]);