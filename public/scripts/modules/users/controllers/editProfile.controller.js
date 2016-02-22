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
    .controller('editProfileCtrl',editProfileCtrl);
    editProfileCtrl.$inject = ['userService','$rootScope','lodash'];
    function editProfileCtrl(userService,$rootScope,_) {
        var vm = this;
        vm.editMode = true;
        vm.user = {};
        vm.editProfile = editProfile;
        _.each($rootScope.user,function(value,key){
            vm.user['user['+key+']'] = value;
        })
        
        function editProfile(){
            userService.editProfile(vm.user)
        }
    }
})();