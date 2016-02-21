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
  gameCtrl.$inject = ['$scope','gameService','$stateParams','$timeout','$interval'];
  function gameCtrl($scope,gameService,$stateParams,$timeout,$interval) {
    var vm = this;
    vm.game = $stateParams.game;
    vm.room = null;
    vm.startsAfter = null;
    vm.ticketNumbers = [];
    vm.interval= null;
    vm.displayInterval = null;
    vm.currentHead = 0;
    vm.getNumber = getNumber;
    vm.displayNumber = null;
    active();
    vm.coords= [];

    function active(){
      gameService.getTicket({game_id:vm.game.id})
        .success(function(data){
          //storing the data here
          vm.room = data.data.room_id;
          vm.startTime = data.data.game_start_time;
          parseCoordinate(data.data.ticket);
          //vm.ticketNumbers = data.data.ticket.numbers;
          var now = moment(new Date());
          var then = moment(vm.startTime);
          vm.startsAfter = Math.abs(then.diff(now));
          $timeout(function(){
            console.log('this is after the timeout');
            vm.getNumber();
            vm.interval = $interval(function(){
              console.log('** this is inside the interval function');
              vm.getNumber();
            },vm.game.interval_sec*1000);
          },vm.startsAfter);
          vm.startsAfter = Math.round(vm.startsAfter/1000);
          vm.displayInterval = $interval(function(){
              if(vm.startsAfter<=0){
                $interval.cancel(vm.displayInterval);
                vm.startsAfter = null;
              }
              vm.startsAfter = vm.startsAfter- 1;
          },1000);

        });
    }

    function parseCoordinate(tickets){
      _.each(vm.game.winning_parts,function(winningPart){
          for(var i= 0;i<winningPart.num_of_element;i++){
              vm.coords.push({
                x:winningPart.coordinates.x_axes[i],
                y:winningPart.coordinates.y_axes[i],
                number:tickets[0],
                winningPart:winningPart.text_panel,
                isSelected:false
              })
              tickets.shift();
          }
      })
    }

    function getNumber(){
        gameService.getNumber({room_id:vm.room,current_head:vm.currentHead})
            .success(function(data){
                vm.displayNumber = data.data.number;
            });
        vm.currentHead++;
    }1

    $scope.$on('$destroy',function(){
        $interval.cancel(vm.interval);
        console.log('destroying the interval');
    });
  }
})();
