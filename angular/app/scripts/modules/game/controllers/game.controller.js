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
