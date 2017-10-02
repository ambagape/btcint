'use strict';

angular.module('tempoApp.register', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

                $stateProvider.state('register', {
                    url: '/register',
                    controller: 'RegisterCtrl',
                    templateUrl: 'register/register.html'
                });
            }])


        .controller('RegisterCtrl', function ($scope, $http, mLab, uuid, mailer, $location, $anchorScroll) {
            console.log('In the login cOntroller');
            $scope.isLoading = false;
            $scope.notification = false;
            $scope.register = function () {
                $scope.isLoading = true;
                try {
                    if ($scope.person.password !== $scope.password) {
                        throw "The two passwords do not match";

                    }
                    if ($scope.person.transCode !== $scope.transCode) {
                        throw "The two transaction codes do not match";

                    }

                    $scope.person.activationCode = uuid.v4();
                    $scope.person.isActivated = true;
                    $scope.person.dateCreated = new Date();
                    $scope.person.balance = 0;
                    var query = {email: $scope.person.email};

                    $http.get(mLab.url + '/person?apiKey=' + mLab.apiKey + '&q=' + JSON.stringify(query)).then(function (data) {
                        if (data.data.length < 1) {
                            $http.post(mLab.url + '/person?apiKey=' + mLab.apiKey, $scope.person)
                                    .then(function (data) {
                                        mailer.send($scope.person).then(function (res) {
                                            $scope.notification = true;
                                        }, function (err) {
                                            alert(err.msg);
                                        });

                                    }, function (err) {
                                        console.log(err);
                                        alert(err.msg);
                                    });
                        } else if (!data.data[0].isActivated) {
                            $http.put(mLab.url + '/person/'+data.data[0]._id.$oid+'?apiKey=' + mLab.apiKey, $scope.person)
                                    .then(function (data) {
                                        mailer.send($scope.person).then(function (res) {
                                            $scope.notification = true;
                                        }, function (err) {
                                            alert(err.msg);
                                        });

                                    }, function (err) {
                                        console.log(err);
                                        alert(err.msg);
                                    });
                        } else {
                            alert("This email already exists in our database.");
                            $scope.isLoading = false;
                        }

                    });
                } catch (err) {
                    $scope.err = err;
                    $location.hash('errDiv');
                    $anchorScroll();
                    $scope.isLoading = false;
                }


            };
        });