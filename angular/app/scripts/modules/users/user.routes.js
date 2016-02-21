//routes for the users
angular
  .module('housyApp')
  .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/login");
  $stateProvider
    .state('login', {
        url: "/login",
        templateUrl: "scripts/modules/users/templates/login.html",
        controller: 'loginCtrl',
        controllerAs: 'vm'
    })
    .state('signup', {
        url: "/signup",
        templateUrl: "scripts/modules/users/templates/signup.html",
        controller: 'signupCtrl',
        controllerAs: 'vm'
    })
    .state('changePassword', {
        url: "/changePassword",
        templateUrl: "scripts/modules/users/templates/change-password.html",
        controller: 'changePasswordCtrl',
        checkAuth:true,
        controllerAs: 'vm'
    })
    .state('forgotPassword', {
        url: "/forgotPassword",
        templateUrl: "scripts/modules/users/templates/forgot-password.html",
        controller: 'forgotPwdCtrl',
        controllerAs: 'vm'
    })
    .state('editProfile', {
        url: "/editProfile",
        templateUrl: "scripts/modules/users/templates/signup.html",
        controller: 'editProfileCtrl',
        checkAuth:true,
        controllerAs: 'vm'
    })
    .state('logout', {
        url: "/logout",
        template:' ',
        resolve:{
            logout:['userService',function(userService){
                return userService.logout();
            }]
        },
        onEnter:['$state',function($state){
            $state.go('login');
        }]
    })
}]);