function initInterceptors() {
	riistaApp.factory('authInterceptor', ['DataStoreService', '$location', function(DataStoreService, $location) {  
	    return {
	        request: function(config) {
	            var authToken = DataStoreService.get("authToken");

	            if (authToken !== false) {
	            	config.headers['Authorization'] = authToken;
	            }

	            return config;
	        },
	        response: function(response) {
	        	if (response.status == 401) {
	        		//$location.path("/login");
	        		return response;
	        	}

	            return response;
	        }
	    };
	}]);	
}