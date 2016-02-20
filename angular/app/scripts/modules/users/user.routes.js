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
        controllerAs: 'signup'
    })
    .state('changePassword', {
        url: "/changePassword",
        templateUrl: "scripts/modules/users/templates/change-password.html",
        controller: 'changePwdCtrl',
        controllerAs: 'changePwd'
    })
    .state('forgotPassword', {
        url: "/forgotPassword",
        templateUrl: "scripts/modules/users/templates/forgot-password.html",
        controller: 'forgotPwdCtrl',
        controllerAs: 'forgotPwd'
    })
}]);