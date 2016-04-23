angular.module ('loudApp.services')
.service('LoudService',['$http', '$q', '$timeout',
    function($http, $q, $timeout) {

        var getDataFromJS = function () {
            return $http({
                method: "GET",
                url: 'front-end/js/data.json'
            });
        };

        var getSeatDataFromJS = function () {
            return $http({
                method: "GET",
                url: 'front-end/js/seats.json'
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
                    url: 'back-end/user/login'
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
            var defer = $q.defer();

            $http({
                method: 'GET',
                data : {},
                url: 'back-end/user/verify'
            }).then(function successCallback(response) {
                defer.resolve(response.data);
            }, function errorCallback(response) {
                defer.reject(response);
            });

            return defer.promise;
        };

        var logoutUser = function () {
            var result = {
                success : false,
                message : null
            };

            $http({
                method: 'POST',
                url: 'back-end/user/logout'
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

            return result;
        };

        var registerUser = function (objUser) {
            var defer = $q.defer();

            $http({
                method: 'POST',
                data : objUser,
                url: 'back-end/user/register'
            }).then(function successCallback(response) {
                defer.resolve(response.data);
            }, function errorCallback(response) {
                defer.reject(response);
            });

            return defer.promise;
        };

        var requestNewPassword = function (userEmail) {
            var defer = $q.defer();

            $http({
                method: 'POST',
                data : {
                    email : userEmail
                },
                url: 'back-end/user/forgot-password'
            }).then(function successCallback(response) {
                defer.resolve(response.data);
            }, function errorCallback(response) {
                defer.reject(response);
            });

            return defer.promise;
        };

        var save = function (key, object) {
            localStorage.setItem( key, angular.toJson(object) );
        };

        var remove = function (keyName) {
            localStorage.removeItem( keyName );
        };

        var deleteItem = function (itemCollectionName, itemId) {
            var defer = $q.defer();

            $http({
                method: 'POST',
                data : {
                    collectionName : itemCollectionName,
                    itemId : itemId
                },
                url: 'back-end/item/delete'
            }).then(function successCallback(response) {
                defer.resolve(response.data);
            }, function errorCallback(response) {
                defer.reject(response);
            });

            return defer.promise;
        };

        var verify = function (key) {
            return angular.fromJson( localStorage.getItem(key) );
        };

        var getCollection = function (colName) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'back-end/collection/' + colName
            }).then(function successCallback(response) {
                defer.resolve(response.data);
            }, function errorCallback(response) {
                defer.reject(response);
            });

            return defer.promise;
        };

        var getItemDB = function (item, id, key) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'back-end/item/' + item + "/" + id + "/" + key
            }).then(function successCallback(response) {
                defer.resolve(response.data);
            }, function errorCallback(response) {
                defer.reject(response);
            });
        }

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
            }

            return index;
        };

        return {
            save               : save,
            remove             : remove,
            verify             : verify,
            getDataFromJS      : getDataFromJS,
            getItem            : getItem,
            getItemIndex       : getItemIndex,
            loginUser          : loginUser,
            verifyUser         : verifyUser,
            logoutUser         : logoutUser,
            requestNewPassword : requestNewPassword,
            registerUser       : registerUser,
            getCollection      : getCollection,
            getItemDB          : getItemDB,
            getSeatDataFromJS  : getSeatDataFromJS,
            deleteItem         : deleteItem
        };
    }
]);