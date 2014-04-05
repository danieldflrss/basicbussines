'use strict';

angular.module('basicbussines').directive('feedback',function(){
    return {
        restrict : 'E',
        replace : true,
        transclude : true,
        scope : {control : '=',title : '@',required : '@',modelo : '=',maxlength : '@'},
        template :
              '<div class="form-group has-feedback" data-ng-class="cssClasses( control )">' +
              '   <label  class="col-sm-3 control-label"><span style="color:red;" ng-show="{{required}}">&bullet;</span> {{title}}</label>' +
              '	<div class="col-sm-8">' +
              '   <span ng-transclude></span>' +
              '	<span class="glyphicon form-control-feedback" data-ng-class="iconFeedback( control )"></span>' +
              '	</div>' +
              '	<small data-ng-show="maxlength" class="text-muted">{{modelo.length - maxlength }}</small>' +
              '</div>',
        link : function postLink(scope){
            scope.iconFeedback = function(ngModelContoller){
                if(ngModelContoller === undefined){
                    return;
                }
                return {
                    'glyphicon-remove' : ngModelContoller.$invalid && ngModelContoller.$dirty,
                    'glyphicon-ok' : ngModelContoller.$valid && ngModelContoller.$dirty
                };
            };
            scope.cssClasses = function(ngModelContoller){
                if(ngModelContoller === undefined){
                    return;
                }
                return {
                    'has-error' : ngModelContoller.$invalid && ngModelContoller.$dirty,
                    'has-success' : ngModelContoller.$valid && ngModelContoller.$dirty
                };
            };
        }
    };
});

angular.module('posApp').directive('match',function(){
    return {
        require : 'ngModel',
        restrict : 'A',
        scope : {
            match : '='
        },
        link : function(scope,elem,attrs,ctrl){
            scope.$watch(function(){
                return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || scope.match === ctrl.$modelValue;
            },function(currentValue){
                ctrl.$setValidity('match',currentValue);
            });
        }
    };
});