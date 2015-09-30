(function() {
	'use strict';

	angular
		.module('metaIdApp', ['ui.router'])
		.config(routeConfig);

	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function routeConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/painel');

		$stateProvider
			.state('admin', {
				abstract: true,
				views: {
					'@': {
						templateUrl: 'pages/layouts/admin.html'
					},
					'header@admin': {templateUrl: 'pages/header.html'},
					'sidebar@admin': {templateUrl: 'pages/sidebar.html'},
					'main@admin':  {templateUrl: 'pages/main.html'}
				}
			})
			.state('simple', {
				abstract: true,
				views: {
					'@': {
						templateUrl: 'pages/layouts/simple.html'
					},
					'main@simple':  {templateUrl: 'pages/main.html'}
				}
			})
			.state('ente', {
				parent: 'simple',
				url: "/ente/novo",
				views: {
					'content@index': {
						templateUrl: 'ente/ente.html'
					}
				}
			})
			.state('dashboard', {
				parent: 'admin',
				url: "/painel",
				views: {
					'content@admin': {
						templateUrl: 'dashboard/dashboard.html'
					}
				}
			});
	}
})();
