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

		// Essa variavel armazena um usuario inserido no banco. Ele é
		// usado provisoriamente, enquanto não é feito a integracao com
		// a autenticacao e validacao de usuario.
		//
		// Caso remover esse usuario, insira outro valido.
		vm.local_ente = {
			"id_pub": "2c5526c9-c2c5-4872-a0c8-55e34f33bf6d",
			"slug": "gilson-da-silva-borges-filho",
			"nome": "Gilson da Silva Borges Filho",
			"informacoes_geograficas": [
				{
					"uf": "DF",
					"bairro": "Vila Buritis",
					"endereco": "Quadra 06 Conjunto J Lote 51",
					"adicionado_em": "2015-12-04T13:11:45.659Z",
					"cep": "71916-500",
					"cidade": "Planaltina"
				}
			],
			"telefone": null,
			"email": "me@gilsondev.in",
			"cpf": "030.513.191-55",
			"nascimento": "13/05/1990",
			"classificacoes": [
				{
					"experiencia": 1,
					"estilo": "Sites, Portais, Blogs",
					"atuacao": "Produção",
					"area": "Cultural Digital"
				},
				{
					"experiencia": 1,
					"estilo": "Dança Clássica",
					"atuacao": "Produção",
					"area": "Dança"
				}
			],
			"perfis": []
		}

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
			// return vm.ente;
			return vm.local_ente;
		};

		function getClassificacoes() {
			return $http({method: 'GET', url: API_URI_PREFIX + '/classificacoes/'});
		}
	}
})();
