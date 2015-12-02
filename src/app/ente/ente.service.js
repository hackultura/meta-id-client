(function() {
	'use strict';

	angular
		.module('metaIdApp')
		.factory('EnteService', EnteService);

	EnteService.$inject = ['$http', 'API_URI_PREFIX'];

	function EnteService($http, API_URI_PREFIX) {
		var vm = this;
		vm.ente = {};
		vm.atuacoes = [];
		vm.classificacoes = [];

		var service = {
			createEnte: createEnte,
			getAtuacoes: getAtuacoes,
			getAreas: getAreas,
			getEstilos: getEstilos,
			setEnte: setEnte,
			getEnte: getEnte
		};


		return service;


		function createEnte(ente) {
			return $http({method: 'POST', data: ente, url: API_URI_PREFIX + '/entes/'});
		};

		function getAtuacoes() {
			return $http({method: 'GET', url: API_URI_PREFIX + '/atuacoes/'});
		};

		function getAreas() {
			var areas = [];

			getClassificacoes().then(function(response){
				vm.classificacoes = response.data;

				for(var i = 0; i < vm.classificacoes.length; i++) {
					areas.push({index: i, value: vm.classificacoes[i].area});
				}
			}, function(responseError) {
				console.log("Erro ao listar as classificacoes: " + responseError.data);
			});

			return areas;
		};

		function getEstilos(index) {
			return vm.classificacoes[index].estilos;
		}

		function setEnte(ente) {
			vm.ente = ente;
		}

		function getEnte() {
			return vm.ente;
		};

		function getClassificacoes() {
			return $http({method: 'GET', url: API_URI_PREFIX + '/classificacoes/'});
		}
	}
})();
