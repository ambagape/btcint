
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('tempoApp.profile', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider, $localStorage) {
                $stateProvider.state('secure.profile', {
                    url: '/profile',
                    controller: 'ProfileCtrl',
                    templateUrl: 'profile/profile.html'
                });
            }])

        .controller('ProfileCtrl', function ($scope,$localStorage, mLab, $q, $state, $filter, $http, config, DTOptionsBuilder, DTColumnBuilder) {
            $scope.isLoading = true;
            $scope.person = $localStorage.user;
            $scope.today = new Date().getTime();
             var query = {email: $localStorage.user.email};
            $http.get(mLab.url + '/transactions?apiKey=' + mLab.apiKey+ '&q=' + JSON.stringify(query)).then(function(data){
                $scope.depoSum = 0;
                $scope.withSum = 0;
                $scope.pendingWithdrawal = 0;
                for(var i=0; i<data.data.length; i++){
                    if(data.data[i].type==='deposit'){
                         $scope.depoSum = $scope.depoSum + data.data[i].amount;
                    }else{
                        if(data.data[i].status==='done'){
                            $scope.withSum = $scope.withSum + data.data[i].amount;
                        }else{
                            $scope.pendingWithdrawal = $scope.pendingWithdrawal + data.data[i].amount;
                        }
                        
                    }                   
                }
                
                $scope.isLoading = false;
            });
        });