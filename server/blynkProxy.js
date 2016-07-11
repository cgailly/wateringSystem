var config = require('../config');
var urlHelper = require('./urlHelper');

var blynkProxy = {
    getRootUrl: function () {
        return "/" + config.Blynk.authToken + "/";
    },

    isHWConnected: function () {
        var request = {
            'verb': "GET",
            'url': this.getRootUrl() + "isHardwareConnected",
        };
        return urlHelper.callUrl(request);      
    },

    setPinValue: function (pin, value) {
        var values = [value];
        var data = JSON.stringify(values);
        var request = {
            'verb': "PUT",
            'url': this.getRootUrl() + "pin/" + pin,
            'data' : data
        };
        return urlHelper.callUrl(request);
    },

    getPinValue: function (pin) {
        var request = {
            'verb': "GET",
            'url': this.getRootUrl() + "pin/" + pin,
        };
        return urlHelper.callUrl(request);
},
};

module.exports = blynkProxy;