
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

        .controller('WithdrawalCtrl', function ($scope, $localStorage, mLab, config, $http) {
        	$scope.isProcessing = false;
            $scope.bal = $localStorage.user.balance;
            $http.get(config.playServer+'transaction/w/'+$localStorage.user.email).then(function(data){
            	$scope.monies = data.data;
            	
            });
            $scope.withdraw = function(){       
            	$scope.isProcessing = true;
                $http.get(config.playServer + 'transaction/w/'+$scope.tuid+'/'+$scope.address).then(function(data){
					alert("Your transaction was successful.");	
					$scope.isProcessing = false;
				},function(err){
					alert(err.data);
					$scope.isProcessing = false;
				});
            }
         });
       
    