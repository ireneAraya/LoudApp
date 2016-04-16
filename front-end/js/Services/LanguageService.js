angular.module ('loudApp.services')

.service('translationService', ['$resource', '$q', function($resource, $q) {
        var getTranslation = function (language) {

            var languageFilePath = '/front-end/translation/translation_' + language + '.json';

            return $q(function(resolve, reject) {
			    setTimeout(function() {
    	            $resource(languageFilePath).get(function (data) {
    	            	resolve(data);
    	            });
			    }, 1000);
			});
        };

        return {
        	getTranslation : getTranslation
        }

    }
]);