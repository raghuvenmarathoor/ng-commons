(function() {
    'use strict';
    angular.module('cs-authentication')
        .service('AuthService', AuthService);
    AuthService.$inject = ['$http', '$q', '$window', '$rootScope', '$log', 'localStorageService', 'Session',
        'USER_ROLES', 'AUTH_EVENTS', 'AUTH_USER_INFO'
    ];

    function AuthService($http, $q, $window, $rootScope, $log, localStorageService, Session, USER_ROLES, AUTH_EVENTS) {
        //login is to be handled in a separate app. So, login function is not required.
        var service = {};
        var requestingAuthInfo = false;

        service.logout = logout;
        service.isAuthenticated = isAuthenticated;
        service.hasPermission = hasPermission;
        service.checkAuthentication = getLoggedUser;
        service.getToken = getToken;

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, service.logout);
        $rootScope.$on(AUTH_EVENTS.sessionTimeout, service.logout);
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, service.logout);
        //probably not used in this app
        //$rootScope.$on(AUTH_EVENTS.loginSuccess, service.setCurrentUser);
        $rootScope.$on(AUTH_EVENTS.notAuthorized, function(eve, params) {
            PopupService.alert("Not Authorized!", "You are not authorized to view that page");
        });
        return service;
        //// functions
        function getToken() {
            // get token by any method
            return Session.token;
        }
        //login could be handled as separate app to authenticate the html contents
        function getLoggedUser() {
            var token = getToken();
            $log.debug("token:" + token);
            if (token && requestingAuthInfo == false) {
                $http.defaults.headers.common.Authorization = token;
                requestingAuthInfo = true;
                $http.get(rootConfig.BASE_URL + '/service/users/current').then(function(response) {
                    $log.debug("check success:", response.data);
                    Session.create(response.data.result.uid, response.data.result.name, response.data.result.roles);
                    requestingAuthInfo = false;
                }, function(errorResponse) {
                    requestingAuthInfo = false;
                    clientLogout();
                })
            } else if (requestingAuthInfo != true) {
                clientLogout();
            }
            if(!token){
                clientLogout();
            }

            //$http.get(rootConfig.BASE_URL + '/')
        }


        function logout() {
            //remove localstore values or any related sessions and values.
            $state.go('login');
            //$window.location.href = "login.html";
        }

        /*
        confirm that authentication loaded and values are available
        */
        function isAuthenticated() {
            if (Session.uid) {
                return true;
            } else {
                return false;
            }
        }

        function hasPermission(roles) {
            //TODO check has permission
            for (var i = 0; i < Session.userRoles.length; i++) {
                for (var j = 0; j < roles.length; j++) {
                    if (Session.userRoles[i] == roles[j]) {
                        return true;
                    }
                }

            }
            return false;
        }

        
    }
})();
