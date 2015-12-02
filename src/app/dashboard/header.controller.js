(function() {
	'use strict';

	angular
		.module('metaIdApp')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['EnteService'];

	function HeaderController(EnteService) {
		var vm = this;

		//Variables
		vm.ente = {};

		// Functions
		vm.init = init;

		function init() {
			vm.ente = EnteService.getEnte();
		};

	}
})();
