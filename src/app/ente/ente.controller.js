(function() {
	'use strict';

	angular
		.module('metaIdApp')
		.controller('EnteController', EnteController);

	EnteController.$inject = [];

	function EnteController() {
		var vm = this;

		//Variables
		vm.basicStep = true;
		vm.artisticStep = false;

		// Functions
		vm.goEnteBasicForm = goEnteBasicForm;
		vm.goEnteArtisticForm = goEnteArtisticForm;

		function goEnteBasicForm() {
			vm.artisticStep = false;
			vm.basicStep = true;
		};

		function goEnteArtisticForm() {
			vm.basicStep = false;
			vm.artisticStep = true;
		};
	}
})();
