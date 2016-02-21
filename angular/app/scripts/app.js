'use strict';

/**
 * @ngdoc overview
 * @name housyApp
 * @description
 * # housyApp
 *
 * Main module of the application.
 */
angular
  .module('housyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ui.router',
    'ngLodash',
    'ngStorage',
    'ngMessages'
  ])
  
//** 
//set the service for api intercepter for validating the apis
//** 
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('APIInterceptor');
}])

//set api end point in the environment variabe
.constant('ENV', {host:'/169.45.106.232:3000/',apiEndpoint:'http://169.45.106.232:3000/api/'})

.run(['$rootScope','$localStorage',function($rootScope,$localStorage){
    $rootScope.loading = false;
    // $rootScope.defaultPath = '/';
    if($localStorage.user){
        $rootScope.user = angular.copy($localStorage.user);
    } else {
        $rootScope.user = {};
    }
    //add the event to remove the rootScope error messages
    $rootScope.$on('$stateChangeStart',function(){
        $rootScope.errorMessage = false;
    });
}])
