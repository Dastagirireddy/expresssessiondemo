var app = angular.module('sampleApp');

app.factory('LoginFactory', function($http, $q){

	var _ = {};
	_.login = function(user) {

		return HttpService({
			method: 'POST',
			url: '/login',
			data: user
		});
	};
	_.getSession = function() {

		return HttpService({
			method: 'GET',
			url: '/active'
		});
	};
	_.logout = function() {

		return HttpService({
			method: 'GET',
			url: '/logout'
		});
	};

	function HttpService(config) {

		var deferred = $q.defer();

		$http(config).then(function(response){

			deferred.resolve(response.data);
		}, function(error){

			deferred.reject(error);
		});

		return deferred.promise;
	}
	
	return _;
});



