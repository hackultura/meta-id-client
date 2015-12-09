(function() {
	'use strict';

	angular
		.module('metaIdApp')
		.factory('ProfileService', ProfileService);

	ProfileService.$inject = ['$http', 'Upload', 'API_URI_PREFIX'];

	function ProfileService($http, Upload, API_URI_PREFIX) {
		var vm = this;

		var service = {
			createProfile: createProfile,
			createPortfolioFile: createPortfolioFile,
			createPortfolioPicture: createPortfolioPicture,
			createPortfolioAudio: createPortfolioAudio,
			createPortfolioVideo: createPortfolioVideo
		};


		return service;


		function createProfile(ente, profile) {
			return $http({ method: 'POST', url: API_URI_PREFIX + '/entes/' + ente.slug + '/perfis/', data: profile });
		};

		function createPortfolioFile() {};

		function createPortfolioPicture() {};

		function createPortfolioAudio() {};

		function createPortfolioVideo() {};
	}
})();
