
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('tempoApp.transaction', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider, $localStorage) {
                $stateProvider.state('secure.transaction', {
                    url: '/transaction',
                    controller: 'TransactionCtrl',
                    templateUrl: 'transaction/transaction.html'
                });
            }])

        .controller('TransactionCtrl', function ($scope, mLab) {
            
        });