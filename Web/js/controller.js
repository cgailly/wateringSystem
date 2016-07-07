var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope) {

   
    $scope.wateringState = false;
    $scope.isSystemConnected = -1;

    $scope.onClicked = function (event) {
        var scope = $scope;
        var value = !this.wateringState ? '1' : '0';
        $.ajax({
            url: '/api/wateringSystem/state/' + value,
            type: 'PUT',
        }).done(function () {
            this.wateringState = !this.wateringState;
            this.$apply();
        }.bind($scope)).fail(function () { alert('Failed'); });
    };

    $scope.runCheckIsHWConnected = function () {
        $.ajax({
            url: '/api/wateringSystem/connected/',
            type: 'Get',
        }).done(function (response) {
            this.isSystemConnected = response;
            this.$apply();
        }.bind($scope)).fail(function () { this.isSystemConnected = -1; this.$apply(); });
        setTimeout($scope.runCheckIsHWConnected.bind($scope), 3000);
    },

     this.$onInit = function () {
         setTimeout($scope.runCheckIsHWConnected.bind($scope), 3000);
     };
});

app.filter('formatOnLabel', function () {
    return function (checked) {
        if (checked) {
            return "On";
        }
        return "Off";
    };
});

app.filter('formatHWConnected', function () {
    return function (state) {
        switch (state) {
            case "0":
                return "Not connected";
            case "1":
                return "Conneceted";
            default:
                return "N/A";
        }
    };
});