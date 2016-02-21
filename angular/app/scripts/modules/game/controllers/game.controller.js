'use strict';

/**
 * @ngdoc function
 * @name housyApp.controller:gameCtrl
 * @description
 * # gameCtrl
 * Controller of the housyApp
 */
(function(){
  angular
    .module('housyApp')
    .controller('gameCtrl',gameCtrl);
  gameCtrl.$inject = ['gameService'];
  function gameCtrl(gameService) {
    var vm = this;
    vm.image = 'images/butterFly.png';
    vm.coords= [
      {
        x:10,
        y:10
      },
      {
        x:20,
        y:20
      }
    ]
  }
})();
