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
        vm.imagePath = 'https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_284x96dp.png';
    }
})();