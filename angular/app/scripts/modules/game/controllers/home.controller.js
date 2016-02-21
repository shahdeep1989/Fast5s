'use strict';

/**
 * @ngdoc function
 * @name housyApp.controller:homeCtrl
 * @description
 * # homeCtrl
 * Controller of the housyApp
 */
(function(){
    angular
    .module('housyApp')
    .controller('homeCtrl',homeCtrl);
    homeCtrl.$inject = ['gameService'];
    function homeCtrl(gameService) {
        var vm = this;
        vm.games = [];
        activate();
        function activate(){
          gameService.getGames({}).success(function (data) {
            vm.games = data.data;
          });
        }
    }
})();
