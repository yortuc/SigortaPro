
(function () {

    'use strict';

    angular.module("sgpApp").controller("ProductsCtrl", ['$scope', 'sgpApi', '$state', ProductsCtrl]);

    function ProductsCtrl($scope, sgpApi, $state) {

        $scope.kategoriler = [{ text: "Kasko" }, { text: "Trafik" }, { text: "Sağlık" }, { text: "Konut" }];

        sgpApi.getUserProducts().then(function (data) {
            var products = data.Data;

            for (var i = 0; i < $scope.kategoriler.length; i++) {
                $scope.kategoriler[i].sayi = _.filter(products, { insuranceType: $scope.kategoriler[i].text }).length;
                $scope.kategoriler[i].index = i;
            }

            console.log($scope.kategoriler);
        });

        $scope.doAction = function (item) {
            console.log(item);
            if (item.text == "Kasko") {
                $state.transitionTo("app.proposal-kasko");
            }
        };
    };



})();