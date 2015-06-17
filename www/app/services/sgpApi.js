(function () {

    'use strict';

    angular.module("sgpApp").factory("sgpApi", ['$http', '$q', 'dataBus', '$ionicLoading', '$ionicPopup', sgpApi]);

    Date.prototype.format = function () {
        return moment(this).format('DD.MM.YYYY');
    }

    var _DEBUG = true;

    var user = {
        data: {},
        resellerId: 15616,
        set: function (param) {
            this.data = param;
        }
    };

    function sgpApi($http, $q, dataBus, $ionicLoading, $ionicPopup) {

        // forge ajax metodu (param: {path, data, dataType})
        function forgeAjax(param) {
            var deferred = $q.defer();
            var urlRoot = "http://mobileapi.sigortapro.com/Home/";
            var url = (param.path.indexOf('http')>-1) ? param.path : urlRoot + param.path;

            console.log("forgeAjax", url, param)

            $ionicLoading.show({ template: 'İşlem yapılıyor...' });

            if (_DEBUG) {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: param.data,
                    dataType: 'json',
                    success: function (data) {

                        $ionicLoading.hide();

                        console.log("gelen request datası:");
                        console.log(JSON.stringify(data));
                        console.log("***");

                        if (data.Status === 1) {
                            // başarılı sonuç döndü
                            deferred.resolve(data);
                        }
                        else {
                            // başarısız sonuç
                            var alertPopup = $ionicPopup.alert({
                                title: 'Hata Oluştu',
                                template: data.Description
                            });
                            alertPopup.then(function (res) {
                                deferred.reject(data);
                            });
                        }
                    },
                    error: function (error) {
                        // ajax hatası oluştu
                        $ionicLoading.hide();

                        console.log("ajax error");
                        console.log(JSON.stringify(error));

                        var alertPopup = $ionicPopup.alert({
                            title: 'Bağlantı Hatası',
                            template: 'Sunucuya bağlanırken hata oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.'
                        });
                        alertPopup.then(function (res) {
                            deferred.reject(error);
                        });
                    }
                });
            }
            else {
                forge.request.ajax({
                    type: "POST",
                    url: url,
                    data: param.data,
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    success: function (data) {

                        $ionicLoading.hide();

                        console.log("gelen request datası:");
                        console.log(JSON.stringify(data));
                        console.log("***");

                        if (data.Status === 1) {
                            // başarılı sonuç döndü
                            deferred.resolve(data);
                        }
                        else {
                            // başarısız sonuç
                            var alertPopup = $ionicPopup.alert({
                                title: 'Hata Oluştu',
                                template: data.Description
                            });
                            alertPopup.then(function (res) {
                                deferred.reject(data);
                            });
                        }
                    },
                    error: function (error) {
                        // ajax hatası oluştu
                        $ionicLoading.hide();

                        console.log("ajax error");
                        console.log(JSON.stringify(error));

                        var alertPopup = $ionicPopup.alert({
                            title: 'Bağlantı Hatası',
                            template: 'Sunucuya bağlanırken hata oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.'
                        });
                        alertPopup.then(function (res) {
                            deferred.reject(error);
                        });
                    }
                });
            }

            return deferred.promise;
        };

        // login
        var userLogin = function (userLoginData, callback) {
            
            userLoginData.resellerId = user.resellerId;

            return forgeAjax({
                        path: "CustomerLogin",
                        data: userLoginData
                   });
        };

        // kullanıcı kayd
        var registerUser = function(userRegisterData){
            
            userRegisterData.reseller_ID = user.resellerId;

            return forgeAjax({
                        path: "CustomerRegister",
                        data: userRegisterData
                   });
        };

        // poliçelerim
        var getUserProducts = function () {
            var deferred = $q.defer();

            console.log("getCustomerProducts");

            $http.get('app/fakeData/getCustomerProducts.json')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        };

        // varlıklarım
        var getUserAssets = function () {
            var deferred = $q.defer();

            var ast = [
                { AssetName: "Volkswagen Polo 1.4", AssetType: "Araç" },
                { AssetName: "Ford Focus 1.6 Otomatik", AssetType: "Araç" },
                { AssetName: "Bahçeşehir 1/4", AssetType: "Daire" }
            ];

            deferred.resolve(ast);

            return deferred.promise;
        };

        // poi getir
        var getLocations = function () {
            return forgeAjax({
                path: "http://mobileapi.sigortapro.com/Location/Locations",
                data: {
                    resellerId: user.resellerId
                }
            });
        };

        // *
        // hasar anında için servis noktaları getir
        var getServicesInfo = function () {
            return forgeAjax({
                path: "http://mobileapi.sigortapro.com/Location/Locations",
                data: {
                    resellerId: user.resellerId
                }
            });
        };

        // default form parametrelerini getir
        var getDefaultFormParameters = function () {
            // return forgeAjax({ path: "DefaultFormParameters" });

            var deferred = $q.defer();

            $http.get('app/fakeData/defaultFormParameters.json')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        };

        // araç alt sınıfları (param : araç sınıf kodu)
        var getVehicleSubClassList = function (vehicleClass) {
            return forgeAjax({
                path: "VehicleSubClassList",
                data: { vehicleClass: vehicleClass }
            });
        };

        // araç model yılları (param: araç marka kodu)
        var getVehicleYearList = function (brandCode) {

            console.log("getVehicleYearList", brandCode);

            return forgeAjax({
                path: "VehicleYearList",
                data: {brandCode: brandCode}
            });
        };

        // araç modeli (param: araç marka kodu, yıl)
        var getVehicleModelList = function (brandCode, year) {
            var deferred = $q.defer();

            console.log("getVehicleModelList", brandCode, year);

            return forgeAjax({
                path: "VehicleModelList",
                data: {
                    brandCode: brandCode, 
                    year: year
                }
            });
        };
        
        // tramer sorgusu (param: {sigortaliTuru, plakaIlKodu, plaka, kimlikNo})
        var getVehiclePrice = function (data) {
            return forgeAjax({
                path: "VehiclePrice",
                data: data
            });
        };

        var getCmsMenuItems = function () {
            //return forgeAjax({
            //    path: "http://mobileapi.sigortapro.com/cms/CmsCategories",
            //    data: { resellerId: user.resellerId }
            //});

            var deferred = $q.defer();

            console.log("cmsGetMenus");

            $http.get('app/fakeData/cmsGetMenus.json')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        };

        // tramer sorgusu (param: {sigortaliTuru, plakaIlKodu, plaka, kimlikNo})
        var tramerQuery = function (data) {
            return forgeAjax({
                path: "tramerEgm",
                data: data
            });
        };

        var getTownList = function (data) {
            // public JsonResult TownList(int cityId)
            return forgeAjax({
                path: "TownList",
                data: data
            });
        };

        // trafik teklifi
        var getTrafikProposal = function(kpd){
            var deferred = $q.defer();

            console.log("getProposalQuery", kpd);

            var param = [

                { KeyID: 1,  KeyName: "Sigortalı T.C. Kimlik No", KeyValueList : [ "12901476662" ] },
                { KeyID: 3,  KeyName: "Sigortalı Türü", KeyValueList : [ "G" ] },
                { KeyID: 4,  KeyName: "Plaka İl Kodu", KeyValueList : [ "34" ] },
                { KeyID: 5,  KeyName: "Plaka", KeyValueList : [ "YK001" ] },
                { KeyID: 6,  KeyName: "Sigortalı İkametgah İli", KeyValueList : [ "35" ] },
                { KeyID: 7,  KeyName: "Sigortalı İkametgah İlçesi", KeyValueList : [ "2013" ] },
                { KeyID: 19,  KeyName: "Poliçe Başlangıç Tarihi", KeyValueList : [ "15.04.2015" ] },
                { KeyID: 20,  KeyName: "Poliçe Bitiş Tarihi", KeyValueList : [ "15.04.2016" ] },
                { KeyID: 23,  KeyName: "Araç Marka Kodu", KeyValueList : [ "107" ] },
                { KeyID: 24,  KeyName: "Araç Tip Kodu", KeyValueList : [ "1092" ] },
                { KeyID: 25,  KeyName: "Araç Model Yılı", KeyValueList : [ "2014" ] },
                { KeyID: 26,  KeyName: "Araç Motor No", KeyValueList : [ "3478756436755" ] },
                { KeyID: 27,  KeyName: "Araç Şasi No", KeyValueList : [ "54678909709786500" ] },
                { KeyID: 30,  KeyName: "Eski Poliçesi Var Mı", KeyValueList : [ "H" ] },
                { KeyID: 37,  KeyName: "Plakasiz Araç Mı", KeyValueList : [ "E" ] },
                { KeyID: 42,  KeyName: "Araç Kullanım Türü", KeyValueList : [ "1" ] },
                { KeyID: 43,  KeyName: "Araç Tescil Tarihi", KeyValueList : [ "17.3.2015" ] },
                { KeyID: 44,  KeyName: "Yolcu Sayısı", KeyValueList : [ "4" ] },
                { KeyID: 86,  KeyName: "Sigortalı Telefon Türü", KeyValueList : [ "Is" ] },
                { KeyID: 88,  KeyName: "Sigortalı Telefonu Alan Kodu", KeyValueList : [ "212" ] },
                { KeyID: 89,  KeyName: "Sigortalı Telefonu Numarası", KeyValueList : [ "2122122" ] },
                { KeyID: 97,  KeyName: "Asbis No Mu", KeyValueList : [ "H" ] },
                // { KeyID: 99,  KeyName: "Tescil Serki Kod", KeyValueList : [  ] },
                // { KeyID: 100,  KeyName: "Tescil Seri No", KeyValueList : [  ] },
                { KeyID: 113,  KeyName: "Acente ID", KeyValueList : [ "3" ] },
                { KeyID: 114,  KeyName: "Acente Kullanıcı Adı", KeyValueList : [ "arkas" ] },
                { KeyID: 115,  KeyName: "Acente Şifre", KeyValueList : [ "test_arkas_657" ] },
                { KeyID: 123,  KeyName: "Araç Toplam Koltuk Sayısı", KeyValueList : [ "5" ] },
                { KeyID: 125,  KeyName: "Ürün Branşı", KeyValueList : [ "2" ] },
                { KeyID: 126,  KeyName: "Sigorta Şirketi", KeyValueList : [ "0" ] },
                { KeyID: 127,  KeyName: "Ürün", KeyValueList : [ "8", "9", "10", "11", "12", "21" ] },
                { KeyID: 137,  KeyName: "Sigortalı Uyruğu", KeyValueList : [ "TC" ] },
                { KeyID: 138,  KeyName: "Araç Kullanım Şekli", KeyValueList : [ "1" ] },
                { KeyID: 139,  KeyName: "Araç Alt Kullanım Şekli", KeyValueList : [ "1" ] },
                { KeyID: 142,  KeyName: "Trafige Çıkış Tarihi", KeyValueList : [ "01.01.2014" ] },
                { KeyID: 173,  KeyName: "Is Makinesi Mi", KeyValueList : [ "H" ] }
            ];

            return forgeAjax({
                path: "getProposal",
                data: {
                    requestKeyValueSet: JSON.stringify(param)
                }
            });
        };


        // teklif al (param: kpd[kasko proposal data])
        var getProposalQuery = function (kpd) {
            var deferred = $q.defer();

            console.log("getProposalQuery", kpd);

            var param = [

                //----------------------------------- sabit ---------------------------------------
                { KeyID: 125, KeyName: "Ürün Branşı", KeyValueList: [kpd.bransId] },
                { KeyID: 126, KeyName: "Sigorta şirketi", KeyValueList: ["0"] },

                //------------------------------------ araç ----------------------------------------
                { KeyID: 26,  KeyName: "trMotorNumarasi", KeyValueList : [ kpd.motorNumarasi ] },
                { KeyID: 27,  KeyName: "trSasiNumarasi", KeyValueList : [ kpd.sasiNumarasi ] },
                { KeyID: 142, KeyName: "trTrafigeCikisTarihi", KeyValueList : [ kpd.trafigeCikisTarihi.format() ] },
                { KeyID: 43,  KeyName: "trTescilTarihi", KeyValueList : [ kpd.tescilTarihi.format() ] },
                { KeyID: 38,  KeyName: "trAracSinifi", KeyValueList : [ kpd.aracSinifi.ParameterValue ] },
                { KeyID: 39,  KeyName: "trAracAltSinifi", KeyValueList : [ kpd.aracAltSinifi.ParameterValue ] },
                { KeyID: 23,  KeyName: "trAracMarkasi", KeyValueList : [ kpd.aracMarkasi.ParameterValue ] },
                { KeyID: 25,  KeyName: "trAracModelYili", KeyValueList : [ kpd.aracYili ] },
                { KeyID: 22,  KeyName: "trAracBedeli", KeyValueList : [ kpd.aracBedeli ] },
                { KeyID: 44,  KeyName: "trKisiSayisi", KeyValueList: [kpd.kisiSayisi.value] },
                { KeyID: 49,  KeyName: "trOnarimYapilacakServis", KeyValueList : [ kpd.onarimYapilacakServis.ParameterValue ] },
                { KeyID: 50,  KeyName: "trYedekParcaTuru", KeyValueList : [ kpd.yedekParcaTuru.ParameterValue ] },
                { KeyID: 158, KeyName: "trKullanimEsasi", KeyValueList : [ kpd.kullanimEsasi.ParameterValue ] },
                { KeyID: 42,  KeyName: "Araç Kullanım Türü", KeyValueList: ["1"] },
                { KeyID: 24, KeyName: "Araç Tip Kodu", KeyValueList: [ kpd.aracModeli.ModelCode ] }, ///*kpd.aracMarkasi.ParameterValue + '' + */
                { KeyID: 123, KeyName: "koltık sayısı", KeyValueList: [kpd.kisiSayisi.value] },
                { KeyID: 37, KeyName: "Plakasiz Araç Mı", KeyValueList: [ (!kpd.plakaDurumu.value).eh() ] },

                //------------------------------------ plaka -----------------------------------------
                { KeyID: 4, KeyName: "Plaka İl Kodu", KeyValueList: [kpd.plakaData.plakaIl.ParameterValue] },
                { KeyID: 5, KeyName: "Plaka", KeyValueList: [ kpd.plakaData.plaka ] },

                //------------------------------------ diğer ---------------------------------------
                { KeyID: 19, KeyName: "trYeniPoliceBaslangicTarihi", KeyValueList: [kpd.yeniPoliceBaslangicTarihi.format()] },
                { KeyID: 20, KeyName: "Poliçe Bitiş Tarihi", KeyValueList: [ kpd.policeBitisTarihi ] },
                { KeyID: 97, KeyName: "trAsbisNoMu", KeyValueList: [kpd.asbisNoMu.eh()] },
                { KeyID: 241, KeyName: "egmBaşarılı mı", KeyValueList: [ "E" /* kpd.egmBasarili.eh() */ ] },
                { KeyID: 30, KeyName: "eski poliçesi var mı", KeyValueList: [kpd.eskiPoliceVarMi.eh()] },
                { KeyID: 162, KeyName: "HDI indirim oranı yüzde olarak", KeyValueList: [ "0" ] },
                
                //-------------------------------- ek teminatlar ------------------------------------
                { KeyID: 111, KeyName: "trAnahtarIleCalinma", KeyValueList : [ kpd.anahtarIleCalinma.eh() ] },
                { KeyID: 112, KeyName: "trTedaviMasraflari", KeyValueList : [ kpd.tedaviMasraflari.eh() ] },
                { KeyID: 102, KeyName: "trYeniDegerKlozu", KeyValueList : [kpd.yeniDegerKlozu.eh()] },
                { KeyID: 8,   KeyName: "trSesSistemiVarMi", KeyValueList : [kpd.sesSistemi.eh()] },
                { KeyID: 9,   KeyName: "trGoruntuSistemiVarMi", KeyValueList : [kpd.goruntuSistemi.eh()] },
                { KeyID: 104, KeyName: "trKasaSigortasiIsteniyorMu", KeyValueList : [kpd.kasaSigortasi.eh()] },
                { KeyID: 106, KeyName: "trYurtIciTasTemMaliSorumluluk", KeyValueList : [ kpd.yurtIciTasTemMaliSorumluluk.eh() ] },
                // { KeyID: 108, KeyName: "trTasinanYukTeminati", KeyValueList : [ kpd.tasinanYukTeminati.eh() ] },
                { KeyID: 29,  KeyName: "trLPGliArac", KeyValueList : [ kpd.lpgliArac.eh() ] },
                { KeyID: 101, KeyName: "trEngelliAraciMi", KeyValueList : [ kpd.engelliAraci.eh() ] },
                { KeyID: 124, KeyName: "trKiralikAracMi", KeyValueList : [ kpd.kiralikArac.eh() ] },
                { KeyID: 103, KeyName: "trSurucuKursuAraciMi", KeyValueList : [ kpd.surucuKursuAraci.eh() ] },
                { KeyID: 135, KeyName: "trSaglik", KeyValueList : [ kpd.saglikTeminati.eh() ] },
                { KeyID: 110, KeyName: "trKilitSistemi", KeyValueList : [ kpd.kilitSistemi.eh() ] },
                { KeyID: 45,  KeyName: "trYurtDisiTeminati", KeyValueList : [ kpd.yurtdisiTeminati.eh() ] },
                { KeyID: 18,  KeyName: "trFK", KeyValueList : [ kpd.ferdiKaza.ParameterValue ] },
                { KeyID: 17,  KeyName: "trIMM", KeyValueList : [ kpd.iim.ParameterValue ] },
                { KeyID: 14,  KeyName: "trDigerAksesuar", KeyValueList : [ kpd.digerAksesuar.eh() ] },
                { KeyID: 143, KeyName: "trKazaDestek", KeyValueList : [ kpd.kazaDestek.eh() ] },
                { KeyID: 144, KeyName: "trHasarsizlikKoruma", KeyValueList: ["H" /* kpd.hasarsizlikTeminati.eh()*/ ] },
                { KeyID: 146, KeyName: "trOperasyonelKiralik", KeyValueList : [ kpd.operasyonelKiralik.eh() ] },
                { KeyID: 145, KeyName: "trKullanimGelirKaybi", KeyValueList: [kpd.kullanimGelirKaybi.eh()] },
                // { KeyID: 51,  KeyName: "taşınanYÜkTeminatıTipleri", KeyValueList : [ kpd.tasinanYukTeminatTipi.ParameterValue ] },

                //-------------------------------------- sigortalı ------------------------------------------
                { KeyID: 1,   KeyName: "Sigortalı T.C. Kimlik No", KeyValueList: [kpd.plakaData.sigortaliTck] },
                { KeyID: 3,   KeyName: "sigortaliTuru", KeyValueList: [kpd.plakaData.sigortaliTuru.value] },
                
                // { KeyID: 196, KeyName: "trMusteriBaglantiTipi", KeyValueList: [kpd.musteriBaglantiTipi.ParameterValue] },
                // { KeyID: 197, KeyName: "trMusteriBaglantiliKurum", KeyValueList : [ kpd.musteriBaglantiliKurum.ParameterValue ] },
                
                { KeyID: 6,   KeyName: "trSliIkametgahIli", KeyValueList : [ 34 /* kpd.sigortaliIl.ParameterValue*/ ] },
                { KeyID: 7,   KeyName: "trSliIkametgahIlcesi", KeyValueList: [ 2049 /*kpd.sigortaliIlce.ParameterValue*/] },
                
                { KeyID: 160, KeyName: "trEhliyetAlmaYili", KeyValueList: [kpd.ehliyetAlmaTarihi.format() ] },
                
                { KeyID: 28,  KeyName: "trSliMeslekFaaliyet", KeyValueList : [ "1000" /* kpd.sigortaliMeslek.ParameterValue*/ ] },
                
                // { KeyID: 161, KeyName: "trYillikKullanimKm", KeyValueList: [ kpd.yillikKullanimKm ] },
                { KeyID: 91, KeyName: "Sigortalı Mahalle", KeyValueList: ["ambarlı mahallesi"] },
                { KeyID: 92, KeyName: "Sigortalı cadde", KeyValueList: ["cumhuriyet caddesi"] },
                { KeyID: 93, KeyName: "Sigortalı sokak", KeyValueList: ["güngör sokak"] },
                { KeyID: 94, KeyName: "Sigortalı apartman", KeyValueList: ["polsan apartmanı"] },
                { KeyID: 95, KeyName: "Sigortalı bina no", KeyValueList: ["14"] },
                { KeyID: 96, KeyName: "Sigortalı Daire No", KeyValueList: ["6"] },
                
                { KeyID: 21, KeyName: "Sigortali email", KeyValueList: ["murataa.tuglu@acerpro.com.tr"] },
                { KeyID: 86, KeyName: "Sigortali Telefon Türü", KeyValueList: ["Is"] },
                { KeyID: 88,  KeyName: "Sigortalı Telefonu Alan Kodu", KeyValueList: ["212"] },
                { KeyID: 89,  KeyName: "Sigortalı Telefonu Numarası", KeyValueList: ["3452445"] }
                
            ];

            // if (kpd.kasaTipi.ParameterValue)
                // param.push({ KeyID: 245, KeyName: "trKasaTipi", KeyValueList: [kpd.kasaTipi.ParameterValue] });

            if (kpd.asbisNoMu) {
                param.push({ KeyID: 98, KeyName: "trAsbisNo", KeyValueList: [kpd.asbisNo] });
            }
            else {
                param.push({ KeyID: 99, KeyName: "trTescilSeriKod", KeyValueList: [kpd.plakaData.tescilSeriKod] });
                param.push({ KeyID: 100, KeyName: "trTescilSeriNo", KeyValueList: [kpd.plakaData.tescilSeriNumarasi] });
            }                

            if (kpd.saglikTeminatiKisiSayisi)
                param.push({ KeyID: 136, KeyName: "sağlık teminatı kişi sayısı ", KeyValueList: [kpd.saglikTeminatiKisiSayisi] });

            if (kpd.yurtdisiTeminati) {
                param.push({ KeyID: 46,  KeyName: "yurt dışı teminatı süresi", KeyValueList : [ kpd.yurtDisiTeminatSuresi ] });
                param.push({ KeyID: 47,  KeyName: "yurtdışı teminatı başlangıç tarihi", KeyValueList : [ kpd.yurtDisiTeminatBaslangicTarihi ] });
                param.push({ KeyID: 48, KeyName: "yurt dışı teminatı bitiş tarihi", KeyValueList: [kpd.yurtDisiTeminatBitisTarihi] });
            }

            if (kpd.kasaBedeli) param.push({ KeyID: 105, KeyName: "kasaBEdeli", KeyValueList: [kpd.kasaBedeli] });

            if (kpd.digerAksesuar) {
                param.push({ KeyID: 15, KeyName: "diğer aksesuar açıklama", KeyValueList: [kpd.digerAksesuarMarka] });
                param.push({ KeyID: 16, KeyName: "diğer aksesuar fiyat", KeyValueList: [kpd.digerAksesuarBedel] });
            }

            if (kpd.eskiPoliceVarMi) {
                param.push({ KeyID: 31, KeyName: "Eski Poliçe Poliçe Numarası", KeyValueList: [kpd.eskiPoliceNo] });
                param.push({ KeyID: 32, KeyName: "Eski Poliçe Acente Numarası", KeyValueList: [kpd.eskiPoliceAcenteNo] });
                param.push({ KeyID: 33, KeyName: "Poliçe Sigorta Şirketi", KeyValueList: [kpd.eskiPoliceSirketi] });
                param.push({ KeyID: 34, KeyName: "Poliçe Yenileme No", KeyValueList: [kpd.eskiPoliceYenilemeNo] });
            }

            if (kpd.lpgliArac) {
                param.push({ KeyID: 35, KeyName: "fabrika çıkışlı mı", KeyValueList: [kpd.lpgFabrikaCikisli.eh()] });

                if (!kpd.lpgFabrikaCikisli) {
                    param.push({ KeyID: 36, KeyName: "lpg bedeli", KeyValueList: [ kpd.lpgBedeli ] });
                }
            }

            return forgeAjax({
                path: "getProposal",
                data: {
                    requestKeyValueSet: JSON.stringify(param)
                }
            });
        };

        return {
            user: user,
            userLogin: userLogin,
            registerUser: registerUser,
            getUserProducts: getUserProducts,
            getUserAssets: getUserAssets,
            getLocations: getLocations,
            getCmsMenuItems: getCmsMenuItems,
            getServicesInfo: getServicesInfo,
            getDefaultFormParameters: getDefaultFormParameters,
            getVehicleSubClassList: getVehicleSubClassList,
            getVehicleYearList: getVehicleYearList,
            getVehicleModelList: getVehicleModelList,
            getVehiclePrice: getVehiclePrice,
            tramerQuery: tramerQuery,
            getTownList: getTownList,
            getProposalQuery: getProposalQuery,
            getTrafikProposal: getTrafikProposal
        };
    }

})();