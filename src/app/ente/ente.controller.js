(function() {
	'use strict';

	angular
		.module('metaIdApp')
		.controller('EnteController', EnteController);

	EnteController.$inject = ['$state', 'EnteService'];

	function EnteController($state, EnteService) {
		var vm = this;

		//Variables
		vm.basicStep = true;
		vm.artisticStep = false;
		vm.errors = [];
		vm.ente = {};
		vm.geographic_informations = {};
		vm.classification = {};
		vm.listClassifications = [];
		vm.artisticInputs = {};

		// Functions
		vm.goEnteBasicForm = goEnteBasicForm;
		vm.goEnteArtisticForm = goEnteArtisticForm;
		vm.listArtisticStyles = listArtisticStyles;
		vm.addClassification = addClassification;
		vm.removeClassification = removeClassification;
		vm.createEnte = createEnte;

		function goEnteBasicForm() {
			vm.artisticStep = false;
			vm.basicStep = true;
		};

		function goEnteArtisticForm() {
			vm.basicStep = false;
			vm.artisticStep = true;

			// Consultando dados para alimentar os campos
			EnteService.getAtuacoes().then(function(response) {
				vm.artisticInputs.performances = response.data;

			}, function(error) {
				console.log("Erro ao listar atuacoes: " + error);
			});

			// Consultando as classificações
			vm.artisticInputs.areas = EnteService.getAreas();
		};

		function listArtisticStyles() {
			vm.artisticInputs.styles = EnteService.getEstilos(vm.classification.area.index);
		}

		function addClassification() {
			vm.classification.atuacao = vm.classification.atuacao.rotulo;
			vm.classification.area = vm.classification.area.value;
			vm.listClassifications.push(vm.classification);
			vm.classification = {};
		};

		function removeClassification(classification) {
			vm.listClassifications.pop(classification);
		}

		function createEnte() {
			vm.ente.informacoes_geograficas = [];
			vm.geographic_informations.uf = "DF";
			vm.ente.informacoes_geograficas.push(vm.geographic_informations);
			vm.ente.classificacoes = vm.listClassifications;

			console.log(vm.ente);
			EnteService.createEnte(vm.ente).then(function(response) {
					console.log("Ente inserido com sucesso");
					if(response.status == 201) {
						EnteService.setEnte(response.data);
						$state.go("dashboard");
					}
			}, function(error) {
				vm.errors = error.data;
				console.log(error.data);
			});
		}
	}
})();
