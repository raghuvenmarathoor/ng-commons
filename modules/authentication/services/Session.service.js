(function() {
    'use strict';
    angular.module('cs-authentication').service('Session', Session);

    Session.$inject = ['$injector', '$window', 'USER_ROLES'];

    function Session($injector, $window , USER_ROLES) {
        //TODO logging out or starting should have all access
        //console.log("session")
        this.userRoles = [USER_ROLES.ALL];
        this.create = create;
        this.destroy = destroy;
        this.getAuthHeader = getAuthHeader;
        this.isRole1 = isRole1;
        this.isRole2 = isRole2;
        var service = this;
        function isRole1() {
            if (getUserType() == 'parent') {
                return true;
            }
            return false;
        }

        function isRole2() {
            if (getUserType() == 'student') {
                return true;
            }
            return false;
        }


        function getUserType() {
            if (service.userRoles) {
                if (service.userRoles[0] == "ROLE_S") {
                    return "student";
                }

                if (service.userRoles[0] == "ROLE_P") {
                    return "parent";
                }

                if (service.userRoles[0] == "ROLE_T") {
                    return "teacher";
                }
                if (service.userRoles[0] == "ROLE_IA") {
                    return "admin";
                } else {
                    return null;
                }

            }
        }

        function getAuthHeader() {
            // you can use localstorage or any other forms of saving session in this area
            return Session.token;
        }

        function create(userId, userName, permissions, picpath, row) {
            service.uid = userId;
            service.userName = userName;
            service.userRoles = permissions;
            service.picpath = GlobalUtility.replace_image_urls(picpath);
            service.info = row.result;
        };

        function createFromAuth(authInfo) {
            create(authInfo.result.uid, authInfo.result.name, authInfo.result.roles, authInfo.result.picpath, authInfo);
        }

        function destroy() {
            //remove from authentication, if required
            service.userName = null;
            service.userRoles = [USER_ROLES.ALL];
            service.uid = null;
            service.picpath = null;
        };
    }

})();