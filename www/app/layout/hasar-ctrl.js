(function () {

    'use strict';

    angular.module("sgpApp").controller("HasarCtrl", ['$scope', 'sgpApi', HasarCtrl]);

    function HasarCtrl($scope, sgpApi) {

        sgpApi.getServicesInfo().then(function (data) {
            $scope.servisler = data.Data[0].PoiDetails;
        });

        $scope.call = function (tel) {
            console.log(tel);
            document.location.href = 'tel:' + tel;
        };

        $scope.mail = function (mail) {
            console.log(mail);
            document.location.href = 'email:' + mail;
        };
    };

})();