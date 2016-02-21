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
  gameCtrl.$inject = ['gameService','$stateParams','$timeout','$interval'];
  function gameCtrl(gameService,$stateParams,$timeout,$interval) {
    var vm = this;
    vm.game = $stateParams.game;
    vm.room = null;
    vm.startsAfter = null;
    vm.ticketNumbers = [];
    vm.getNumber = getNumber;
    active();
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
    ];

    function active(){
      gameService.getTicket({game_id:vm.game.id})
        .success(function(data){
          vm.room = data.data.room_id;
          vm.startTime = data.data.game_start_time;
          vm.ticketNumbers = data.data.ticket.numbers;
          var now = moment(new Date());
          var then = moment(vm.startTime);
          console.log(Math.abs(then.diff(now)));
          $timeout(function(){
            console.log('this is after the timeout');
            vm.getNumber();
            $interval(function(){
              console.log('this is after the interval');
              vm.getNumber();
            },vm.game.interval_sec*1000);
          },Math.abs(then.diff(now)));
        });
    }

    function getNumber(){
      console.log('getting the number');
    }
  }
})();
