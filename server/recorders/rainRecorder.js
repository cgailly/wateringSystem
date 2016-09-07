var blynkProxy = require('../blynkProxy');
var mongoDbProxy = require("../mongoDb/mongoDbProxy");

var rainRecorder = {



    init: function () {
        this.runCheck()
    },


    runCheck: function () {
        setTimeout(this.runCheck.bind(this), 20000);
        blynkProxy.getPinValue("V2").then(function (response) {
            var value = JSON.parse(response)[0]
            console.log("[rainRecorder.runCheck] RainValueDetector " + value);
            mongoDbProxy.addRainSensorValue(value).then(function () { console.log("[rainRecorder.runCheck] value insterted") });
        })

    }
}

rainRecorder.init();
module.exports = rainRecorder;