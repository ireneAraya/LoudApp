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

		//Retorna el id del objeto
		var getItem = function (object, id) {

			var item;

            for (var i = 0; i < object.length; i++) {
                if (object[i].id == id) {
                    item = object[i];
                }
            }

            return item;
		};

		/**Retorna la posición del objeto*/
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
			getDataFromJS 	: getDataFromJS,
			getItem 		: getItem,
			getItemIndex	: getItemIndex
		};

	}
])