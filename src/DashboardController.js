var app = angular.module('sampleApp');

app.controller('DashboardController', function($scope, LoginFactory, LoginService, $state){

	$scope.logout = function() {

		LoginFactory.logout().then(function(data){

			LoginService.isLoggedIn = false;
			LoginService.setCurrentUser(null);
			$state.go('login');
		}, function(err){

			console.log(err);
		});
	};
});