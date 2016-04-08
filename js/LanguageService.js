angular.module ('loudApp.services')


.service('translationService', ['$resource', '$q', function($resource, $q) {
        var getTranslation = function (language) {
        //     var deferred = $q.defer();
            language = language || "es";
            var languageFilePath = 'translation_' + language + '.json';

            console.log(language);

        //     $resource(languageFilePath).get(function (data) {
        //     	deferred.resolve(data);
        //     });

        //     return deferred.promise;
	        return $q(function(resolve, reject) {
			    setTimeout(function() {
			      // var languageFilePath = 'translation_' + language + '.json';

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