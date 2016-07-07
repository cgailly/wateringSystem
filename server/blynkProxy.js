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
        var data = '[ "' + value +  ' " ]';
        var request = {
            'verb': "PUT",
            'url': this.getRootUrl() + "pin/" + pin,
            'data' : data
        };
        return urlHelper.callUrl(request);
      }
};

module.exports = blynkProxy;