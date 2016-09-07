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

        var options = {
            maintainAspectRatio: true,
            responsive: false
        };
        setTimeout(function () {
            var canvas = document.getElementById('updating-chart'),
    ctx = canvas.getContext('2d'),
    startingData = {
        datasets: [
        {
            data: [{ 'x': "2016-07-15T12:41:37.429Z", 'y': 954 }, { 'x': "2016-07-15T12:42:22.855Z", 'y': 954 }, { 'x': "2016-07-15T12:43:04.170Z", 'y': 954 }, { 'x': "2016-07-15T12:43:24.112Z", 'y': 954 }, { 'x': "2016-07-15T12:43:44.102Z", 'y': 954 }, { 'x': "2016-07-15T12:44:04.112Z", 'y': 954 }, { 'x': "2016-07-15T12:44:24.127Z", 'y': 954 }, { 'x': "2016-07-15T12:44:44.142Z", 'y': 954 }, { 'x': "2016-07-15T12:45:04.159Z", 'y': 954 }, { 'x': "2016-07-15T12:45:24.160Z", 'y': 954 }, { 'x': "2016-07-15T12:45:44.179Z", 'y': 954 }, { 'x': "2016-07-15T12:46:04.193Z", 'y': 954 }, { 'x': "2016-07-15T12:46:16.425Z", 'y': 954 }, { 'x': "2016-07-15T12:46:54.800Z", 'y': 954 }, { 'x': "2016-07-15T12:47:07.801Z", 'y': 954 }, { 'x': "2016-07-15T12:47:27.719Z", 'y': 941 }, { 'x': "2016-07-15T12:47:47.734Z", 'y': 953 }, { 'x': "2016-07-15T12:48:07.750Z", 'y': 997 }, { 'x': "2016-07-15T12:48:27.753Z", 'y': 968 }, { 'x': "2016-07-15T12:48:47.765Z", 'y': 965 }, { 'x': "2016-07-15T12:49:07.781Z", 'y': 993 }, { 'x': "2016-07-15T12:49:27.797Z", 'y': 923 }, { 'x': "2016-07-15T12:49:47.812Z", 'y': 908 }, { 'x': "2016-07-15T12:50:07.815Z", 'y': 917 }, { 'x': "2016-07-15T12:50:27.828Z", 'y': 955 }, { 'x': "2016-07-15T12:50:47.844Z", 'y': 920 }, { 'x': "2016-07-15T12:51:07.861Z", 'y': 913 }, { 'x': "2016-07-15T12:51:27.876Z", 'y': 939 }, { 'x': "2016-07-15T12:51:47.891Z", 'y': 994 }, { 'x': "2016-07-15T12:52:07.924Z", 'y': 971 }, { 'x': "2016-07-15T12:52:27.908Z", 'y': 981 }, { 'x': "2016-07-15T12:52:47.922Z", 'y': 994 }, { 'x': "2016-07-15T12:53:07.941Z", 'y': 961 }, { 'x': "2016-07-15T12:53:27.955Z", 'y': 950 }, { 'x': "2016-07-15T12:53:47.969Z", 'y': 967 }, { 'x': "2016-07-15T12:54:07.972Z", 'y': 919 }, { 'x': "2016-07-15T12:54:27.989Z", 'y': 992 }, { 'x': "2016-07-15T12:54:48.001Z", 'y': 901 }, { 'x': "2016-07-15T12:55:08.019Z", 'y': 937 }, { 'x': "2016-07-15T12:55:28.034Z", 'y': 900 }, { 'x': "2016-07-15T12:55:48.033Z", 'y': 977 }, { 'x': "2016-07-15T12:58:13.371Z", 'y': 954 }, { 'x': "2016-07-15T12:58:33.246Z", 'y': 940 }, { 'x': "2016-07-15T12:58:53.260Z", 'y': 955 }, { 'x': "2016-07-15T12:59:13.278Z", 'y': 997 }, { 'x': "2016-07-15T12:59:33.294Z", 'y': 968 }, { 'x': "2016-07-15T12:59:53.308Z", 'y': 967 }, { 'x': "2016-07-15T13:00:13.324Z", 'y': 994 }, { 'x': "2016-07-15T13:00:33.341Z", 'y': 950 }, { 'x': "2016-07-15T13:00:53.340Z", 'y': 933 }, { 'x': "2016-07-15T13:01:13.358Z", 'y': 945 }, { 'x': "2016-07-15T13:10:01.972Z", 'y': 954 }, { 'x': "2016-07-15T13:10:21.854Z", 'y': 941 }, { 'x': "2016-07-15T13:10:41.863Z", 'y': 957 }, { 'x': "2016-07-15T13:11:01.881Z", 'y': 996 }, { 'x': "2016-07-15T13:11:21.895Z", 'y': 969 }, { 'x': "2016-07-15T13:11:41.910Z", 'y': 969 }, { 'x': "2016-07-15T13:12:01.927Z", 'y': 996 }, { 'x': "2016-07-15T13:12:21.946Z", 'y': 951 }, { 'x': "2016-07-15T13:12:41.959Z", 'y': 937 }, { 'x': "2016-07-15T13:13:01.975Z", 'y': 950 }, { 'x': "2016-07-15T13:13:21.975Z", 'y': 982 }, { 'x': "2016-07-15T13:13:41.988Z", 'y': 952 }, { 'x': "2016-07-15T13:14:02.006Z", 'y': 951 }, { 'x': "2016-07-15T13:14:22.022Z", 'y': 974 }, { 'x': "2016-07-15T13:15:26.560Z", 'y': 954 }, { 'x': "2016-07-15T13:19:27.950Z", 'y': 954 }, { 'x': "2016-07-15T13:19:47.845Z", 'y': 940 }, { 'x': "2016-07-15T13:20:07.860Z", 'y': 954 }, { 'x': "2016-07-15T13:20:27.882Z", 'y': 996 }, { 'x': "2016-07-15T13:20:47.876Z", 'y': 966 }, { 'x': "2016-07-15T13:21:07.890Z", 'y': 964 }, { 'x': "2016-07-15T13:21:27.909Z", 'y': 991 }, { 'x': "2016-07-15T13:21:47.923Z", 'y': 946 }, { 'x': "2016-07-15T13:23:39.418Z", 'y': 954 }, { 'x': "2016-07-15T13:23:59.346Z", 'y': 938 }, { 'x': "2016-07-15T13:25:29.804Z", 'y': 954 }, { 'x': "2016-07-15T13:25:49.721Z", 'y': 939 }, { 'x': "2016-07-15T13:26:09.734Z", 'y': 952 }, { 'x': "2016-07-15T13:26:29.738Z", 'y': 994 }, { 'x': "2016-07-15T13:26:49.751Z", 'y': 955 }, { 'x': "2016-07-15T13:27:09.765Z", 'y': 950 }, { 'x': "2016-07-15T13:27:29.784Z", 'y': 965 }, { 'x': "2016-07-15T13:27:49.800Z", 'y': 912 }, { 'x': "2016-07-15T13:28:09.815Z", 'y': 992 }, { 'x': "2016-07-15T13:28:29.817Z", 'y': 904 }, { 'x': "2016-07-15T13:28:49.830Z", 'y': 943 }, { 'x': "2016-07-15T13:29:09.845Z", 'y': 907 }, { 'x': "2016-07-15T13:29:29.863Z", 'y': 903 }, { 'x': "2016-07-15T13:29:49.878Z", 'y': 927 }, { 'x': "2016-07-15T13:30:09.880Z", 'y': 976 }, { 'x': "2016-07-15T13:30:29.894Z", 'y': 956 }, { 'x': "2016-07-15T13:30:49.910Z", 'y': 961 }, { 'x': "2016-07-15T13:31:09.925Z", 'y': 998 }, { 'x': "2016-07-15T13:31:29.942Z", 'y': 963 }, { 'x': "2016-07-15T13:31:49.957Z", 'y': 956 }, { 'x': "2016-07-15T13:32:09.958Z", 'y': 940 }, { 'x': "2016-07-15T13:32:29.973Z", 'y': 983 }, { 'x': "2016-07-15T13:32:49.989Z", 'y': 919 }, { 'x': "2016-07-15T13:33:10.003Z", 'y': 926 }]
        },

        ]
    };
                // Reduce the animation steps for demo clarity.
            var myLiveChart = new Chart(ctx, {
                'type': 'line', 'data': startingData, 'options': {
                    animationSteps: 15, maintainAspectRatio: true,
                    responsive: false,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'hour'
                            }
                        }]
                    }
                }
            });


            setInterval(function () {
                //// Add two random numbers for each dataset
                //var value = myLiveChart.data.datasets[0].data[0] + 2;
                //myLiveChart.data.datasets[0].data[0] = value;
                //// Remove the first point so we dont just add values forever
                //myLiveChart.update();
            }, 5000);
        }.bind($scope), 0);
    };


  //  $scope.series = ['Series A', 'Series B'];

   
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