
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

        .controller('TransactionCtrl', function ($scope,$localStorage, config, $q, $state, $filter, $http, DTOptionsBuilder, DTColumnBuilder) {
            
            $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
                var defer = $q.defer();
                $http.get(config.playServer + 'transaction/all/'+$localStorage.user.email).then(function (result) {
                    for(var i=0; i<result.data.length;i++){
                    	if(result.data[i].status==='pending'){
                    		result.data.splice(i,1);
                    		i = i-1;
                    	}
                    }
                	defer.resolve(result.data);
                    
                },function(data){
                    console.log(data);
                });
                return defer.promise;
            }).withPaginationType('full_numbers')
                    .withDOM('pitrfl');
             $scope.dtColumns = [
                
                DTColumnBuilder.newColumn('minAmount').withTitle('Plan') .renderWith(function (data, type, full) {
                    if(data==10){
                    	return 'Basic';
                    }else if(data==50){
                    	return 'Pro';
                    }else{
                    	return 'VIP';
                    }
                }),
                DTColumnBuilder.newColumn('amount').withTitle('Capital').renderWith(function (data, type, full) {
                    return $filter('currency')(data);
                }),
                DTColumnBuilder.newColumn('interest').withTitle('Interest').renderWith(function (data, type, full) {
                    return $filter('currency')(data);
                }),
                DTColumnBuilder.newColumn('withdrawalStatus').withTitle('Withdrawal Status')
                
            ];
        });