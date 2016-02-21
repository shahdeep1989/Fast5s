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
             getNumber:getNumber
            // requestJoin:requestJoin,
            // getStatus:getStatus
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
            return appHttp.callApi({
                data:data,
                method:'GET',
                url:'getNumber'
            });
        }
    }
})();
