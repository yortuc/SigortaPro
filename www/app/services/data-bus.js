(function () {

    'use strict';

    angular.module("sgpApp").service("dataBus", [dataBus]);

    function dataBus() {

        // teklif datası
        var _proposals = [];
        var setProposals = function (data) {
            var lstFirmaTeklif = [];
            data.forEach(function (f) {
                var firmaAd = f.CompanyAndProductInfo[1].KeyValueList[0];
                var urun = f.CompanyAndProductInfo[3].KeyValueList[0];
                var teklifler = [];

                f.PriceInfo.forEach(function (p) {
                    var text = p.InstallmentNumber + " taksit, " + p.GrossPremium;
                    teklifler.push({ text: text });
                });

                lstFirmaTeklif.push({
                    urun: urun,
                    teklifler: teklifler,
                    firmaAd: firmaAd
                });
            });
            _proposals = lstFirmaTeklif;
        };
        var getProposals = function () {
            return _proposals;
        }

        return {
            setProposals: setProposals,
            getProposals: getProposals
        };
    }

})();