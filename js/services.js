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

		return {
			store: store,
			get: get,
			remove: remove
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
			getImages: function (slotId) {
				return makeRequest({
					url: APIURL + "/api/images/",
					method: "GET"
				});
			},
			updateEmails: function () {
				return makeRequest({
					url: APIURL + "/api/updateEmails/",
					method: "POST"
				});	
			}
		}
	});
}