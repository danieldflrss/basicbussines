angular.module('security.login.toolbar',[])

// The loginToolbar directive is a reusable widget that can show login or logout buttons
// and information the current authenticated user
      .directive('loginToolbar',['security',function(security){
              var directive = {
                  templateUrl : 'views/toolbar.tpl.html',
//    templateUrl: 'template/security/toolbar.html',
                  restrict : 'E',
                  replace : true,
                  scope : true,
                  link : function($scope,$element,$attrs,$controller){
                      $scope.isAuthenticated = security.isAuthenticated;
                      $scope.login = security.showLogin;
                      $scope.logout = security.logout;
                      $scope.$watch(function(){
                          return security.currentUser;
                      },function(currentUser){
                          $scope.currentUser = currentUser;
                      });
                  }
              };
              return directive;
          }])

      .run(["$templateCache",function($templateCache){
              $templateCache.put("template/security/toolbar.html",
                    "<ul>\n" +
                    " <li ng-show=\"isAuthenticated()\" class=\"logout\">\n" +
                    "   <form class=\"navbar-form\">\n" +
                    "   <button class=\"btn logout\" ng-click=\"logout()\">Cerrar Sesión {{currentUser.firstName}} {{currentUser.lastName}}</button>\n" +
                    "   </form>\n" +
                    " </li>\n" +
                    " <li ng-hide=\"isAuthenticated()\" class=\"login\">\n" +
                    "   <form class=\"navbar-form\">\n" +
                    "     <button class=\"btn login\" ng-click=\"login()\">Iniciar Sesión</button>\n" +
                    "   </form>\n" +
                    " </li>\n" +
                    "</ul>\n" +
                    "");
          }]);