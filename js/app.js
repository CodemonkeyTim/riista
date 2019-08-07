﻿var riistaApp;
var riistaControllers;

var APIURL = "http://xn--ltkvuoro-0zac.fi/riista/public";
//APIURL = "http://localhost:8000/";


function initAngular() {
    riistaControllers = angular.module('riistaControllers', []);

    riistaApp = angular.module('riistaApp', [
        'ngRoute',
        'pascalprecht.translate',
        'riistaControllers'
    ]);
}

function configAngular() {
    riistaApp.config(['$routeProvider', '$compileProvider', '$httpProvider', '$translateProvider',
        function($routeProvider, $compileProvider, $httpProvider, $translateProvider) {
            var simpleRoutes = [
                "landing"
            ]
            
            $.each(simpleRoutes, function(index, route) {
                $routeProvider.when("/" + route, {
                    templateUrl: "templates/" + route + ".html",
                    controller: route + "Ctrl"
                });
            });

            $routeProvider.otherwise({
                redirectTo: '/landing'
            });

            $translateProvider.useStaticFilesLoader({
                prefix: 'lang/',
                suffix: '.json'
            });
            
            var storedLang = localStorage.storedLang;

            if (!storedLang) {
                $translateProvider.preferredLanguage('fi');
            } else {
                $translateProvider.preferredLanguage(storedLang);
            }

            $translateProvider.useSanitizeValueStrategy('escape');

            //$httpProvider.defaults.withCredentials = true;
        }
    ]);
}