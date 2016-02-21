'use strict';
/**
 * @ngdoc service
 * @name housyApp.service:APIInterceptor
 * @description
 * # APIInterceptor
 * Service for intercepting the http request and response and change according to need
 */
angular.module('housyApp')
    .service('APIInterceptor',['$q', '$rootScope', '$localStorage','ENV', function($q, $rootScope, $localStorage,ENV) {
        //@param service - http service to override
        var service = this;
        var apiUri = ENV.host;
        // var apiUri = '/v1/';

        /**
         * @ngdoc
         * @name housyApp.service:APIInterceptor:tranformRequest
         * @methodOf housyApp.service:APIInterceptor   
         * @param {object} obj data to be transform
         * @return {string} Return transformed string
         *
         * @description
         * Method convert the json request object to form request as server only accept the form request not the json request.
         */
        var tranformRequest = function(obj) {
            var str = [];
            for (var p in obj){
                //if the parameter is true and its object then ignore it for form building 
                if(obj[p] && typeof(obj[p]) === 'object' && obj[p].constructor !== Array){
                    continue;
                }
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
            return str.join('&');
        };
        
        /**
         * @ngdoc
         * @name housyApp.service:APIInterceptor:request
         * @methodOf housyApp.service:APIInterceptor   
         * @param {object} config configuration options for the httpRequest 
         * @return {object} Return transformed config response
         *
         * @description
         * Method to change the api request when api request url contains the string <b>'api/'</b>
         * <br>Method will add the <b>authentication token</b> and <b>user_role</b> if user is logged in
         */
        service.request = function(config) {
            if (config.url.indexOf(apiUri) !== -1) {
                if(config.method!='GET'){
                    //add authtoken
                    if ($localStorage.user) {
                        config.data.authentication_token = $localStorage.user.auth_token;
                    }
                    config.data = tranformRequest(config.data);
                    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                } else {
                    //add the auth token
                    if(config.url.indexOf('?')>0){
                        config.url = config.url+'&authentication_token='+$localStorage.user.auth_token;
                    } else {
                        config.url = config.url+'?authentication_token='+$localStorage.user.auth_token;
                    }
                }
            }
            return config;
        };
        
        /**
         * @ngdoc
         * @name housyApp.service:APIInterceptor:response
         * @methodOf housyApp.service:APIInterceptor   
         * @param {object} reponse response data of http response
         * @return {object} Returns modified reponse data or reject the data 
         *
         * @description
         * Method to change the reponse of http request
         * <ul>
         *     <li>If reponse url do not contain the <b>/api/</b> string then return the response as it is </li>
         *     <li>If response do not contains the <b>data</b> object or <b>data</b> is not JSON object then response will be rejected with the predefined response message which can be interpreted by all the http services</li>
         *     <li>If response do not contains the <b>data.result</b> or <b>data.result.rstatus</b> or <b>data.result.rstatus</b> is erroStatus then the response will be rejected with the response as it because this time response will contain the reson for failure
         *     </li>
         *     <li>If all is well then check if the response data contains the <b>"data.data"</b> object , because this object contains the all response parameters inside it</li>
         * </ul>
         * <br>Method will add the <b>authentication token</b> and <b>user_role</b> if user is logged in
         */
        service.response = function(response) {
            //@param errorStatus error code for the response for medgenie server
            var errorStatus = 0;

            //@param errorResponse toset when any type of error occurs
            var errorResponse = {
                data: {
                    result: {
                        messages: 'It seems server is busy or down.Please retry after sometime'
                    }
                }
            };

            //check response in case of apis only 
            if (response.config.url.indexOf(apiUri) === -1 || response.config.url.indexOf('fblogin') !==-1) {
                return response;
            }

            //check if response is objct
            if (!response.data || typeof response.data !== 'object' || response.data === null) {
                console.error('APIInterceptor : bad response type');
                return $q.reject(errorResponse);
            }

            //if response is valid json and status is error status then reject
            if (!response.data.result || !response.data.result.rstatus || response.data.result.rstatus === errorStatus) {
                console.error('APIInterceptor : error in api response');
                return $q.reject(response);
            }

            //if data object is not there then its invalid type of data
            // if (!response.data.data) {
            //     console.error('APIInterceptor : No data contained in response');
            //     return $q.reject(errorResponse);
            // }
            return response;
        };

        /**
         * @ngdoc
         * @name housyApp.service:APIInterceptor:responseError
         * @methodOf housyApp.service:APIInterceptor   
         * @param {object} reponse response data of http response
         * @return {object} Returns rejected response data
         *
         * @description
         * Method to change the error response
         * <ul>
         *     <li>If response do not contain the string <b>"/api/"</b> then return</li>
         *     <li>If request is timedout with <b> response.config.timeout.$$state.processScheduled === false</b> then modify the response with the custom errorcode[900] and message[<b>Request is cancelled by the user</b>]- This is the case when user forcefully cancel the request</li>
         *     <li>If response contains the url <b>"connectionError"</b> then modify the response with custom errorCode[800] and messagep[<b>Please check your internet connection</b>] - This is the case when connection plugin from the device says there is no internet connection
         *     </li>
         *     <li>If there are other response error then show only one error message - <b>It seems server is busy or down.Please retry after sometime</b></li>
         * </ul>
         * <br>Method will add the <b>authentication token</b> and <b>user_role</b> if user is logged in
         */
        service.responseError = function(response) {
            //if this is not an api call just ignore the call 
            if (response.config.url.indexOf(apiUri) === -1) {
                return $q.reject(response);
            } else { //else proceed
                console.error('APIInterceptor : error with status :: ' + response.status);

                if(response.config.timeout.$$state.processScheduled === false){
                    response.data = {
                        result: {
                            messages: 'Request is cancelled by the user',
                            errorcode: 900
                        }
                    };
                } else if (response.config.url.indexOf('connectionError') !== -1) {
                    response.data = {
                        result: {
                            messages: 'Please check your internet connection',
                            errorcode: 800
                        }
                    };
                } else { //if this is api response then response with the custome message
                    response.data = {
                        result: {
                            messages: 'It seems server is busy or down.Please retry after sometime'
                        }
                    };
                }

                return $q.reject(response);
            }
        };
    }]);