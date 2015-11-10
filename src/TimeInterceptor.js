var app = angular.module('sampleApp');

app.factory('TimeInterceptor', function(){

	return {
		request: function(config) {

			config.requestTimestamp = new Date().getTime();
			return config;
		},
		response: function(res) {

			res.responseTimestamp = new Date().getTime();
			var time = res.responseTimestamp - res.config.requestTimestamp;
			console.log('The request took ' + (time / 1000) + ' seconds.');
			return res;
		}
	};
});