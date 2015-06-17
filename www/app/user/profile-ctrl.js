(function () {

    'use strict';

    angular.module("sgpApp").controller("ProfileCtrl", ['$scope', '$state', 'sgpApi', ProfileCtrl]);

    function ProfileCtrl($scope, $state, sgpApi) {

        $scope.profileData = sgpApi.user.data;

        console.log($scope.profileData);

        //sgpApi.getUserProfile().then(function (data) {
        //    sgpApi.user.set(data);
        //});

    }

})();