function initControllers() {
	riistaControllers.controller('landingCtrl', ['$scope', '$timeout', '$location', '$filter', '$translate', 'BackEndService',
		function ($scope, $timeout, $location, $filter, $translate, BackEndService) {
			$scope.images = [];
			
			BackEndService.getImages().then(function (images) {
				$.each(images, function (index, image) {
					image.url = APIURL + "/uploads/" + image.filename;
				});

				$scope.images = images;
			}, function () {

			});

			$scope.updateEmails = function () {
				BackEndService.updateEmails().then(function () {
					alert("Ok!");
				}, function () {
					alert("Erroree!");
				});
			}
		}
	]);
}