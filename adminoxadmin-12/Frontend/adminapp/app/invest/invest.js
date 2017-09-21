
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('tempoApp.invest', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider, $localStorage) {
                $stateProvider.state('secure.invest', {
                    url: '/invest',
                    controller: 'InvestCtrl',
                    templateUrl: 'invest/invest.html'
                });
            }])

        .controller('InvestCtrl', function ($scope, $localStorage, mLab) {
            $scope.investment = {};
            $scope.investment.dateCreated = new Date();
            $scope.investment.userId = $localStorage.user
            $scope.invest = function(){
                $http.post(mLab + '/investment?apiKey=' + mLab.apiKey,investment).then(function(data){  
                    $http.get(mLab + '/person?apiKey=' + mLab.apiKey + '&q=' + JSON.stringify({email:$localStorage.user.email})).then(function(data){
                        data.data[0].balance = data.data[0].balance + investment.amount;
                        $http.put(mLab.url + '/person/' + data.data[0]._id.$oid + '?apiKey=' + mLab.apiKey, data.data[0]).then(function () {
                                    alert("Transaction successful");
                                }, function (e) {
                                    throw e;
                                });

                    });
                    console.log(data);
                });
            };
        });