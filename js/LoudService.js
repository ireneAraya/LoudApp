angular.module ('loudApp.services')

.value('BaseURL', '/js/data.json')

.service('LoudService',['$http', 'BaseURL',
	function($http, BaseURL) {

		var getDataFromJS = function () {
			return $http({
                method: "GET",
                url: BaseURL
            });
		};

        var save = function (key, object) {
            localStorage.setItem( key, angular.toJson(object) );
        };

        var verify = function (key) {
            return angular.fromJson( localStorage.getItem(key) );
        };

		/**
         * Return the single item from a collection
         * @param  {object} object                      [The collection with all the data which you can to loop over]
         * @param  {string} key                         [Used to identify the object[key] you will compare]
         * @param  {string, integer, boolean} value     [The value you will use to compare the key]
         * @return {object}                             [The single object from the collection]
         */
		var getItem = function (object, key, value) {

			var item;

            for (var i = 0; i < object.length; i++) {
                if (object[i][key] == value) {
                    item = object[i];
                }
            }

            return item;
		};

		// Retorna la posición del objeto
        var getItemIndex = function (object, targetID) {
            var index;

            for (var i = 0; i < object.length; i++) {
                if (object[i].id == targetID) {
                    index = i;
                }
            };

            return index;
        };

		return {
            save            : save,
            verify          : verify,
			getDataFromJS 	: getDataFromJS,
			getItem 		: getItem,
			getItemIndex	: getItemIndex
		};

	}
])