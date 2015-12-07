(function() {
	'use strict';

	angular
		.module('metaIdApp', [
			'ui.router',
			'xeditable',
			'ngFileUpload',
			'naif.base64',
			'angular-intro'
		])
		.constant("API_URI_PREFIX", "http://localhost:8000/api/v1")
		.config(routeConfig)
		.run(runConfig);

	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	runConfig.$inject = ['$rootScope', 'editableOptions'];

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
					'header@admin': {templateUrl: 'pages/header.html', controller: 'HeaderController'},
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
			})
			.state('documentations_general', {
				parent: 'admin',
				url: "/documentacoes/geral",
				views: {
					'content@admin': {
						templateUrl: 'documentations/documentations_general.html'
					}
				}
			})
			.state('documentations_artistic', {
				parent: 'admin',
				url: "/documentacoes/artistico",
				views: {
					'content@admin': {
						templateUrl: 'documentations/documentations_artistic.html'
					}
				}
			})
			.state('profile_new', {
				parent: 'admin',
				url: "/perfil/novo",
				views: {
					'content@admin': {
						templateUrl: 'profile/profile_new.html'
					}
				}
			})
			.state('profile_detail', {
				parent: 'admin',
				url: "/perfil/:slug",
				views: {
					'content@admin': {
						templateUrl: 'profile/profile_detail.html'
					}
				}
			});
	}

	// Efetuando configuracoes ao iniciar o objeto do Angular.
	function runConfig($rootScope, editableOptions) {
		// Passando as classes que estilizam os templates escolhidos durante o roteamento
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$rootScope.pageClasses = toState.data.pageClasses;
		});

		// Definindo o tema do xeditable
	editableOptions.theme = 'bs3';
	}
})();
