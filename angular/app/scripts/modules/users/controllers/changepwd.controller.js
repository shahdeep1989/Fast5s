'use strict';

/**
 * @ngdoc function
 * @name housyApp.controller:changePasswordCtrl
 * @description
 * # changePasswordCtrl
 * Controller of the housyApp
 */
(function(){
    angular
    .module('housyApp')
    .controller('changePasswordCtrl',changePasswordCtrl);
    changePasswordCtrl.$inject = ['userService'];
    function changePasswordCtrl(userService) {
        var vm = this;
        vm.user = {};
        vm.changePassword = changePassword;
        
        function changePassword(){
            userService.changePassword(vm.user)
        }
    }
})();