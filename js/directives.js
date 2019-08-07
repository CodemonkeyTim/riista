function initDirectives() {
	riistaApp.directive('exerciseRow',
		function () {
			return {
				templateUrl: "templates/directives/exerciseRow.html",
				restrict: "E",
				controller: 'exerciseRowCtrl',
				scope: {
					exercise: "="
				}
			}
		}
	);

	riistaApp.directive('exerciseChart',
		function () {
			return {
				templateUrl: "templates/directives/exerciseChart.html",
				restrict: "E",
				controller: 'exerciseChartCtrl',
				scope: {
					exerciseId: "="
				}
			}
		}
	);
}