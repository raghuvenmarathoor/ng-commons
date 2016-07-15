(function() {
    'use strict';
    angular.module('cs-authentication').run(run);
    run.$inject = ['$window', '$rootScope', '$state', '$http', 'AuthService', 'AUTH_EVENTS'];

    function run($window, $rootScope, $state, $http, AuthService, AUTH_EVENTS) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!Auth.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (Auth.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }
        });
    }
})();
