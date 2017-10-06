'use strict';

angular.module('tempoApp.login', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

                $stateProvider.state('login', {
                    url: '/login',
                    controller: 'LoginCtrl',
                    templateUrl: 'login/login.html'
                }).state('activate', {
                    url: '/activate/:email/:code',
                    controller: 'ActivateCtrl',
                    templateUrl: 'login/login.html'
                }).state('recover', {
                    url: '/recover',
                    controller: 'RecoverCtrl',
                    templateUrl: 'login/recover.html'
                });
            }])
        .controller('LoginCtrl', function ($scope,$state, $http, $localStorage, config) {
            $scope.isLoading = false;
            $scope.login = {};
           
            $scope.loginAction = function () {
                $scope.isLoading = true;
                var query = {email: $scope.login.email};
                $http.post(config.playServer + 'person/signin',{
                	email: $scope.login.email,
                	password: $scope.login.password
                }).then(function (data) {
                            $localStorage.token = data.data.token;
                            $localStorage.user = data.data;
                        	$scope.isLoading = false;
                            $state.go("secure.profile",[]);
                           
                        }, function (err) {
                        	$scope.isLoading = false;
                            $scope.err = "Username or password is wrong";
                        });
            };


        })
        .controller('RecoverCtrl', function ($scope, $http) {
            $scope.isLoading = false;
            $scope.recover = function () {
                $scope.isLoading = true;
               
            };


        })
       