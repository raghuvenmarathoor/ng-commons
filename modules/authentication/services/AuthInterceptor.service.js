(function() {
    'use strict';
    angular.module('cs-authentication').factory('AuthInterceptor', AuthInterceptor);
    AuthInterceptor.$inject = ['$rootScope', 'AUTH_EVENTS'];
    /* @ngInject */
    function AuthInterceptor($rootScope, AUTH_EVENTS) {
        var service = {
            'requestError': requestError,
            'response': response,
            'request': request
        };
        ////////
        function requestError(request) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized,
                419: AUTH_EVENTS.sessionTimeout,
                440: AUTH_EVENTS.sessionTimeout,
            }[response.status], response);
        }

        function response(response) {
            return response;
        }

        function request(request) {
            return request;
        }
    }
})();
