angular.module ('loudApp.services')

.value('BaseURL', '/back-end/')

.service('LoudService',['$http', 'BaseURL', '$q', '$timeout'
	function($http, BaseURL, $q, $timeout) {

		var getDataFromJS = function () {
			return $http({
                method: "GET",
                url: BaseURL
            });
		};

        /**
         * Logs in a user to the system
         * @param  {string} email    The user's email
         * @param  {string} password The user's password
         * @return {object}          A result object containing the status of the request and the request message
         */
        var loginUser = function (email, password) {
            var result = {
                success : false,
                data    : null,
                message : null
            };

            if (email != undefined && password != undefined) {
                $http({
                    method: 'POST',
                    data: {
                        email : email,
                        password : password
                    },
                    url: BaseURL + 'user/login'
                }).then(function successCallback(response) {
                    if (!response.data.error) {
                        result.success = true;
                        result.data = response;
                    } else {
                        result.message = response.message;
                    }
                }, function errorCallback(response) {
                    result.message = response.message;
                });
            } else {
                result.message = "The email and password are required. Please try again.";
            }

            return result;
        };

        var save = function (key, object) {
            localStorage.setItem( key, angular.toJson(object) );
        };

        var remove = function (keyName) {
            localStorage.removeItem( keyName );
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
            remove          : remove,
            verify          : verify,
			getDataFromJS 	: getDataFromJS,
			getItem 		: getItem,
			getItemIndex	: getItemIndex
		};

	}
])