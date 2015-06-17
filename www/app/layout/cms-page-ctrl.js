(function () {

    'use strict';

    angular.module("sgpApp").controller("CmsPageCtrl", ['$scope', '$stateParams', '$ionicNavBarDelegate', 'sgpApi', CmsPageCtrl]);

    function CmsPageCtrl($scope, $stateParams,$ionicNavBarDelegate, sgpApi) {

        sgpApi.getCmsMenuItems().then(function (data) {

            console.log("parentID", $stateParams.menuId);

            $scope.menu = _.filter(data.Data, { id: parseInt($stateParams.menuId) })[0];

            $scope.subMenus = _.filter(data.Data, { parentId: parseInt($scope.menu.id) });

            //$ionicNavBarDelegate.title($scope.menu.content.title);
            $(".title-center").text($scope.menu.content.title)

            console.log($scope.menu, $scope.subMenus);
        });

    };

})();