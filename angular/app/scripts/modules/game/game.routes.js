//routes for the users
angular
  .module('housyApp')
  .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
        url: "/home",
        templateUrl: "scripts/modules/game/templates/home.html",
        controller: 'homeCtrl',
        controllerAs: 'home'
    })
    .state('game', {
        url: "/game",
        templateUrl: "scripts/modules/game/templates/game.html",
        controller: 'gameCtrl',
        controllerAs: 'game'
    })
}]);