'use strict';
/**
 * @ngdoc service
 * @name housyApp.service:pendingRequests
 * @description
 * # pendingRequests
 * Service for managing the pendingRequests and cancel request when needed
 */
angular.module('housyApp')
    .service('pendingRequests',['lodash', function(_) {
        var pending = [];
        
        /**
         * @ngdoc
         * @name housyApp.service:pendingRequests:get
         * @methodOf housyApp.service:pendingRequests   
         * @return {array} return the pending http request array list
         *
         * @description
         * Method to get the pending http request array list
         */
        this.get = function() {
            return pending;
        };

        /**
         * @ngdoc
         * @name housyApp.service:pendingRequests:add
         * @methodOf housyApp.service:pendingRequests   
         * @param {object} request $http request parameter
         *
         * @description
         * Method to add the new request to pending array
         */
        this.add = function(request) {
            pending.push(request);
        };
        
        /**
         * @ngdoc
         * @name housyApp.service:pendingRequests:remove
         * @methodOf housyApp.service:pendingRequests   
         * @param {object} request $http request to remove
         *
         * @description
         * Method to remove the pending request matching with the request parameter passed in
         */
        this.remove = function(request) {
            pending = _.filter(pending, function(p) {
                return p.url !== request;
            });
        };

        /**
         * @ngdoc
         * @name housyApp.service:pendingRequests:cancelAll
         * @methodOf housyApp.service:pendingRequests   
         *
         * @description
         * Method to remove all the pending requests
         */
        this.cancelAll = function() {
            angular.forEach(pending, function(p) {
                p.canceller.resolve();
            });
            pending.length = 0;
        };
    }]);