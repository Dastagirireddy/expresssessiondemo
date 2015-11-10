angular.module('sampleApp')
	.factory('SampleFactory', function($http, $q){

		var factory = {};

		factory.getAllUsers = function() {

			var deferred = $q.defer();

			$http.get('https://console.developers.google.com/storage/uspto-pair/').then(function(response){

				deferred.resolve(response.data);
			}, function(response){

				deferred.reject(response);
			});

			return deferred.promise;
		};
		return factory;
	});