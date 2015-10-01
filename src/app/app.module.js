(function() {
	'use strict';

	angular
		.module('metaIdApp', ['ui.router'])
		.config(routeConfig)
		.run(runConfig);

	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	runConfig.$inject = ['$rootScope'];

	function routeConfig($stateProvider, $urlRouterProvider) {
		// Definindo a rota padrão
		$urlRouterProvider.otherwise('/painel');

		// Os templates disponiveis no projeto, configurados para
		// serem herdado pelas rotas do sistema.
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
				},
				data: {
					pageClasses: 'hold-transition skin-green-light sidebar-mini'
				}
			})
			.state('simple', {
				abstract: true,
				views: {
					'@': {
						templateUrl: 'pages/layouts/simple.html'
					},
					'main@simple':  {templateUrl: 'pages/main.html'}
				},
				data: {
					pageClasses: "hold-transition register-page"
				}
			});

			// Todas as rotas do sistema
			$stateProvider.state('ente', {
				parent: 'simple',
				url: "/ente/novo",
				views: {
					'content@simple': {
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

	// Efetuando configuracoes ao iniciar o objeto do Angular.
	function runConfig($rootScope) {
		console.log("Entrou no run");
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$rootScope.pageClasses = toState.data.pageClasses;
		});
	}
})();
