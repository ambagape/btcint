'use strict';

// Declare app level module which depends on views, and components
angular.module('tempoApp', [
    'ui.router',
    'angular-uuid',
    'tempoApp.mailgun',
    'tempoApp.login',
    'tempoApp.register',
    'tempoApp.home',
    'tempoApp.version'
]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

    }]).constant('mLab',{
        url:'https://api.mlab.com/api/1/databases/tempodb/collections',
        apiKey:'66K6kMrv_mbqbOQv8Q5aW5at3-p9lAdv'
    }).constant('config',{
        domain: 'sandboxc5c1d020790b4ad4b4deefb14da0a94a.mailgun.org',
        mailServer: 'http://localhost/tempo/adminoxadmin-12/Frontend/server/mailer.php'
    });
