
(function () {

    'use strict';

    angular.module("sgpApp").controller("LoginCtrl", ['$scope', '$state', 'sgpApi', LoginCtrl]);

    function LoginCtrl($scope, $state, sgpApi) {

        $scope.loginData = {
            userName: "craifyaman@gmail.com",
            password: "asdasd"
        };

        $scope.doLogin = function () {

            console.log('Doing login', $scope.loginData);

            var loginDef = sgpApi.userLogin($scope.loginData);
            loginDef.then(function (data) {
                sgpApi.user.set(data.Data);
                $state.transitionTo("app.main");
            });
        };

    };



})();