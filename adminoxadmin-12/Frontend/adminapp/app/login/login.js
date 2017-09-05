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
                });
            }])

        .controller('LoginCtrl', [function ($scope, $http, mLab) {
                var query = {email: $scope.login.email};
                $http.get(mLab.url + '/person?apiKey=' + mLab.apiKey + '&q=' + JSON.stringify(query))
                        .then(function (data) {
                            if (data.data.length > 0) {
                                if (data.data[0].password === login.password) {

                                } else {
                                    err = "Username or password didn't match"
                                }
                            }
                        }, function (err) {
                            alert("An error occured on the server. Please, try again later.");
                        });

            }])
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