function initServices() {
	riistaApp.factory('DataStoreService', function() {
		function store (key, data) {
			localStorage[key] = JSON.stringify(data);
		}

		function get(key) {
			if (typeof(localStorage[key]) == "undefined") {
				return false;
			}

			var jsonString = localStorage[key];
			var json;

			try {
				json = JSON.parse(jsonString);
			} catch (exception) {
				return false;
			};

			return json;
		}

		function remove(key) {
			localStorage.removeItem(key);
		}

		function clear() {
			localStorage.clear();
		}

		return {
			store: store,
			get: get,
			remove: remove,
			clear: clear
		}
	});

	riistaApp.factory('BackEndService', function($q, $http) {
		function makeRequest(reqData) {
			return $q(function (resolve, reject) {
				$http(reqData).then(function (response) {
					resolve(response.data);
				}, function (response) {
					reject(response);
				});
			});
		}

		return {
			getImages: function (page) {
				if (typeof(page) == "undefined" || page == null) {
					page = 1;
				}

				return makeRequest({
					url: APIURL + "/api/images",
					method: "GET",
					params: {
						page: page
					}
				});
			},
			updateEmails: function (id) {
				return makeRequest({
					url: APIURL + "/api/updateEmails",
					method: "POST",
					params: {
						id: id
					}
				});	
			},
			getEmailBoxes: function () {
				return makeRequest({
					url: APIURL + "/api/emailBoxes",
					method: "GET"
				});	
			},
			createNewBox: function (box) {
				return makeRequest({
					url: APIURL + "/api/emailBoxes",
					method: "POST",
					params: box
				});	
			},
			login: function (user) {
				return makeRequest({
					url: APIURL + "/api/login",
					method: "POST",
					params: user
				});
			},
			logout: function (user) {
				return makeRequest({
					url: APIURL + "/api/logout",
					method: "POST"
				});
			}
		}
	});
}