// Ionic Starter App

Boolean.prototype.eh = function(){ 
    return this.valueOf() ? "E" : "H";
};

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('sgpApp', ['ionic', 'google-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    //Reset headers to avoid OPTIONS request (aka preflight)
    //$httpProvider.defaults.headers.common = {};
    //$httpProvider.defaults.headers.post = {};
    //$httpProvider.defaults.headers.put = {};
    //$httpProvider.defaults.headers.patch = {};

    $stateProvider

        .state('login', {
            url: "/login",
            templateUrl: "app/user/login.html",
            controller: "LoginCtrl"
        })

        .state('register', {
            url: "/register",
            templateUrl: "app/user/register.html",
            controller: "RegisterCtrl"
        })

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "app/layout/layout-menu.html"
        })

        .state('app.main', {
            url: "/main",
            views: {
                'mainContent': {
                    templateUrl: "app/layout/main.html"
                }
            }
        })

        .state('app.profile', {
            url: "/profile",
            views: {
                'mainContent': {
                    templateUrl: "app/user/profile.html"
                }
            }
        })

        .state('app.products', {
            url: "/products",
            views: {
                'mainContent': {
                    templateUrl: "app/user/products.html"
                }
            }
        })

        .state('app.product-detail', {
            url: "/product-detail/:kategoriIndex",
            views: {
                'mainContent': {
                    templateUrl: "app/user/product-detail.html"
                }
            }
        })

         .state('app.nearest', {
             url: "/nearest/:kategoriIndex",
             views: {
                 'mainContent': {
                     templateUrl: "app/user/nearest.html"
                 }
             }
         })

        .state('app.assets', {
            url: "/assets",
            views: {
                'mainContent': {
                    templateUrl: "app/user/assets.html"
                }
            }
        })

        .state('app.proposal', {
            url: "/proposal",
            views: {
                'mainContent': {
                    templateUrl: "app/proposal/proposal.html"
                }
            }
        })

        .state('app.proposal-kasko', {
            url: "/proposal/kasko",
            views: {
                'mainContent': {
                    templateUrl: "app/proposal/proposal-kasko.html"
                }
            }
        })

        .state('app.proposal-trafik', {
            url: "/proposal/trafik",
            views: {
                'mainContent': {
                    templateUrl: "app/proposal/proposal-trafik.html"
                }
            }
        })

        .state('app.proposal-result', {
            url: "/proposal/result",
            views: {
                'mainContent': {
                    templateUrl: "app/proposal/proposal-result.html"
                }
            }
        })

        .state('app.hasar', {
            url: "/hasar",
            views: {
                'mainContent': {
                    templateUrl: "app/layout/hasar.html"
                }
            }
        })

        .state('app.cms', {
            url: "/cms/:menuId",
            views: {
                'mainContent': {
                    templateUrl: "app/layout/cms-page.html"
                }
            }
        });

    $urlRouterProvider.otherwise('/login');
})

.filter("filtreTarih", function () {
    return function (x) {
        return new Date(parseInt(x.substr(6)));
    };
});
