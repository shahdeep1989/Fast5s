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
        vm.imagePath = 'https://cdn.photographylife.com/wp-content/uploads/2014/06/Nikon-D810-Image-Sample-6.jpg';
        activate();
        function activate(){
          gameService.getGames({}).success(function (data) {
            vm.games = data.data;
          });
        }
    }
})();
