var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope) {


    $scope.wateringState = -1;
    $scope.isSystemConnected = -1;
    $scope.rainValue = -1;

    $scope.onClicked = function (event) {
        var scope = $scope;
        var newState = 1;
        if (this.buttonState == 1) {
            newState = 0;
        }
        this.buttonState = newState;
        $.ajax({
            url: '/api/wateringSystem/relay/' + this.buttonState,
            type: 'PUT',
        }).done(function () {

            this.$apply();
        }.bind($scope)).fail(function () { alert('Failed'); });
    };

    $scope.runThread = function () {
        $.ajax({
            url: '/api/wateringSystem/connected/',
            type: 'Get',
        }).done(function (response) {
            this.isSystemConnected = response;
            this.$apply();
        }.bind($scope)).fail(function () { this.isSystemConnected = -1; this.$apply(); });

        if (this.isSystemConnected > 0) {
            $.ajax({
                url: '/api/wateringSystem/relay/',
                type: 'Get',
            }).done(function (response) {
                var results = JSON.parse(response);
                this.buttonState = parseInt(results[0]);
                this.$apply();
            }.bind($scope)).fail(function () { this.buttonState = 0; this.$apply(); });
        }


        if (this.isSystemConnected > 0) {
            $.ajax({
                url: '/api/wateringSystem/rainDetector/',
                type: 'Get',
            }).done(function (response) {
                var results = JSON.parse(response);
                this.rainValue = parseInt(results[0]);
                this.$apply();
            }.bind($scope)).fail(function () { this.buttonState = 0; this.$apply(); });
        }
        setTimeout($scope.runThread.bind($scope), 3000);
    },

    
     this.$onInit = function () {
         $scope.runThread();
     };
});

app.filter('formatOnLabel', function () {
    return function (state) {
        switch (state) {
            case 0:
                return "Start";
            case 1:
                return "Stop";
        }

        return "Start";

    };
});

app.filter('formatHWConnected', function () {
    return function (state) {
        switch (state) {
            case "0":
                return "Not connected";
            case "1":
                return "Connected";
            default:
                return "N/A";
        }
    };
});