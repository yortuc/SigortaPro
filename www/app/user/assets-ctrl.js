
(function () {

    'use strict';

    angular.module("sgpApp").controller("AssetsCtrl", ['$scope', 'sgpApi', '$ionicActionSheet', AssetsCtrl]);

    function AssetsCtrl($scope, sgpApi, $ionicActionSheet) {

        $scope.addAsset = function () {
            // Show the action sheet
            var sheet = $ionicActionSheet.show({
                buttons: [
                  { text: 'Araç Ekle' },
                  { text: 'Konut Ekle' },
                  { text: 'Kişi Ekle' }
                ],
                titleText: 'Varlık Ekle',
                cancelText: 'İptal',
                cancel: function () {
                },
                buttonClicked: function (index) {
                    return true;
                }
            });
        };

        sgpApi.getUserAssets().then(function (data) {
            $scope.assets = data;
        });

        
    }

})();