'use strict';

angular.module('tempoApp.register', [ 'ui.router' ]).config(
		[ '$stateProvider', '$urlRouterProvider',
				function($stateProvider, $urlRouterProvider) {

					$stateProvider.state('register', {
						url : '/register',
						controller : 'RegisterCtrl',
						templateUrl : 'register/register.html'
					});
				} ])

.controller(
		'RegisterCtrl',
		function($scope, $http, mLab, uuid, mailer, $location, config, $anchorScroll, $localStorage ) {
			console.log('In the login cOntroller');
			$scope.isLoading = false;
			$scope.notification = false;
			$scope.register = function() {
				$scope.isLoading = true;
				try {
					if ($scope.person.password !== $scope.password) {
						throw "The two passwords do not match";

					}
					

					$scope.person.activationCode = uuid.v4();
					$scope.person.balance = 0;
					var query = {
						email : $scope.person.email
					};

					$http.post(config.playServer + 'person',
							$scope.person).then(function(data) {
						mailer.send($scope.person);
						$scope.notification = true;

					}, function(err) {
						console.log(err);
						alert(err.data);
						$scope.isLoading = false;
					});
					

				} catch (err) {
					$scope.err = err;
					$location.hash('errDiv');
					$anchorScroll();
					$scope.isLoading = false;
				}

			};
		});