
(function () {

    'use strict';

    angular.module("sgpApp").controller("ProductDetailCtrl", ['$scope', 'sgpApi','$stateParams', ProductDetailCtrl]);

    function ProductDetailCtrl($scope, sgpApi, $stateParams) {

        var index = $stateParams.kategoriIndex;

        $scope.kategoriler = [{ text: "Kasko" }, { text: "Trafik" }, { text: "Sağlık" }, { text: "Konut" }];

        $scope.kategori = $scope.kategoriler[index].text;

        sgpApi.getUserProducts().then(function(data){
            $scope.products = _.filter(data.Data, { insuranceType: $scope.kategori });
            console.log($scope.products);
        });

        $scope.teklifAl = function () {

        };
        
    };



})();