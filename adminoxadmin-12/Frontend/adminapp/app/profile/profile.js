
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

        .controller('ProfileCtrl', function ($state, config, $scope,$localStorage, $q, $state, $filter, $http, DTOptionsBuilder, DTColumnBuilder) {
            $scope.isLoading = true;
            $scope.person = $localStorage.user;
            $scope.today = new Date().getTime();
            $http.get(config.playServer + 'transaction/all/'+$localStorage.user.email,{headers:{token:$localStorage.token}}).then(function(data){
                $scope.depoSum = 0;
                $scope.withSum = 0;
                $scope.pendingWithdrawal = 0;
                $scope.lastWithdrawal = 0;
                $scope.lastDeposit = 0;
                for(var i=0; i<data.data.length; i++){
                    if(data.data[i].status==='done'){
                         $scope.depoSum = $scope.depoSum + data.data[i].amount;
                         $scope.lastDeposit = data.data[i].amount;
                    }

                    if(data.data[i].withdrawalStatus==='done'){
                        $scope.withSum = $scope.withSum + data.data[i].amount+data.data[i].interest;
                        $scope.lastWithdrawal = data.data[i].amount+data.data[i].interest;
                    }else if(data.data[i].withdrawalStatus==='pending'){
                        $scope.pendingWithdrawal = $scope.pendingWithdrawal + data.data[i].amount+data.data[i].interest;
                    }
                        
                }
                $scope.isLoading = false;
            });
            
            $scope.update = function(){
            	$scope.isLoading = true;
            	$http.put(config.playServer + 'person/'+$localStorage.user._id.$oid,$scope.person,{headers:{token:$localStorage.token}}).then(function(data){
            		alert("Updated successfully");
            		$state.reload();
            		$scope.isLoading = false;
            	},function(err){
            		alert(err.data);
            	});
            }
        });