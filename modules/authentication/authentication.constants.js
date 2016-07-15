(function() {
    'use strict';
    angular.module('cs-authentication').constant('USER_ROLES', {
        ALL: '*',
        STUDENT: 'ROLE_1',
        TEACHER: 'ROLE_2',
        PARENT: 'ROLE_3',
        INTERNAL_ADMIN: 'ROLE_4'
    });

})();

(function() {
    'use strict';
angular.module('cs-authentication').constant('AUTH_EVENTS', {
    loginSuccess: 'login-success',
    loginFailed: 'login-failed',
    logoutSuccess: 'logout-success',
    sessionTimeout: 'session-timeout',
    notAuthenticated: 'not-authenticated',
    notAuthorized: 'not-authorized'
});
})();
