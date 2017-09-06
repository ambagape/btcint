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

        .controller('LoginCtrl', function ($scope,$state, $http, mLab, $localStorage) {
            $scope.isLoading = false;
            $scope.login = {};
           
            $scope.loginAction = function () {
                $scope.isLoading = true;
                var query = {email: $scope.login.email};
                $http.get(mLab.url + '/person?apiKey=' + mLab.apiKey + '&q=' + JSON.stringify(query))
                        .then(function (data) {
                            if (data.data.length > 0 && data.data[0].password === $scope.login.password && data.data[0].isActivated ) {
                                $scope.isLoading = false;
                                $localStorage.user= data.data[0];
                                $state.go("secure.home",[]);

                            } else {
                                $scope.isLoading = false;
                                $scope.err = "Username or password is wrong";
                            }
                        }, function (err) {
                            $scope.isLoading = false;
                            alert("An error occured on the server. Please, try again later.");
                        });
            };


        })
        .controller('RecoverCtrl', function ($scope, $http, mLab) {
            $scope.isLoading = false;
            $scope.recover = function () {
                $scope.isLoading = true;
                var query = {email: $scope.email};
                $http.get(mLab.url + '/person?apiKey=' + mLab.apiKey + '&q=' + JSON.stringify(query))
                        .then(function (data) {
                            $scope.isLoading = false;
                            if (data.data.length > 0) {
                                $scope.err = "User does not exist";
                            } else {
                                $scope.err = "User does not exist";
                            }
                        }, function (err) {
                             $scope.isLoading = false;
                            alert("An error occured on the server. Please, try again later.");
                        });
            };


        })
        .controller('ActivateCtrl', function ($stateParams, $http, mLab, $state) {
            try {
                var query = {email: $stateParams.email, activationCode: $stateParams.code};
                $http.get(mLab.url + '/person?apiKey=' + mLab.apiKey + '&q=' + JSON.stringify(query))
                        .then(function (data) {
                            if (data.data.length > 0) {
                                //var param = {email: $stateParams.email};
                                data.data[0].isActivated = true;
                                $http.put(mLab.url + '/person/' + data.data[0]._id.$oid + '?apiKey=' + mLab.apiKey, data.data[0]).then(function () {
                                    alert("Your account was activated successfully");
                                    $state.go('login', []);
                                }, function (e) {
                                    throw e;
                                });

                            }
                        }, function (e) {
                            throw e;
                        });
            } catch (e) {
                alert("Your account could not be activated.");
                $state.go('login', []);
            }

        });