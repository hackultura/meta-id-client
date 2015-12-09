(function() {
	'use strict';

	angular
		.module('metaIdApp')
		.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['$scope', '$filter', 'ProfileService', 'EnteService'];

	// TODO: Separar o controller de perfil, para insercao
	// e edicao, e detalhes do mesmo.
	function ProfileController($scope, $filter, ProfileService, EnteService) {
		var vm = this;

		//Variables
		vm.ente = {};
		vm.profile = {};
		vm.errors = [];
		vm.portfolioBox = false;
		vm.activeForm = '';
		vm.formVideoMode = 'youtube';
		vm.fileContent = null;
		vm.imageContent = null;
		vm.albumContent = null;
		vm.audioContent = null;
		vm.videoContent = null;

		// Functions
		vm.init = init;
		vm.saveProfile = saveProfile;
		vm.removeImageForm = removeImageForm;
		vm.removeAlbumForm = removeAlbumForm;
		vm.removeAudioForm = removeAudioForm;


		function init() {
			vm.ente = EnteService.getEnte();
		}

		function saveProfile() {
			ProfileService.createProfile(vm.ente, vm.profile).then(function(response) {
				if(response.status == 201) {
					vm.profile = response.data;
					vm.portfolioBox = true;
				}
			}, function(responseError) {
				vm.errors = responseError.data;
			});
		}

		function removeImageForm() {
			vm.imageContent = null;
		}

		function removeAlbumForm(image) {
			// TODO: Remover imagem selecionada
			vm.albumContent = null;
		}

		function removeAudioForm() {
			vm.audioContent = null;
		}
	}
})();
