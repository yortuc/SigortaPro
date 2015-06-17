(function () {

    'use strict';

    angular.module("sgpApp").controller("RegisterCtrl", ['$scope', '$state', '$ionicModal', 'sgpApi', RegisterCtrl]);

    function RegisterCtrl($scope, $state, $ionicModal, sgpApi) {
        $scope.customerTypes = [{ text: "Kişi", value: 0 }, { text: "Firma", value: 1 }];
        $scope.profileData = {
            customerType: { value: 0 }
        };


        $scope.showSozlesme = function(){
            $ionicModal.fromTemplateUrl('app/user/sozlesme-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
              }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
              });
        };

        $scope.closeSozlesme = function(){
            $scope.modal.hide();
        };

        $scope.doRegister = function(profileData){
        	
            var data = {
                customer_type_ID: profileData.customerType.value,
                email: profileData.email,
                password: profileData.password,
                username: profileData.email
            };

            if(profileData.customerType.value===0){
                data.firstname = profileData.ad;
                data.lastname = profileData.soyad;
                data.mobilephone = profileData.cepTelefonu;
                data.tckimlikno = profileData.tckno;
            }
            else{
                data.tax_number = profileData.vergiNo;
                data.tax_agent = profileData.vergiDairesi;
                data.unvan1 = profileData.unvan;
            }

        	sgpApi.registerUser(data).then(function(ret){
                console.log("doRegister", ret);
        	});
			
        };
    }

})();