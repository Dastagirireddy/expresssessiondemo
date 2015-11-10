var app = angular.module('sampleApp');

app.service('LoginService', function(){
	
	var self = this;
	var currentUser = null;

	self.isLoggedIn = false;
	self.setCurrentUser = function(user) {

		currentUser = user;
	};
	self.getCurrentUser = function() {

		return currentUser;
	}
});