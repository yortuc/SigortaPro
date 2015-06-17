
(function () {

    'use strict';

    angular.module("sgpApp").controller("MainCtrl", ['$scope', 'sgpApi', MainCtrl]);

    function MainCtrl($scope, sgpApi) {

        $scope.hi = sgpApi.user.data.firstname + " " + sgpApi.user.data.lastname;

        // cms menü'leri getir
        sgpApi.getCmsMenuItems().then(function (data) {

            $scope.cmsMenus = _.filter(data.Data, { parentId: 0 });

            console.log($scope.cmsMenus);

        });

    };

})();