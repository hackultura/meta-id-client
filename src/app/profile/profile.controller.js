(function() {
	'use strict';

	angular
		.module('metaIdApp')
		.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['$scope', '$filter'];

	function ProfileController($scope, $filter) {
		var vm = this;

		//Variables
		vm.profile = {};
		vm.cultural_activities = [];
		vm.cultural_areas = [];
		vm.cultural_styles = [];
		vm.experience_artistics = [];

		// Functions
		vm.init = init;
		vm.loadCulturalActivities = loadCulturalActivities;
		vm.loadCulturalAreas = loadCulturalAreas;
		vm.loadCulturalStyles = loadCulturalStyles;
		vm.loadExperienceArtistics = loadExperienceArtistics;


		function init() {
			$scope.$watch('vm.profile.cultural_activity', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					var selected = $filter('filter')(vm.cultural_activities, {id: vm.profile.cultural_activity});
					vm.profile.culturalActivityName = selected.length ? selected[0].activity : null;
				}
			});

			$scope.$watch('vm.profile.cultural_area', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					var selected = $filter('filter')(vm.cultural_areas, {id: vm.profile.cultural_area});
					vm.profile.culturalAreaName = selected.length ? selected[0].area : null;
				}
			});

			$scope.$watch('vm.profile.cultural_style', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					var selected = $filter('filter')(vm.cultural_styles, {id: vm.profile.cultural_style});
					vm.profile.culturalStyleName = selected.length ? selected[0].style : null;
				}
			});

			$scope.$watch('vm.profile.experience_artistic', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					var selected = $filter('filter')(vm.experience_artistics, {experience: vm.profile.experience_artistic});
					vm.profile.experienceArtisticName = selected.length ? selected[0].experience_text : null;
				}
			});
		}


		function loadCulturalActivities() {
			// TODO: Invocar do servidor
			vm.cultural_activities = [
				{
					"id": 1,
					"activity": "Gestão"
				},
				{
					"id": 2,
					"activity": "Pesquisa"
				},
				{
					"id": 3,
					"activity": "Facilitação/Formação"
				},
				{
					"id": 4,
					"activity": "Produção"
				},
				{
					"id": 5,
					"activity": "Criação/Desenvolvimento artístico"
				},
				{
					"id": 6,
					"activity": "Suporte Técnico"
				},
				{
					"id": 7,
					"activity": "Outros"
				}
			];
		}

		function loadCulturalAreas() {
			// TODO: Invocar do servidor
			vm.cultural_areas = [
				{
					"id": 1,
					"area": "Arquitetura e Urbanismo"
				},
				{
					"id": 2,
					"area": "Artes Visuais"
				},
				{
					"id": 3,
					"area": "Artesanato"
				},
				{
					"id": 4,
					"area": "Audiovisual"
				},
				{
					"id": 5,
					"area": "Artes Circenses"
				},
				{
					"id": 6,
					"area": "Cultura Digital"
				},
				{
					"id": 7,
					"area": "Cultura dos Povos Indigenas"
				},
				{
					"id": 8,
					"area": "Culturas Afro-brasileiras"
				},
				{
					"id": 9,
					"area": "Culturas Populares"
				},
				{
					"id": 10,
					"area": "Dança"
				},
				{
					"id": 11,
					"area": "Design"
				},
				{
					"id": 12,
					"area": "Livro, Leitura e Literatura"
				},
				{
					"id": 13,
					"area": "Moda"
				},
				{
					"id": 14,
					"area": "Música e Opera"
				},
				{
					"id": 15,
					"area": "Patrimônio Material e Imaterial"
				},
				{
					"id": 16,
					"area": "Teatro"
				},
				{
					"id": 17,
					"area": "Áreas Transversais"
				},
				{
					"id": 18,
					"area": "Canto e Ópera"
				},
				{
					"id": 19,
					"area": "Arte Urbana"
				},
				{
					"id": 20,
					"area": "Outros"
				}
			];
		}

		function loadCulturalStyles() {
			vm.cultural_styles = [
				{
					"id": 1,
					"style": "Balé"
				},
				{
					"id": 2,
					"style": "Sertanejo"
				}
			];
		}

		function loadExperienceArtistics() {
			vm.experience_artistics = [
				{
					"experience": 1,
					"experience_text": "1 Ano"
				},
				{
					"experience": 2,
					"experience_text": "2 Anos"
				},
				{
					"experience": 3,
					"experience_text": "3 Anos"
				},
				{
					"experience": 4,
					"experience_text": "4 Anos"
				},
				{
					"experience": 5,
					"experience_text": "5 Anos"
				},
				{
					"experience": 6,
					"experience_text": "6 Anos"
				}
			];
		}
	}
})();
