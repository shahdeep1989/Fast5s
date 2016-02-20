'use strict';
/**
 * @ngdoc service
 * @name housyApp.service:appHttp
 * @description
 * # appHttp
 * appHttp is a wrapper for the $http.
 */

angular.module('housyApp')
    //set api end point in the environment variabe
    .constant('ENV', {name:'development',apiEndpoint:'http://locatemychild.itechutopia.com/'})
    // .constant('ENV', {name:'development',apiEndpoint:'/v1/'})
    .service('appHttp', ['$http', '$state', '$rootScope', 'ENV', '$q', 'pendingRequests', function($http, $state,$rootScope, ENV, $q, pendingRequests) {
        
        /**
         * @ngdoc
         * @name housyApp.service:appHttp:callAPI
         * @methodOf housyApp.service:appHttp   
         * @param {object} request request data to call the api
         * @return {promise} return the promise of the api call
         *
         * @description
         * Method for the wrapper of $http
         */
        this.callApi = function(request) {
            //@param unauthorizedStatus - unauthorize code for medgenie server
            var unauthorizedStatus = 401;
            //@param connectionError - connection error code for internal use only
            var connectionError = 800;
            //@param connectionError - connection error code for internal use only
            var unapprovedError = 403;
            //@param requestCanceledError - when panding request is cancelled by the user
            var requestCanceledError = 900;

            //request data for calling api 
            var requestData = {
                method: request.method || 'POST',
                url: ENV.apiEndpoint + request.url,
                data: request.data,
                // timeout: canceller.promise,
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                //     'Cache-Control': 'no-cache'
                // }
            };

            //data for the user interface
            var uiData = {
                //if showLoading is true loader will be shown 
                showLoading: angular.isDefined(request.data.showLoading) ? request.data.showLoading : true,
                //if success alert is there then the success alert popup will be seen
                successAlert: angular.isDefined(request.data.successAlert) ? request.data.successAlert : false,
                //if error alert is there then the error alert popup will be shown 
                errorAlert: angular.isDefined(request.data.errorAlert) ? request.data.errorAlert : true,
                //if connection alert is false then the connection error popup will not be seen
                connectionAlert: angular.isDefined(request.data.connectionAlert) ? request.data.connectionAlert : true,
                //title text for sucess alert
                successTitle: angular.isDefined(request.data.successTitle) ? request.data.successTitle : 'Info',
                //title text for error alert
                errorTitle: angular.isDefined(request.data.errorTitle) ? request.data.errorTitle : 'Info',
                //success toast messge to show
                successToast: angular.isDefined(request.data.successToast) ? request.data.successToast : false,
                //if back is true then go back when get the sucess                    
                back: angular.isDefined(request.data.back) ? request.data.back : false,
            };

            /**
             * @ngdoc
             * @name housyApp.service:appHttp:_init
             * @methodOf housyApp.service:appHttp   
             * @return {boolean} return true or false according to failure or success in initialization
             *
             * @description
             * Method to do some stuff before initialize the http request
             * <ul>
             *     <li>If request data contains the parameter <b>removePanding = true </b> then remove all the pending request which are waiting for the server response </li>
             *     <li>If request data contains the <b>showLoading = true</b> then show the loading indicator</li>
             *     <li>If request data contains the <b>isPatientId = true </b> then patient id is added from the $rootScope </li>
             *     <li>Check for the connection via connection plugin in device , If connection fails return false or return true </li>
             * </ul>
             */
            var _init = function() {
                //remove the panding reqests
                if (request.data.removePanding) {
                    console.info('appHttp: Removing the all panding request');
                    pendingRequests.cancelAll();
                }
                //show loading data 
                if (uiData.showLoading) {
                    //TODO set the logic for loading indicator
                    // $ionicLoading.show({
                    //     template: '<ion-spinner></ion-spinner>'
                    // });
                }
                //set the loading status
                $rootScope.loadingStatus = 'loading';

                if (requestData.data.isPatientId) { //set the patient id before calling the api if api needs the patientid
                    //if patient is there in session storage then use the id of patient from session
                    //else use from the rootscope
                    requestData.data.patient_id = $rootScope.profileData.id;
                }
            };

            /**
             * @ngdoc
             * @name housyApp.service:appHttp:success
             * @methodOf housyApp.service:appHttp   
             * @param {object} response response of the success
             *
             * @description
             * Method to do postprocessing on success of api call
             * <ul>
             *     <li>If <b>successAlert = true</b> then show the success popup with success message</li>
             *     <li>If <b>successToast = true</b> then show the success toast with success message</li>
             *     <li>If <b>back = true</b> then go to back view when got success</li>
             * </ul>
             */
            var _success = function(response) {
                $log.debug('appHttp : this is success in getting the response :: ' + request.url);
                $rootScope.loadingStatus = 'success';
                // $ionicLoading.hide();
                // TODO Hide the loading indicator
                var message=response.data? response.data.messages?response.data.messages: response.result.messages : response.result.messages;
                if (uiData.successAlert) {
                    //TODO show the alert from the angular material
                    // $ionicPopup.alert({
                    //     title: uiData.successTitle,
                    //     template: response.data? response.data.messages?response.data.messages: response.result.messages : response.result.messages,
                    // });
                }
                //show the toast for the success message
                if (uiData.successToast) {
                    var message = response.data.messages.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    //TODOO set the toast
                    //ionicToast.show(message, 'bottom', false, 2500);
                }
            };

            /**
             * @ngdoc
             * @name housyApp.service:appHttp:error
             * @methodOf housyApp.service:appHttp
             * @param {object} response response of the error
             *
             * @description
             * Method to do postprocessing on error of api call
             * <ul>
             *     <li>If api response code is unauthorizedStatus and url is not <b>login</b> , <b>logout</b> then <b>show the alert for the login</b></li>
             *     <li>If response is connection error and <b>connectionAlert=true</b> then show the alert for the connection error </li>
             *     <li>If <b>errorAlert=true</b> is true then show the error alert message arise from the server side </li>
             *     <li>If <b>errorcode = requestCanceledError</b> then do nothing just remove the loading status</li>
             * </ul>
             */
            var _error = function(response) {
                $log.warn('appHttp : this is error in getting the response');
                $rootScope.loadingStatus = 'error';
                // TODO set the globle loading indicator
                // $ionicLoading.hide();
                //if error is for unauthorized user
                if (request.url !== 'login' //dont show the unauthorized errors for login and logout
                    && request.url !== 'logout' && response.result && response.result.errorcode === unauthorizedStatus) {
                    $log.warn('appHttp : user is not logged in');
                    //TODO set the alert from the angular material
                    // $ionicPopup.alert({
                    //     title: uiData.errorTitle,
                    //     template: response.result.messages,
                    //     okText: 'Login'
                    // }).then(function() {
                    //     $state.go('login');
                    // });
                    //if error is for connection error
                } else if (response.result && response.result.errorcode === connectionError) {
                    if (uiData.connectionAlert) {
                        //TODO set the alert from the angular material
                        // $ionicPopup.alert({
                        //     title: uiData.errorTitle,
                        //     template: response.result.messages
                        // });
                    }
                    //all other errors from the server or the server down errors
                } else if (uiData.errorAlert) {
                    var errorTitle = response.result.errorcode === unapprovedError ? 'Uh Oh!' : uiData.errorTitle;
                    // TODO set the alert from the angular material
                    // $ionicPopup.alert({
                    //     title: errorTitle,
                    //     template: response.result.messages
                    // });
                    //if request is removed by the user remove the loading status
                } else if (response.result && response.result.errorcode === requestCanceledError) {
                    $rootScope.loadingStatus = '';
                }
            };

            //initialize the api request
            if (!_init()) {
                $log.error('appHttp : There is no connection found for  ' + requestData.url);
                requestData.url = '/api/connectionError';
            }

            var canceller = $q.defer();
            pendingRequests.add({
                url: requestData.url,
                canceller: canceller
            });
            requestData.timeout = canceller.promise;

            //calling http request 
            var requestPromise = $http(requestData)
                .success(function(response) {
                    return _success(response);
                })
                .error(function(response) {
                    return _error(response);
                });

            requestPromise.finally(function() {
                pendingRequests.remove(requestData.url);
            });

            return requestPromise;
        };
    }]);