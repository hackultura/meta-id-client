(function() {
	'use strict';

	angular
		.module('metaIdApp')
		.factory('DocumentationsService', DocumentationsService);

	DocumentationsService.$inject = ['$http', 'Upload', 'API_URI_PREFIX'];

	function DocumentationsService($http, Upload, API_URI_PREFIX) {
		var vm = this;
		vm.ente = {};
		vm.documentations = [];

		var service = {
			getDocumentations: getDocumentations,
			createDocumentation: createDocumentation
		};


		return service;


		function createDocumentation(documentation) {
			return Upload.upload({ url: API_URI_PREFIX + '/documentos/', data: documentation });
		};

		function getDocumentations(ente) {
			return $http({method: 'GET', url: API_URI_PREFIX + '/documentos/entes/' + ente.id_pub});
		};
	}
})();
