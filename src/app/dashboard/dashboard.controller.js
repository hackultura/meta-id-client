(function() {
	'use strict';

	angular
		.module('metaIdApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['EnteService'];

	function DashboardController(EnteService) {
		var vm = this;

		//Variables
		vm.ente = {};
		vm.introOptions = {
			steps: [
				{
					element: '.sidebar-menu',
					intro: "Aqui fica todas as opções que precisa como cadastrar e gerenciar os seus perfis artísticos e documentações."
				},
				{
					element: '.documentation',
					intro: "É importante que insira os seus documentos. Sendo um ente artístico, acesse essa opção para fazer o envio de todas elas."
				},
				{
					element: '.editais',
					intro: "Caso queria saber em quais editais participa, e os que estão em aberto, essa opção vai te disponibilizar toda informação."
				},
				{
					element: '#add_profile',
					intro: "Para criar um novo perfil artístico, é só acessar o formulário aqui."
				},
				{
					element: '#perfil_detail',
					intro: "A cada perfil inserido, ele vai ser exibido nas seção de 'Meus Perfis'. Quando quiser ver os detalhes e inserir o seu portfólio de cada um, é só clicar aqui."
				}
			],
			showStepNumbers: false,
			exitOnOverlayClick: true,
			exitOnEsc:true,
			nextLabel: '<strong>Próximo</strong>',
			prevLabel: '<span style="color:green">Anterior</span>',
			skipLabel: 'Sair',
			doneLabel: 'Terminar o Tour'
		}

		// Functions
		vm.init = init;

		function init() {
			vm.ente = EnteService.getEnte();
		};

	}
})();
