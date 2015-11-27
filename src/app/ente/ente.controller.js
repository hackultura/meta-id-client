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
		vm.ente = {};
		vm.classification = {};
		vm.listClassifications = [];

		// Functions
		vm.goEnteBasicForm = goEnteBasicForm;
		vm.goEnteArtisticForm = goEnteArtisticForm;
		vm.addClassification = addClassification;

		function goEnteBasicForm() {
			vm.artisticStep = false;
			vm.basicStep = true;
		};

		function goEnteArtisticForm() {
			vm.basicStep = false;
			vm.artisticStep = true;
		};

		function addClassification() {
			vm.listClassifications.push(vm.classification);
			vm.classification = {};
		};
	}
})();
