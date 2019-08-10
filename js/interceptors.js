function initInterceptors() {
	riistaApp.factory('authInterceptor', ['$location', '$q', 'DataStoreService', function($location, $q, DataStoreService) {  
	    return {
	        request: function(config) {
	            var authToken = DataStoreService.get("authToken");

	            if (authToken !== false) {
	            	config.headers['Authorization'] = authToken;
	            }

	            return config;
	        },
	        response: function(response) {
	            return response;
	        },
	        responseError: function (response) {
	        	if (response.status == 403 || response.status == 401) {
	        		if (response.config.url.indexOf("/login") == -1) {
	        			DataStoreService.clear();
	        			$location.path("/login");
	        		}

	        		return $q.reject(response);
	        	}

	        	return response;
	        }
	    };
	}]);	
}