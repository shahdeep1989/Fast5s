'use strict';

/**
 * @ngdoc function
 * @name housyApp.directive:ticket
 * @description
 * # ticket
 * Directive of the housyApp
 */
(function(){
  angular
    .module('housyApp')
    .directive("ticket",  ticket);
  ticket.$inject = ['lodash'];
  function ticket(_) {
    return {
      template:"<div class='ticket'></div>",
      scope: {
        image: "=",
        coords: "="
      },
      link: function(scope, element, attributes) {
        element.append("<img src=" + scope.image + " style='height:600px;width:600px'>");
        _.each(scope.coords,function(value,key){
          element.append('<div class="ticketNumber" style="top:0px;left:0px" ></div>')
        });
        //add the numbers to the directive
        console.log('this is the link');
      }
    };
  }
})();
