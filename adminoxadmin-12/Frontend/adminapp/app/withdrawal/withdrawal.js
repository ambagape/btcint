
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('tempoApp.withdrawal', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider, $localStorage) {
                $stateProvider.state('secure.withdrawal', {
                    url: '/withdrawal',
                    controller: 'WithdrawalCtrl',
                    templateUrl: 'withdrawal/withdrawal.html'
                });
            }])

        .controller('WithdrawalCtrl', function ($scope, $localStorage, mLab) {
        	$scope.isProcessing = false;
            $scope.t = {};
            $scope.userId = $localStorage.user;
            $scope.withdraw = function(){            	
                console.log(data);
            }
         });
       
    