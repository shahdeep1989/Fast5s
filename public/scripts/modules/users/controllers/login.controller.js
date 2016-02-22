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
    loginCtrl.$inject = ['userService'];
    function loginCtrl(userService) {
        var vm = this;
        vm.user = {};
        vm.login = login;
        vm.logout = logout;

        function login(){
            userService.login(vm.user)
        }

        function logout(){
            userService.logout();
        }
    }
})();
