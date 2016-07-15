(function() {
    'use strict';
    angular.module('cs-authentication').config(RegisterInterceptor);
    RegisterInterceptor.$inject = ['$httpProvider'];
    /**
    This function will register auth interceptor to $http service
    */
    function RegisterInterceptor($httpProvider) {
        $httpProvider.interceptors
            .push(['$injector',
                function($injector) {
                    return $injector.get('AuthInterceptor');
                }
            ]);
    }
})();