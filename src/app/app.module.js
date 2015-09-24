(function() {
	'use strict';

	angular
		.module('metaIdApp', ['ngRoute'])
		.config(routeConfig);

	routeConfig.$inject = ['$routeProvider'];

	function routeConfig($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'dashboard/dashboard.html'
			})
			.otherwise({redirectTo: '/'});
	}
})();
