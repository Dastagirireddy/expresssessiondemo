var app = angular.module('sampleApp');

app.controller('LoginController', function($scope, $state, LoginService, LoginFactory){

	$scope.login = function() {

		console.log($scope.user);
		LoginFactory.login($scope.user).then(function(data){

			LoginService.isLoggedIn = true;
			console.log(data);
			LoginService.setCurrentUser(data);
			$state.go('dashboard');
		}, function(err){

			console.log(err);
		});
	};
});