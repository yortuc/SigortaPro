(function () {

    'use strict';

    angular.module("sgpApp").controller("ProposalResultCtrl", ['$scope', 'sgpApi', 'dataBus', ProposalResultCtrl]);

    function ProposalResultCtrl($scope, sgpApi, dataBus) {
        $scope.proposals = dataBus.getProposals();
    }

})();