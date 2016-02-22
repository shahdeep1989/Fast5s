'use strict';

/**
 * @ngdoc function
 * @name housyApp.controller:signupCtrl
 * @description
 * # signupCtrl
 * Controller of the housyApp
 */
(function(){
    angular
    .module('housyApp')
    .controller('signupCtrl',signupCtrl);
    signupCtrl.$inject = ['userService'];
    function signupCtrl(userService) {
        var vm = this;
        vm.user = {};
        vm.signup = signup;
        
        function signup(){
            userService.signup(vm.user)
        }
    }
})();