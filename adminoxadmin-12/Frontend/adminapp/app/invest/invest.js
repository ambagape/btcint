/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular
		.module('tempoApp.invest', [ 'ui.router','monospaced.qrcode' ])
		.config( [
			    '$compileProvider',
			    function( $compileProvider )
			    {   
			        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|bitcoin):/);
			    }
			])
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
				function($scope, $localStorage, $http, config) {
					$scope.transaction = {address : null, amount:100,minAmount:'10',email : $localStorage.user.email,type : 'deposit',dateCreated : new Date()};
					$scope.isProcessing = false;
					$scope.isSent = false;
					$scope.plans= {
							'10':'120% After 1 Day - 20% profit',
							'50':'140% After 3 Days - 40% profit',
							'1000':'200% After 2 Day - 200% profit'
							}
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
												$scope.transaction.email = $localStorage.user.email;
												$scope.transaction.inBTC= data.data;
												$http
														.get(
																config.playServer
																		+ 'address')
														.then(
																function(data) {
																	$http.post(config.playServer + 'transaction',{
																		email:$localStorage.user.email,
																		amount:$scope.transaction.amount,
																		minAmount:$scope.transaction.minAmount,																		
																		dateCreated : new Date().getTime(),
																		address: data.data.address,
																		inBTC: $scope.transaction.inBTC
																	}).then(function(res){
																		$scope.transaction.address = data.data.address;
																		$scope.link = 'bitcoin:'+data.data.address+'?amount='+$scope.transaction.inBTC;
																		$scope.isProcessing = false;
																		$scope.isSent = true;
																	});
																	
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
					};
					
					$scope.encode = function(address, options) {
						  options = options || {};
						  var query = JSON.stringify(options);

						  if (options.amount) {
						    if (!isFinite(options.amount)) throw new TypeError('Invalid amount')
						    if (options.amount < 0) throw new TypeError('Invalid amount')
						  }

						  return 'bitcoin:' + address + (query ? '?' : '') + query
						};

				
				});