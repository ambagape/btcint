/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular
		.module('tempoApp.invest', [ 'ui.router','monospaced.qrcode' ])
		.config(
				[
						'$stateProvider',
						'$urlRouterProvider',
						function($stateProvider, $urlRouterProvider,
								$localStorage) {
							$stateProvider.state('secure.invest', {
								url : '/invest',
								controller : 'InvestCtrl',
								templateUrl : 'invest/invest.html'
							});
						} ])

		.controller(
				'InvestCtrl',
				function($scope, $localStorage, mLab, $http, config) {
					$scope.transaction = {address : null, amount:100,minAmount:'10',email : $localStorage.user.email,type : 'deposit',dateCreated : new Date()};
					$scope.isProcessing = false;
					$scope.isSent = false;
					$scope.invest = function() {
						if ($scope.transaction.amount < $scope.transaction.minAmount) {
							alert('Your deposit is too small for this plan.')
						} else {
							$scope.isProcessing = true;
							
							$http
									.get(
											config.playServer + 'transaction/'
													+ $scope.transaction.amount)
									.then(
											function(data) {
												$scope.transaction.inBTC= data.data;
												$http
														.get(
																config.playServer
																		+ 'address')
														.then(
																function(data) {
																	$scope.transaction.address = data.data.address;
																	$scope.isProcessing = false;
																	$scope.isSent = true;
																});

											},function(err){
												console.log(err);
											});
						}

					}
					
					
					$scope.apply = function(){
						$http.post(config.playServer + 'transaction/'+$localStorage.user._id['$oid'],$scope.transaction).then(function(data){
							alert("Payment applied successsfully");
						},function(err){
							alert(err.data);
						});
					}

				
				});