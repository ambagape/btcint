/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('tempoApp.home', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

                $stateProvider.state('secure.home', {
                    url: '/home',
                    controller: 'HomeCtrl',
                    templateUrl: 'home/home.html'
                });
            }])
                .controller('HomeCtrl',function(){
                    
                });