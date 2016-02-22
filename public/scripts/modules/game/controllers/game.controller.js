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
  gameCtrl.$inject = ['$scope','gameService','$stateParams','$timeout','$interval','$mdDialog','$state','$mdToast','$document'];
  function gameCtrl($scope,gameService,$stateParams,$timeout,$interval,$mdDialog,$state,$mdToast,$document) {
    var vm = this;
    vm.game = $stateParams.game;
    vm.room = null;
    vm.startsAfter = null;
    vm.ticketNumbers = [];
    vm.numberInterval= null;
    vm.displayInterval = null;
    vm.currentHead = 0;
    vm.winnigParts = [];
    vm.getNumber = getNumber;
    vm.checkWinning = checkWinning;
    vm.displayNumber = null;
    active();
    vm.coords= [];
    vm.participants = [];

    function active(){
      if(!vm.game){
          $state.go('home')
      }
      setWinningParts();
      gameService.getTicket({game_id:vm.game.id})
        .success(function(data){
          //storing the data here
          vm.room = data.data.room_id;
          vm.startTime = data.data.game_start_time;
          parseCoordinate(data.data.ticket);
          setParticipants();
          setTimerForGameStrart();
        });
    }

    function setWinningParts(){
      _.each(vm.game.winning_parts,function(value,key){
          vm.winnigParts.push({
            id:value.id,
            text_panel:value.text_panel,
            doShow:true
          })
      });
    }

    function setTimerForGameStrart(){
        console.log('removed');
        $interval.cancel(vm.displayInterval);
        $interval.cancel(vm.numberInterval);
        var now = moment(new Date());
        var then = moment(vm.startTime);
        vm.startsAfter = Math.abs(then.diff(now));

        //time out for the fist start up
        $timeout(function(){
          setParticipants();
          vm.getNumber();
          vm.numberInterval = $interval(function(){ //interval after the first time out
            vm.getNumber();
          },vm.game.interval_sec*1000);
        },vm.startsAfter);

        //setting the interval for the countdown timer to display
        vm.startsAfter = Math.round(vm.startsAfter/1000);
        vm.displayInterval = $interval(function(){
          console.log('inside the display interval')
          if(vm.startsAfter<=0){
            console.log('removed');
            $interval.cancel(vm.displayInterval);
            vm.startsAfter = null;
            return;
          }
          vm.startsAfter = vm.startsAfter- 1;
        },1000);
    }

    function parseCoordinate(tickets){
      _.each(vm.game.winning_parts,function(winningPart){
          for(var i= 0;i<winningPart.num_of_element;i++){
              vm.coords.push({
                x:winningPart.coordinates.x_axes[i],
                y:winningPart.coordinates.y_axes[i],
                number:tickets[0],
                winningPart:winningPart.text_panel,
                isSelected:false,
                winningPartId:winningPart.id
              })
              tickets.shift();
          }
      })
    }

    function setParticipants(){
        gameService.getRoomUsers({room_id:vm.room})
          .success(function(data){
              vm.participants = data.data;
          })
    }

    function getNumber(){
        gameService.getNumber({room_id:vm.room,current_head:vm.currentHead})
            .success(function(data){
                if(!data.data.number){
                    $interval.cancel(vm.numberInterval);
                    $mdDialog.show(
                      $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#gameContainer')))
                      .clickOutsideToClose(true)
                      .title('Alert')
                      .textContent('Game is completed')
                      .ok('Got it!')
                    ).finally(function(){
                        $state.go('home');
                    })
                } else if(data.data.winners){ //if winners is there then remove the button of the winner
                    var message = '';
                    _.each(vm.winnigParts,function(value){
                      _.each(data.data.winners,function(winner){
                          if(value.id==winner.winning_part_id && value.doShow){
                              value.doShow = false;
                              if($rootScope.user.user_id!=winner.id){ //dont show the success toast for the current user
                                  message='User '+winner.name+' has won the '+value.text_panel+'. ';
                              }
                          }
                      })
                    });
                    if(message){
                        $mdToast.show(
                          $mdToast.simple()
                            .textContent(message)
                            .position('bottom right')
                            .hideDelay(6000)
                        );
                    }
                }
                var audio = new Audio('images/new.mp3');
                audio.play();
                vm.displayNumber = data.data.number;
            }).error(function(response){
                try{
                  if(response.result.game_start_time){
                    vm.startTime = response.result.game_start_time
                    setTimerForGameStrart()
                  }
                }catch(e){}
            })
        vm.currentHead++;
    }

    function checkWinning(id,name){
        var partTickets  = [];
        var isError = false;
        if(id==0){
          _.each(vm.coords, function (value) {
              if(!value.isSelected){
                  isError = true;
              } else {
                  partTickets.push(value.number);
              }
          })
        } else {
          _.each(vm.coords, function (value) {
            if (value.winningPartId == id && value.isSelected) {
              partTickets.push(value.number);
            } else if (value.winningPartId == id && !value.isSelected) {
              isError = true;
            }
          });
        }
        if(isError){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#gameContainer')))
              .clickOutsideToClose(true)
              .title('Alert')
              .textContent('Please select all '+name+' tickets')
              .ariaLabel('Alert Dialog Demo')
              .ok('Got it!')
          );
        } else {
            gameService.checkWinning({elements_list:partTickets.join(),winning_part_id:id,current_index:vm.currentHead,room_id:vm.room})
              .error(function(data){
                if(data.result.disqualify){
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#gameContainer')))
                      .clickOutsideToClose(true)
                      .title('Alert')
                      .textContent('You have claimed wrong entry, you are disqualified')
                      .ok('Got it!')
                  );
                }
              })
              .success(function(data){
                if(data.data) {
                    var audio = new Audio('images/clap.mp3');
                    audio.play();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent(data.data.messages)
                        .position('bottom right')
                        .hideDelay(6000)
                    );
                }
              })
        }
    }

    $scope.$on('$destroy',function(){
        $interval.cancel(vm.numberInterval);
        $interval.cancel(vm.displayInterval);
        console.log('destroying the interval');
    });
  }
})();
