//routes for the users
angular
  .module('housyApp')
  .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
        url: "/home",
        templateUrl: "scripts/modules/game/templates/home.html",
        controller: 'homeCtrl',
        controllerAs: 'vm',
        checkAuth:true
    })
    .state('game', {
        url: "/game",
        templateUrl: "scripts/modules/game/templates/game.html",
        controller: 'gameCtrl',
        controllerAs: 'vm',
        checkAuth:true
    })
}]);