'use strict';
// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
angular.module('security.service',[
    'security.retryQueue',// Keeps track of failed requests that need to be retried once the user logs in
    'security.login',// Contains the login form template and controller
    'ui.bootstrap'            // Used to display the login form as a modal dialog.
])

      .factory('security',['$http','$q','$location','securityRetryQueue','$modal','$rootScope',function($http,$q,$location,queue,$modal,$rootScope){

              // Redirect to the given url (defaults to '/')
              function redirect(url){
                  url = url || '/';
                  $location.path(url);
              }

              // Login form dialog stuff
              var loginDialog = null;
              function openLoginDialog(){

                  if(!loginDialog){
                      //ACCION AL ABRIR LA VENTANA DE LOGIN
                      loginDialog = $modal.open({
                          templateUrl : '../views/mdlLogin',
                          controller : 'LoginFormController',
                          backdrop : 'static'
                      });

                      loginDialog.result.then(onLoginDialogClose,closeLoginDialog);
                  }
              }

              function closeLoginDialog(success){
                  if(loginDialog){
                      loginDialog.close(success);
                      loginDialog = null;
                  }
              }
              function onLoginDialogClose(success){

                  if(success){
                      queue.retryAll();
                      loginDialog = null;
                  }else{
                      queue.cancelAll();
                      loginDialog = null;
                      redirect();
                  }
              }
              // Register a handler for when an item is added to the retry queue
              queue.onItemAddedCallbacks.push(function(){ //retryItem
                  if(queue.hasMore()){
                      service.showLogin();
                  }
              });
              // The public API of the service
              var service = {
                  // Get the first reason for needing a login
                  getLoginReason : function(){
                      return queue.retryReason();
                  },
                  // Show the modal login dialog
                  showLogin : function(){
                      openLoginDialog();
                  },
                  // Attempt to authenticate a user by the given email and password
                  login : function(email,password){
                      var request = $http.post('../login',{email : email,password : password});
                      return request.then(function(response){
                          service.currentUser = response.data.user;
                          if(service.isAuthenticated()){
                              closeLoginDialog(true);
                          }
                      });
                  },
                  // Give up trying to login and clear the retry queue
                  cancelLogin : function(){
                      queue.cancelAll();
                      redirect();
                  },
                  // Logout the current user and redirect
                  logout : function(redirectTo){
                      $http.get('../logout').then(function(){
                          service.currentUser = null;
                          redirect(redirectTo);
                      });
                  },
                  // Ask the backend to see if a user is already authenticated - this may be from a previous session.
                  requestCurrentUser : function(){
                      if(service.isAuthenticated()){
                          return $q.when(service.currentUser);
                      }else{
                          return $http.get('../current_user').then(function(response){
                              service.currentUser = response.data.user;
                              service.propAccess();
                              return service.currentUser;
                          });
                      }
                  },
                  // Information about the current user
                  currentUser : null,
                  // Is the current user authenticated?
                  isAuthenticated : function(){
                      return !!service.currentUser;
                  },
                  propAccess : function(){
                      if(service.currentUser === undefined){
                          return;
                      }
                      var permissions = service.currentUser.permissions;
                      angular.forEach(permissions,function(value,key){
                          $rootScope.$broadcast('permissions',{key : key,value : value});
                      });
                  },
                  hasAccess : function(action){
                      if(service.currentUser.permissions.hasOwnProperty(action)){
                          return true;
                      }else{
                          return false;
                      }
                  },
                  // Is the current user an adminstrator?
                  isAdmin : function(){
                      return !!(service.currentUser && service.currentUser.admin);
                  }
              };
              return service;
          }]);