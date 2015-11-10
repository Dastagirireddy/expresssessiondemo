angular.module('sampleApp')
	.controller('SampleController', function($scope, SampleFactory){

		$scope.userNames = [];
		$scope.userLength = [];

		$scope.getGitData = function() {

			SampleFactory.getAllUsers().then(function(response){

				
			}, function(error){

				console.log(error);
			});
		};
	});