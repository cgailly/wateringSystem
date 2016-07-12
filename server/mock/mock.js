var nock = require('nock');
var config = require('../../config');
var mockBlynk = {
    pinD8Value: 0,

    rootUrl: "http://" + config.Blynk.server + ":" + config.Blynk.port + "/" + config.Blynk.authToken,

    switchOffD8: function () {
        console.log("pinD8Value= " + this.pinD8Value);
        if (this.pinD8Value == 1) {
            this.pinD8Value = 0;
        }
        setTimeout(this.switchOffD8.bind(this), 5000);
    },

    init: function () {
        this.switchOffD8();

        this.mockGetHwConnected = nock("http://" + config.Blynk.server + ":" + config.Blynk.port).persist()
                    .get("/" + config.Blynk.authToken + '/isHardwareConnected')
                    .reply(200, "true");


        this.mockSetValueD8 = nock("http://" + config.Blynk.server + ":" + config.Blynk.port).persist()
                    .put("/" + config.Blynk.authToken + '/pin/V1')
                    .reply(200, function () {
                        this.pinD8Value = (this.pinD8Value+1) % 2;
                    }.bind(this));


        this.mockSetValueV1 = nock("http://" + config.Blynk.server + ":" + config.Blynk.port).persist()
                    .put("/" + config.Blynk.authToken + '/pin/D8')
                    .reply(200, function () {
                        this.pinD8Value = (this.pinD8Value + 1) % 2;
                    }.bind(this));


        this.mockGetValueD8 = nock("http://" + config.Blynk.server + ":" + config.Blynk.port).persist()
                    .get("/" + config.Blynk.authToken + '/pin/D8')
                    .reply(200, function () {
                        var values = ["" + this.pinD8Value];
                        return JSON.stringify(values);
                    }.bind(this));

        this.mockGetValueV1 = nock("http://" + config.Blynk.server + ":" + config.Blynk.port).persist()
                    .get("/" + config.Blynk.authToken + '/pin/V1')
                    .reply(200, function () {
                        var values = [ ""+ this.pinD8Value ];
                        return JSON.stringify(values);
                    }.bind(this));

        this.mockGetValueV1 = nock("http://" + config.Blynk.server + ":" + config.Blynk.port).persist()
            .get("/" + config.Blynk.authToken + '/pin/A1')
            .reply(200, function () {
                var values = ["" + 876  ];
                return JSON.stringify(values);
            }.bind(this));


    }


};

mockBlynk.init();
module.exports = mockBlynk;