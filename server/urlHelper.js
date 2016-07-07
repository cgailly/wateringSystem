var config = require('../config');
var http = require('http');
var Promise = require('promise');

module.exports = {
    callUrl: function (requestParameters) {
        console.log("[urlHelper.callUrl()] [" + requestParameters.verb + "] url: http://" + config.Blynk.server + ":" + config.Blynk.port + requestParameters.url);
        return new Promise(function (resolve, reject) {
            try{
                var options = this.createOptions(requestParameters);
                var request = http.request(options, function (res) {
                    var msg = '';
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        msg += chunk;
                    });

                    res.on('end', function () {
                        console.log("Message = " + msg);
                        resolve(msg);
                    });
                });
                request.on('error', function (err) {
                    console.log(err);
                    reject(err);
                });
                if (requestParameters.data != null) {
                    request.write(requestParameters.data);
                }
                request.end();
            }
            catch (error) {
                console.log("[urlHelper - callUrl()]", error);
            }
        }.bind(this)
        );
    },

    createOptions: function (requestParameters) {
        console.log("[urlHelper.createOptions()]");
        var dataLength = 0;
        if (requestParameters.data != undefined) {
            dataLength = requestParameters.data.length;
        }
        var result = {
            host: config.Blynk.server,
            port: config.Blynk.port,
            path: requestParameters.url,
            method: requestParameters.verb,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': dataLength
            }
        };
        return result;
    },
};