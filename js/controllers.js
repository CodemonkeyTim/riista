function initControllers() {
	riistaControllers.controller('loginCtrl', ['$scope', '$timeout', '$location', '$filter', '$translate', 'BackEndService', 'DataStoreService',
		function ($scope, $timeout, $location, $filter, $translate, BackEndService, DataStoreService) {
			$scope.loginErrorVisible = false;

			$scope.user = {
				email: "",
				password: ""
			}

			$scope.login = function () {
				BackEndService.login($scope.user).then(function (authToken) {
					DataStoreService.store("user", $scope.user);
					DataStoreService.store("authToken", authToken.token);

					$location.path("/imageList");
				}, function () {
					showLoginError();
				});
			}

			function showLoginError() {
				if ($scope.loginErrorVisible) {
					return;
				}

				$scope.loginErrorVisible = true;

				$timeout(function () {
					$scope.loginErrorVisible = false;
				}, 5000);
			}

			var authToken = DataStoreService.get("authToken");

			if (authToken !== false) {
				$location.path("/imageList");
			}
		}
	]);

	riistaControllers.controller('imageListCtrl', ['$scope', '$timeout', '$interval', '$location', '$filter', '$translate', 'BackEndService',
		function ($scope, $timeout, $interval, $location, $filter, $translate, BackEndService) {
			$scope.images;
			$scope.paging = {
				currentPageIndex: 1,
				totalPagesCount: 1
			}

			function updateImages() {
				BackEndService.getImages($scope.paging.currentPageIndex).then(function (imageData) {
					var images = imageData.images;
					$scope.paging.totalPagesCount = Math.round(imageData.totalCount / 10);

					$.each(images, function (index, image) {
						image.url = APIURL + "/uploads/" + image.filename;
					});

					$scope.images = images;
				}, function () {

				});
			}

			$scope.nextPage = function() {
				if ($scope.paging.currentPageIndex >= $scope.paging.totalPagesCount) {
					return;
				}

				$scope.paging.currentPageIndex++;

				updateImages();
			}

			$scope.prevPage = function () {
				if ($scope.paging.currentPageIndex <= 1) {
					return;
				}

				$scope.paging.currentPageIndex--;

				updateImages();
			}

			$scope.toSettings = function () {
				$location.path("/settings");
			}

			updateImages();

			$scope.$on("appResuming", function () {
				BackEndService.getEmailBoxes().then(function (emailBoxes) {
					var intervalId = $interval(function () {
						var allUpdated = true;

						$.each(emailBoxes, function (index, box) {
							allUpdated = allUpdated && box.updated;
						});

						if (allUpdated) {
							$interval.cancel(intervalId);
							updatedImages();
						}
					}, 300);

					$.each(emailBoxes, function (index, emailBox) {
						BackEndService.updateEmails(emailBox.id).then(function () {
							emailBox.updated = true;
						}, function () {

						});
					});
				}, function() {

				});
			});
		}
	]);

	riistaControllers.controller('settingsCtrl', ['$scope', '$timeout', '$location', '$filter', '$translate', 'BackEndService', 'DataStoreService',
		function ($scope, $timeout, $location, $filter, $translate, BackEndService, DataStoreService) {
			$scope.loaderVisible = false;
			$scope.feedbackMessageVisible = false;

			$scope.feedback = {
				status: "",
				message: ""
			}

			$scope.emailBoxes = [];

			function updateBoxes() {
				BackEndService.getEmailBoxes().then(function (emailBoxes) {
					$scope.emailBoxes = emailBoxes;
				}, function() {

				});
			}

			$scope.addEmailBox = function() {
				if ($scope.emailBoxes.length > 0 && $scope.emailBoxes[$scope.emailBoxes.length - 1].new) {
					return;
				}

				$scope.emailBoxes.push({
					new: true,
					host: "",
					login_user: "",
					password: ""
				})
			}

			$scope.saveNew = function (box) {
				BackEndService.createNewBox(box).then(function () {
					updateBoxes();
				}, function () {

				});
			}

			$scope.back = function () {
				$location.path("/imageList");
			}

			$scope.logout = function () {
				BackEndService.logout();
				DataStoreService.clear();

				$location.path("/login");
			}

			$scope.updateEmails = function(box) {
				$scope.loaderVisible = true;

				BackEndService.updateEmails(box.id).then(function (response) {
					$scope.loaderVisible = false;

					var message = "Päivitys ok. Uudet tallennetut: " + response.savedCount + ". Yhteensä lootassa: " + response.totalCount;

					showFeedbackMessage(message, "success");
				}, function () {
					$scope.loaderVisible = false;

					var message = "Virhe!";

					showFeedbackMessage(message, "danger");
				});
			}

			function showFeedbackMessage(message, status) {
				if ($scope.feedbackMessageVisible) {
					return;
				}

				$scope.feedback.message = message;
				$scope.feedback.status = status;

				$scope.feedbackMessageVisible = true;

				$timeout(function () {
					$scope.feedbackMessageVisible = false;
				}, 5000);
			}

			updateBoxes();
		}
	]);
}