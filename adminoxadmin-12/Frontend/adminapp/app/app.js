'use strict';

// Declare app level module which depends on views, and components
angular.module('tempoApp', [
    'ui.router',
    'ngStorage',
    'angular-uuid',
    'datatables',
    'tempoApp.mailgun',
    'tempoApp.login',
    'tempoApp.register',
    'tempoApp.home',
    'tempoApp.version',
    'tempoApp.invest',
    'tempoApp.withdrawal',
    'tempoApp.transaction',
    'tempoApp.affiliate',
    'tempoApp.profile'
]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

    }]).constant('mLab', {
    url: 'https://api.mlab.com/api/1/databases/tempodb/collections',
    apiKey: '66K6kMrv_mbqbOQv8Q5aW5at3-p9lAdv'
}).constant('config', {
    domain: 'sandboxc5c1d020790b4ad4b4deefb14da0a94a.mailgun.org',
    mailServer: 'http://localhost/tempo/adminoxadmin-12/Frontend/server/mailer.php'
}).constant('btc',{
    url: 'localhost:3000',
    guid:'74c37cc8-2916-4a56-87a6-c40b4804e4fb',
    apiKey:'e025fb56-33da-4cc6-a07f-a970cabfb36c',
    password:"t1e2m1p9o"
}).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('secure', {
            abstract: true,
            url: '/secure',
            controller: 'SecureCtrl',
            templateUrl: 'secure.html'
        });
    }])
        .controller('SecureCtrl', function ($localStorage, $state, $scope) {
            $("body").removeClass("bg-accpunt-pages");
            if (!$localStorage.user) {
                $state.go('login', []);
            }

            $scope.logout = function () {
                $localStorage.user = null;
                $state.go('login', []);
            };
        });
