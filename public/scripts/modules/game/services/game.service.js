'use strict';

/**
 * @ngdoc function
 * @name housyApp.service:gameService
 * @description
 * # gameService
 * Controller of the housyApp
 */
(function(){
    angular
    .module('housyApp')
    .factory('gameService',gameService);
    gameService.$inject = ['appHttp','$localStorage','$rootScope','$state','$q'];
    function gameService(appHttp,$localStorage,$rootScope,$state,$q) {
        return {
             getGames:getGames,
             getTicket:getTicket,
             getNumber:getNumber,
             checkWinning:checkWinning,
             getRoomUsers:getRoomUsers
        };

        function getGames(data){
            data.defaultError = 'Getting error in finding the games';
            return appHttp.callApi({
                data:data,
                method:'GET',
                url:'get_game_list'
            })
        }

        function getTicket(data){
            data.defaultError = 'Error in getting the ticket';
            return appHttp.callApi({
                data:data,
                method:'GET',
                url:'search_game?game_id='+data.game_id
            });
        }

        function getNumber(data){
            data.defaultError = 'Error in getting the number';
            data.showLoading = false;
            return appHttp.callApi({
                data:data,
                url:'get_next_game_number'
            });
        }

        function getRoomUsers(data){
            data.defaultError = 'Getting error in finding the users for this room';
            return appHttp.callApi({
                data:data,
                url:'get_room_user_list',
            })
        }

        function checkWinning(data){
            data.defaultError = 'Getting error in finding the status for your claim';
            return appHttp.callApi({
                data:data,
                url:'checking_winning_part'
            });
        }
    }
})();
