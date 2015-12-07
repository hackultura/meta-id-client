(function() {
	'use strict';

	angular
		.module('metaIdApp')
		.controller('DocumentationController', DocumentationController);

	DocumentationController.$inject = ['EnteService', 'DocumentationsService'];

	function DocumentationController(EnteService, DocumentationsService) {
		var vm = this;

		//Variables
		vm.documento = {};
		vm.documentations = [];
		vm.introOptions = {
			steps: [
				{
					element: '.box-documentation',
					intro: "Preencha os campos para que possa inserir as documentações necessárias."
				},
				{
					element: '.tipo-documento',
					intro: "Digite o nome do seu documento. Exemplo: Identidade, Certidão de Nascimento."
				},
				{
					element: '.vencimento',
					intro: "Qual é a data que o seu documento vai vencer? Caso ela tenha um tempo em que ela vai valer, precisa ser inserido."
				},
				{
					element: '.arquivo',
					intro: "É aqui que você vai selecionar o arquivo para o sistema anexar no seu cadastro."
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
		vm.createDocumentation = createDocumentation;

		function init() {};

		function createDocumentation() {
			// Associando documento ao usuario
			vm.documento.dono = EnteService.getEnte().id_pub;

			DocumentationsService.createDocumentation(vm.documento).then(function(response){
				console.log("Documento inserido com sucesso");
				if(response.status == 201) {
					vm.documento.arquivo.result = true;
					vm.documentations.push(vm.documento);
					vm.documento = {};
				}
			}, function(responseError) {
				vm.errors = responseError.data;
				console.log(responseError.data);
			}, function(event) {
				var progressPercentage = parseInt(100.0 * event.loaded / event.total);
				vm.documento.progress = progressPercentage;
			});
		};

	}
})();
