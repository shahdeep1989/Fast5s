'use strict';

/**
 * @ngdoc function
 * @name housyApp.service:userService
 * @description
 * # loginCtrl
 * Controller of the housyApp
 */
(function(){
    angular
    .module('housyApp')
    .factory('userService',userService);
    userService.$inject = ['appHttp','$localStorage','$rootScope','$state','$q','$mdToast'];
    function userService(appHttp,$localStorage,$rootScope,$state,$q,$mdToast) {
        return {
            login:login,
            changePassword:changePassword,
            signup:signup,
            forgotPassword:forgotPassword,
            setProfile:setProfile,
            checkAuth:checkAuth,
            editProfile:editProfile,
            logout:logout
        };

        function login(data){
            data.defaultError = 'Getting error in login';
            return appHttp.callApi({
                data:data,
                url:'login'
            }).success(function(data){
                setProfile(data);
            })
        }

        function changePassword(data){
            data.defaultError = 'Error in updating the password';
            return appHttp.callApi({
                data:data,
                url:'change_password',
                successToast:true
            }).success(function(){
              $state.go('home')
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Password is changed successfully')
                  .position('bottom right')
                  .hideDelay(6000)
              );
            })
        }

        function signup(data){
            data.defaultError = 'Getting error in signup';
            return appHttp.callApi({
                data:data,
                url:'sign_up'
            }).success(function(data){
                setProfile(data);
            })
        }

        function forgotPassword(data){
            data.defaultError = 'Error in updating the password';
            return appHttp.callApi({
                data:data,
                url:'change_password',
                successToast:true
            })
        }

        function setProfile(data){
            $rootScope.user = data.data;
            $localStorage.user = data.data;
            $state.go('home');
        }

        function checkAuth(){
            if($localStorage.user){
                return true;
            } else {
                $state.go('login');
                return false;
            }
        }

        function editProfile(data){
            data.defaultError = 'Getting error in edit profile';
            return appHttp.callApi({
                data:data,
                url:'update_profile'
            }).success(function(data){
                data.data.auth_token = $rootScope.user.auth_token
                setProfile(data);
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Profile is edited successfully')
                    .position('bottom right')
                    .hideDelay(6000)
                );
            })
        }

        function logout(){
            var deffered = $q;
            appHttp.callApi({
                data:{},
                method:'GET',
                url:'logout'
            }).finally(function(){
                delete $rootScope.user;
                delete $localStorage.user;
                $state.go('login');
                deffered.resolve();
            });
            return deffered;
        }
    }
})();
