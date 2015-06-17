
(function () {

    'use strict';

    angular.module("sgpApp").controller("ProposalKaskoCtrl", ['$scope', '$state', '$ionicPopup', 'sgpApi', 'dataBus', ProposalKaskoCtrl]);

    function ProposalKaskoCtrl($scope, $state, $ionicPopup, sgpApi, dataBus) {

        $scope.data = {
            plakaDurumu: { value: true },
            egmBilgiDurumu: {value: true },
            plakaData: {
                sigortaliTuru: { value: "G" },
                sigortaliTck: "37247123032",
                plaka: "HH5058",
                plakaIl: { ParameterValue: "34" },
                tescilSeriKod: "CC",
                tescilSeriNumarasi: "902553"
            },
            ehliyetAlmaTarihi: new Date(moment(new Date()).add(-4, 'years')),
            aracBedeli: 43000,
            eskiPoliceVarMi: false,
            motorNumarasi: "Z13DTH3910804",
            sasiNumarasi: "W0L0AHL48B2055642",
            trafigeCikisTarihi: new Date( moment(new Date()).add(-2, 'years') ), //'09.03.2015',
            tescilTarihi: new Date(), //'01.12.2014',
            yeniPoliceBaslangicTarihi: new Date(),
            policeBitisTarihi: moment(new Date()).add(1, 'years').format("DD.MM.YYYY"),
            tescilSeriNumarasi: "822461",
            detay: false,
            asbisNoMu: false,
            aracKullanimSekli: { ParameterValue: -1 },
            kisiSayisi: { value: 4 },
            onarimYapilacakServis: { 
                ParameterName: "Anlaşmalı Özel Servis",
                ParameterValue: "1" 
            },
            yedekParcaTuru: {
                ParameterName: "Eşdeğer Parça",
                ParameterValue: "E"
            },
            kullanimEsasi: {
                ParameterName: "Özel Otombil",
                ParameterValue: "1"
            },
            kasaTipi: {
                ParameterName: "Düz Kasa",
                ParameterValue: "1"
            },
            lpgFabrikaCikisli: false,
            anahtarIleCalinma: false,
            tedaviMasraflari: false,
            yeniDegerKlozu: false,
            lpgliArac: false,
            engelliAraci: false,
            surucuKursuAraci: false,
            saglikTeminati: false,
            kilitSistemi: false,
            yurtdisiTeminati: false,
            kazaDestek: false,
            kasaSigortasi: false,
            hasarsizlikTeminati: false,
            operasyonelKiralik: false,
            kullanimGelirKaybi: false,
            yurtIciTasTemMaliSorumluluk: false,
            tasinanYukTeminati: false,
            sesSistemi: false,
            kiralikArac: false,
            goruntuSistemi: false,
            digerAksesuar: false,
            ferdiKaza: { "ParameterValue": "1" },
            iim: { "ParameterValue": "1" },
            tasinanYukTeminatTipi: { "ParameterValue": "1" },
            musteriBaglantiTipi: { "ParameterValue": "1" },
            musteriBaglantiliKurum: { "ParameterValue": "1" },
            sigortaliIl: { "ParameterValue": "34" },
            sigortaliIlce: { "ParameterValue": "100" },
            sigortaliMeslek: { "ParameterValue": "1" },
            yillikKullanimKm: 100,

        };

        $scope.sigortaliGercek = true;
        $scope.tramerVar = false;

        $scope.sigortaliTuruChange = function(item){
            $scope.yillikKullanim = ($scope.data.plakaData.sigortaliTuru.value == 'G' && $scope.aracHususi);
            $scope.sigortaliGercek = (item.value === "G");

            console.log("yillikKullanim", $scope.yillikKullanim);
            console.log("sigortaliGercek", $scope.sigortaliGercek);
        };

        // araç tescil bilgi durumları
        $scope.egmBilgiDurumlari = [ { text: "Var", value: true },{ text: "Yok", value: false } ];
        $scope.egmBilgiDurumChange = function(){

            $scope.data.detay = (!$scope.data.plakaDurumu.value && !$scope.data.egmBilgiDurumu.value);

        };

        // plaka
        $scope.plakaDurumlari = [{ text: "Plaka Belli", value: true }, { text: "Plaka Belli Değil", value: false }];
        $scope.plakaDurumuChange = function (item) {
            console.log("plakaDurumuChange", item.text, item.value);

            $scope.data.detay = (!$scope.data.plakaDurumu.value && !$scope.data.egmBilgiDurumu.value);
        };

        // plaka datası
        $scope.sigortaliTurleri = [{ text: "Gerçek", value: "G" }, { text: "Tüzel", value: "E" }];

        //***************************** FAZ 2 *****************************

        $scope.aracKullanimSekilleri = [
            { ParameterName: "1A HUSUSİ", ParameterValue: "1" },
            { ParameterName: "1B ŞİRKET", ParameterValue: "2" },
            { ParameterName: "2A ŞEHİR İÇİ/DIŞI", ParameterValue: "3" },
            { ParameterName: "3A ŞEHİR İÇİ/DIŞI", ParameterValue: "4" },
            { ParameterName: "4A HUSUSİ", ParameterValue: "5" },
            { ParameterName: "11A HUSUSİ", ParameterValue: "6" },
            { ParameterName: "11B ŞİRKET", ParameterValue: "7" },
            { ParameterName: "1A HUSUSİ", ParameterValue: "8" },
            { ParameterName: "1A HUSUSİ", ParameterValue: "9" }
        ];

        // araç sınıfı
        $scope.aracSiniflari = [];
        $scope.aracSinifiChange = function (item) {
            // alt sınıfları getir
            console.log("aracSinifiChange", item);
            sgpApi.getVehicleSubClassList(item.ParameterValue).then(function (data) {
                $scope.aracAltSiniflari = data.Data;
            });

            $scope.aracKamyonet = (item.ParameterName === "KAMYONET");
            $scope.aracHususi = (item.ParameterName === "HUSUSİ");
            $scope.aracMinibus = (item.ParameterName === "MİNİBÜS");
            $scope.yillikKullanim = ($scope.data.plakaData.sigortaliTuru.value == 'G' && $scope.aracHususi);
        };

        // araç alt sınıfı
        $scope.aracAltSiniflari = [];
       
        // araç markası
        $scope.aracMarkalari = [];
        $scope.aracMarkasiChange = function (item, selectYear, selectModelCode) {
            // marka yıllarını getir
            console.log("aracMarkasiChange", item);
            sgpApi.getVehicleYearList(item.ParameterValue).then(function (data) {
                $scope.aracYillari = data.Data;

                if (selectYear) {
                    $scope.data.aracYili = parseInt(selectYear);
                    $scope.aracYiliChange(item, selectYear, selectModelCode);
                }
            });
        };

        // araç yılı
        $scope.aracYillari = [];
        $scope.aracYiliChange = function (brand, item, selectModelCode) {
            // araç modellerini getir
            console.log("aracYiliChange", brand, item);
            sgpApi.getVehicleModelList(brand.ParameterValue, item).then(function (data) {
                $scope.aracModelleri = data.Data;

                if (selectModelCode) {
                    $scope.data.aracModeli = { ModelCode: selectModelCode };
                    $scope.aracModeliChange(brand, $scope.data.aracModeli, $scope.data.aracYili);
                }
            });
        };

        $scope.aracModeliChange = function (marka, model, yil) {
            var qData = {
                brandCode: $scope.data.aracMarkasi.ParameterValue,
                modelCode: $scope.data.aracModeli.ModelCode,
                year: $scope.data.aracYili
            };

            sgpApi.getVehiclePrice(qData).then(function (priceData) {
                $scope.data.aracBedeli = parseInt(priceData.Data.KeyValueList[0]);
            });
        };


        $scope.aracModelleri = [];
        $scope.kisiSayilari = [{ text: "5", value: "5" }, { text: "4", value: "4" }, { text: "3", value: "3" }, { text: "2", value: "2" }];
        $scope.tescilTarihi = new Date();

        $scope.onarimYapilacakServisler = [
            { ParameterName: "Anlaşmalı Özel Servis", ParameterValue: "1" },
            { ParameterName: "Özel Servis", ParameterValue: "2" },
            { ParameterName: "Anlaşmalı Yetkili Servis ", ParameterValue: "3" },
            { ParameterName: "Yetkili Servis ", ParameterValue: "4" }
        ];

        $scope.yedekParcaTurleri = [ 
            {ParameterName: "Eşdeğer Parça", ParameterValue: "E" },
            {ParameterName: "Orjinal Parça", ParameterValue: "O" } 
        ];

        $scope.kullanimEsaslari = [
            { ParameterName: "Özel Otombil", ParameterValue: "1" },
            { ParameterName: "Kamyonet", ParameterValue: "2" },
            { ParameterName: "Hususi Kullanım", ParameterValue: "3" },
            { ParameterName: "Şehiriçi Minibüs ", ParameterValue: "4" },
            { ParameterName: "Okul Minibüsü", ParameterValue: "5" },
            { ParameterName: "Personel taşıyan Minibüs", ParameterValue: "6" },
            { ParameterName: "Mavi/Yeşil Plakalı Araç", ParameterValue: "7" },
            { ParameterName: "Bedensel Engelli Aracı", ParameterValue: "8" },
            { ParameterName: "Sürücü Kursu Aracı", ParameterValue: "9" }
        ];

        $scope.aracKullanimTurleri = [
            { ParameterName: "Özel", ParameterValue: "1" },
            { ParameterName: "Resmi", ParameterValue: "2" },
            { ParameterName: "Ticari", ParameterValue: "3" }
        ];

        $scope.kasaTipleri = [
            { ParameterName: "Düz Kasa", ParameterValue: "1" },
            { ParameterName: "Yatık Kasa", ParameterValue: "2" },
            { ParameterName: "Eğimli Kasa", ParameterValue: "3" }
        ];

        $scope.goruntuSistemi = false;
        $scope.goruntuSistemiMarka = "";
        $scope.goruntuSistemiBedel = "";

        $scope.musteriBaglantiTipleri = [
            { ParameterName: "WIFI", ParameterValue: "1" },
            { ParameterName: "Dial-up", ParameterValue: "2" },
            { ParameterName: "LAN", ParameterValue: "3" }
        ];

        $scope.musteriBaglantiliKurumlar = [
            { ParameterName: "KURUM #1", ParameterValue: "1" },
            { ParameterName: "KURUM #2", ParameterValue: "2" },
            { ParameterName: "KURUM #3", ParameterValue: "3" }
        ];

        $scope.tasinanYukTeminatTipleri = [
            { ParameterName: "Tip #1", ParameterValue: "1" },
            { ParameterName: "Tip #2", ParameterValue: "2" },
            { ParameterName: "Tip #3", ParameterValue: "3" }
        ];

        $scope.ikametgahIlChange = function(item){
            sgpApi.getTownList({ cityId: item.ParameterValue }).then(function (townData) {
                $scope.ilceler = townData.Data;
            });
        };

        // tramer sorgusu
        $scope.doTramerQuery = function (data) {

            var query = {
                sigortaliTuru: data.sigortaliTuru.value,
                plakaIlKodu: data.plakaIl.ParameterValue,
                plaka: data.plaka,
                kimlikNo: data.sigortaliTck,

                egmVarmi:  "H", //data.egmBilgiDurumu.value.eh(),
                asbisNoMu: "H", //data.asbisNoMu.value.eh(),
                tescilSerkiKod: data.tescilSeriKod,
                tescilSeriNo: data.tescilSeriNumarasi
            };

            // asbisNo: // data.asbisNo,

            sgpApi.tramerQuery(query).then(function (ret) {
                var retData = ret.Data;
                console.log("tramerDatası", retData);

                var egmSorgulandiMi = retData[15].KeyValueList[0];
                var egmBasariliMi = retData[16].KeyValueList[0];

                if(egmSorgulandiMi === "E" && egmBasariliMi === "H"){
                    var alertPopup = $ionicPopup.alert({
                        title: 'Hata',
                        template: 'Aracın EGM kaydı bulunamamıştır'
                    });
                    return;
                }

                $scope.data.eskiPoliceSirketi = retData[0].KeyValueList[0];
                $scope.data.eskiPoliceAcenteNo = retData[1].KeyValueList[0];
                $scope.data.eskiPoliceNo = retData[2].KeyValueList[0];
                $scope.data.eskiPoliceYenilemeNo = retData[3].KeyValueList[0];

                $scope.data.aracSinifi = { ParameterValue: retData[7].KeyValueList[0] };
                $scope.aracSinifiChange($scope.data.aracSinifi);

                $scope.data.aracMarkasi = { ParameterValue: retData[8].KeyValueList[0] };
                $scope.aracMarkasiChange({ ParameterValue: retData[8].KeyValueList[0] }, retData[10].KeyValueList[0], retData[9].KeyValueList[0]);

                $scope.data.motorNumarasi = retData[11].KeyValueList[0];
                $scope.data.sasiNumarasi = retData[12].KeyValueList[0];
                $scope.data.tescilTarihi = new Date(moment(retData[6].KeyValueList[0], "YYYYMMDD").toString());

                $scope.data.egmBasarili = (retData[15].KeyValueList[0] == "E") && (retData[16].KeyValueList[0] == "E");
                $scope.data.eskiPoliceVarMi = true;
                $scope.data.detay = true;
            });
        };

        // teklif al sorgusu
        $scope.doGetProposalQuery = function (kpd) {
            kpd.bransId = 1;
            sgpApi.getProposalQuery(kpd).then(function (data) {
                dataBus.setProposals(data.Data);
                $state.transitionTo("app.proposal-result");
            });
        };

        // form parametrelerini yükle
        sgpApi.getDefaultFormParameters().then(function (data) {
            console.log("getDefaultFormParameters", data);
            $scope.iller = data.Data[0];
            $scope.IIMler = data.Data[1];
            $scope.aracSiniflari = data.Data[2];
            $scope.FKlar = data.Data[3];
            $scope.aracMarkalari = data.Data[4];
            $scope.meslekler = data.Data[5];
            $scope.musteriBaglantiTipleri = data.Data[6];
            $scope.musteriBaglantiliKurumlar = data.Data[7];
        });
    };

})();