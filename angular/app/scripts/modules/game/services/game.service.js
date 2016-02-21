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
    }
})();
