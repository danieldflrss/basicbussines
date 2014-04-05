/*
 * BITACORA DE CAMBIOS
 * @author Luz Mendoza
 * fecha: 12/02/2014
 * descripcion: modificacion del campo id_usuario
 */
'use strict';

angular.module('basicbussines').factory('Usuario',['$resource',function($resource){
        return $resource('../usuarios/:id',
              {'id' : '@id'},{'update' : {method : 'PUT'},
            'query' : {method : 'GET',isArray : false}});
    }]);
angular.module('basicbussines').factory('UsuarioLoader',['$q','$route','Usuario',function($q,$route,Usuario){
        return function(){
            var defer = $q.defer();
            Usuario.get({id : $route.current.params.id},
            function(res){
                defer.resolve(res);
            },function(){
                defer.reject('reject');
            });
            return defer.promise;
        };
    }]);