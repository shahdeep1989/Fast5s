'use strict';

/**
 * @ngdoc function
 * @name housyApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the housyApp
 */
(function(){
    angular
    .module('housyApp')
    .controller('loginCtrl',loginCtrl);
    loginCtrl.$inject = ['appHttp'];
    function loginCtrl(appHttp) {
        console.log('login controller');
        var vm = this;
        vm.user = {};
        vm.login = login;
     
        // appHttp.callApi({
        //     data:vm.user,
        //     url:'login'
        // }).success(function(){
        //     alert('login success');
        // })
        
        //  this.register=function(userData) {
        //     var user = angular.copy(userData),
        //         me = this;
        //     user.successAlert = true;
        //     user.successTitle = 'Thank You!';
        //     user.errorAlert = false;
        //     user.back = true;
        //     return appHttp.callAPI({
        //         data: user,
        //         url: 'register'
        //     }).success(function(response){
        //         me.setProfile(response);
        //         $state.go('app.map');
        //     });
        // };
    }
});