function initFilters() {
    riistaApp.filter('formatDate', function ($filter) {
        return function (date) {
            var t = $filter("translate");
            var dateFormat = t("general.dateFormat");

            var momentDate = moment(date);
            
            if (momentDate.isValid()) {
                return momentDate.format(dateFormat);
            } else {
                return t("general.errorMessages.invalidDate");
            }
        }
    });

    riistaApp.filter('formatDateTime', function ($filter) {
        return function (date) {
            var t = $filter("translate");
            var dateFormat = t("general.dateFormat") + " HH:mm:ss";

            var momentDate = moment(date);
            
            if (momentDate.isValid()) {
                return momentDate.format(dateFormat);
            } else {
                return t("general.errorMessages.invalidDate");
            }
        }
    });
}