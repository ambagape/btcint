
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('tempoApp.affiliate', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider, $localStorage) {
                $stateProvider.state('secure.affiliate', {
                    url: '/affiliate',
                    controller: 'AffiliateCtrl',
                    templateUrl: 'affiliate/affiliate.html'
                });
            }])

        .controller('AffiliateCtrl', function ($scope,$localStorage, $q, $state, $filter, $http, config, DTOptionsBuilder, DTColumnBuilder) {
            $scope.person = $localStorage.user;
            
        });