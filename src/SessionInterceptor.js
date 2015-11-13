var app = angular.module('sampleApp');

app.factory('SessionInterceptor', function($q, LoginService){

	return {
		request: function(config) {

			config.headers.Authorization = LoginService.getCurrentUser();
			return config;
		},
		requestError: function(rejection) {

			return $q.reject(rejection);
		},
		response: function(res) {

			console.log(res);

			if (res != null && res.status == 200 && !LoginService.isLoggedIn) {
			    LoginService.isLoggedIn = true;
			    LoginService.setCurrentUser(res.data.user);
			}

			return res || $q.when(res);
		},
		responseError: function(rejection) {

	        if (rejection != null && rejection.status === 401 && (LoginService.getCurrentUser() || LoginService.isLoggedIn)) {

	            LoginService.setCurrentUser(null);
	            LoginService.isLoggedIn = false;
	            //$state.go('login');
	        }

	        return $q.reject(rejection);
	    }
	}
});