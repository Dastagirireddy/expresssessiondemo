var app = angular.module('sampleApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: '../login.html',
			controller: 'LoginController'
		})
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: '../dashboard.html',
			authorization: true,
			controller: 'DashboardController'
		})
		.state('users', {
			url: '/users',
			templateUrl: '../users.html',
			authorization: true,
			controller: 'UserController'
		});

	$urlRouterProvider.otherwise('/login');
});

app.config(function($httpProvider){

	$httpProvider.interceptors.push('TimeInterceptor');
	//$httpProvider.interceptors.push('SessionInterceptor');
});

app.run(function($rootScope, $state, LoginService, LoginFactory){

	LoginFactory.getSession().then(function(data){

		LoginService.isLoggedIn = true;
		LoginService.setCurrentUser(data);
		$state.go('dashboard');
	});

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

		if(toState.authorization === true && LoginService.isLoggedIn === false) {

			event.preventDefault();
			$state.go('login');
		} else if(toState.authorization !== true && LoginService.isLoggedIn === true) {

			event.preventDefault();
			$state.go('dashboard');
		}
	});
});