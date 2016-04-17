angular.module ('loudApp.services')
.service('LoudService',['$http', '$q', '$timeout',
	function($http, $q, $timeout) {

		var getDataFromJS = function () {
			return $http({
                method: "GET",
                url: '/front-end/js/data.json'
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
                message : null
            };

            if (email != undefined && password != undefined) {
                $http({
                    method: 'POST',
                    data: {
                        email : email,
                        password : password
                    },
                    url: '/back-end/user/login'
                }).then(function successCallback(response) {
                    if (!response.data.error) {
                        result.success = true;
                        result.message = response.data.message;
                    } else {
                        result.message = response.data.message;
                    }
                }, function errorCallback(response) {
                    result.message = response.data.message;
                });
            } else {
                result.message = "The email and password are required. Please try again.";
            }

            return result;
        };

        var verifyUser = function () {
            var result = {
                success : false,
                message : null
            }

            $http({
                method: 'GET',
                data : {},
                url: '/back-end/user/verify'
            }).then(function successCallback(response) {
                if (!response.data.error) {
                    result.success = true;
                    result.message = response.data.message;
                    result.data = response.data.data;
                } else {
                    result.message = response.data.message;
                }
            }, function errorCallback(response) {
                result.message = response.message;
            });

            return result;
        };

        var logoutUser = function () {
            var result = {
                success : false,
                message : null
            };

            $http({
                method: 'POST',
                url: '/back-end/user/logout'
            }).then(function successCallback(response) {
                console.log(response);

                if (!response.data.error) {
                    result.success = true;
                    result.message = response.data.message;
                } else {
                    result.message = response.data.message;
                }
            }, function errorCallback(response) {
                result.message = response.message;
            });

            return result;
        };

        var requestNewPassword = function (userEmail) {
            var result = {
                success : false,
                menssage : null
            };

            $http({
                method: 'POST',
                data : {
                    email : userEmail
                },
                url: '/back-end/user/forgot-password'
            }).then(function successCallback(response) {
                if (!response.data.error) {
                    result.success = true;
                    result.message = response.data.message;
                } else {
                    result.message = response.data.message;
                }
            }, function errorCallback(response) {
                result.message = response.message;
            });
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
            save               : save,
            remove             : remove,
            verify             : verify,
			getDataFromJS 	   : getDataFromJS,
			getItem 		   : getItem,
			getItemIndex	   : getItemIndex,
            loginUser          : loginUser,
            verifyUser         : verifyUser,
            logoutUser         : logoutUser,
            requestNewPassword : requestNewPassword
		};

	}
])