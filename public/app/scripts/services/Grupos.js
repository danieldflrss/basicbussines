'use strict';
angular.module('basicbussines')
      .factory('Grupos',['$resource',function($resource){
              return $resource('../grupos/:id',
                    {'id' : '@id'},
              {'update' : {method : 'PUT'}});
          }]);