'use strict';

/**
 * @ngdoc function
 * @name housyApp.controller:editProfileCtrl
 * @description
 * # editProfileCtrl
 * Controller of the housyApp
 */
(function(){
    angular
    .module('housyApp')
    .controller('forgotPasswordCtrl',forgotPasswordCtrl);
    forgotPasswordCtrl.$inject = ['userService'];
    function forgotPasswordCtrl(userService) {
        var vm = this;
        vm.user = {};
        vm.forgotPassword = forgotPassword;
        function forgotPassword(){
            userService.forgotPassword(vm.user)
        }
    }
})();