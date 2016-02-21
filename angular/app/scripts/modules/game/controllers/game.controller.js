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
  gameCtrl.$inject = ['gameService','$stateParams'];
  function gameCtrl(gameService,$stateParams) {
    var vm = this;
    vm.game = $stateParams.game;
    vm.coords= [
      {
        x:50,
        y:50,
        number:'99',
        isSelected:false
      },
      {
        x:90,
        y:90,
        number:'11',
        isSelected:true
      }
    ]
  }
})();
