angular.module ('loudApp.services')

// .config(['FacebookProvider', function(FacebookProvider) {
//     var myAppId = '1046016745413247';

//     FacebookProvider.setAppId(myAppId);
//     FacebookProvider.init(myAppId);
// }])


// angular.js:68 Uncaught Error: [$injector:modulerr] Failed to instantiate module loudApp due to:
// Error: [$injector:modulerr] Failed to instantiate module loudApp.services due to:
// Error: [$injector:unpr] Unknown provider: FacebookProvider

.service('LoudFB',['Facebook', '$q',
	function(Facebook, $q) {

        /**
         * Gets the current status of a Facebook session
         * @return {bolean} This is sets as TRUE if the user has a valid session with Facebook.
         */
		var getLoginStatus = function () {
            var deferred = $q.defer();

            Facebook.getLoginStatus(function(response) {
                if (response.status === "connected") {
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            }, true);

            return deferred.promise;
        };

        /**
         * Connects the user using the Facebook Login pop-up. If the user allows the LOUD app, it will
         * start a session
         * @return {object} An object containing the status of the connection.
         */
        var login = function () {
            var deferred = $q.defer();

            Facebook.login(function(response) {
                deferred.resolve(response);
            }, {
                scope : "public_profile,email,user_friends,user_photos"
            });

            return deferred.promise;
        };

        /**
         * Terminates a session using the Facebook SDK.
         * @return {object} An object container the status of the disconnection.
         */
        var logout = function () {
            var deferred = $q.defer();

            Facebook.logout(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        };

        /**
         * Service used by the FB-SDK to connect and get the different
         * user data.
         * @return {object} An object with the user's data
         */
        var meFB = function () {
            var deferred = $q.defer();

            Facebook.api('/me', function(response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        };

        /**
         * Returns the URL of the current profile picture of the user logged in.
         * @return {string} The current user's profile picture URL.
         */
        var getUserProfilePicture = function () {
            var deferred = $q.defer();

            Facebook.api("/me/albums", function(response) {
                for (album in response.data) {
                    if (response.data[album].name == "Profile Pictures") {
                        FB.api(response.data[album].id + "/photos", function(response) {
                            deferred.resolve(response.data[0].images[0].source);
                        });
                    }
                }
            }, {
                scope : "user_photos"
            });

            return deferred.promise;
        };

		return {
            getLoginStatus        : getLoginStatus,
            login                 : login,
            meFB                  : meFB,
            getUserProfilePicture : getUserProfilePicture,
            logout                : logout
		};
	}
])