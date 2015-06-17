(function () {

    'use strict';

    angular.module("sgpApp").controller("NearestCtrl", ['$scope', 'sgpApi', '$stateParams', NearestCtrl]);

    function NearestCtrl($scope, sgpApi, $stateParams) {

        var vm = this;

        $scope.title = "Servis Noktaları";

        angular.extend($scope, {
            center: {
                lat: 41,
                lng: 27
            },
            zoom: 13,
            markers: []
        });

        sgpApi.getLocations().then(function (data) {
            var bounds = new google.maps.LatLngBounds();
            var markers = [];
            data.Data[0].PoiDetails.forEach(function (d) {
                bounds.extend(new google.maps.LatLng(parseFloat(d.Land), parseFloat(d.Long)));
                markers.push({
                    latitude: parseFloat(d.Land), 
                    longitude: parseFloat(d.Long),
                    title: d.Name
                });
            });
            $scope.markers = markers;
            $scope.center.lat = bounds.getCenter().lat();
            $scope.center.lng = bounds.getCenter().lng();

            console.log($scope.markersProperty);
        });

    };



})();