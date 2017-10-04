
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

        .controller('TransactionCtrl', function ($scope,$localStorage, mLab, $q, $state, $filter, $http, config, DTOptionsBuilder, DTColumnBuilder) {
            
            $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
                var defer = $q.defer();
                var query = {email: $localStorage.user.email};
                $http.get(mLab.url + '/transactions?apiKey=' + mLab.apiKey+ '&q=' + JSON.stringify(query)).then(function (result) {
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
                DTColumnBuilder.newColumn('amount').withTitle('Capital'),
                DTColumnBuilder.newColumn('interest').withTitle('Interest'),
                DTColumnBuilder.newColumn('withdrawalStatus').withTitle('Withdrawal Status'),
                DTColumnBuilder.newColumn('withdrawalDate').withTitle('Withdrawal Date').renderWith(function (data, type, full) {
                    return $filter('date')(data);
                }),
               
                DTColumnBuilder.newColumn('depositDate').withTitle('Deposit Date')
                        .renderWith(function (data, type, full) {
                            return $filter('date')(data);
                        })
            ];
        });