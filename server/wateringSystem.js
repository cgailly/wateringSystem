var blynkProxy = require('./blynkProxy');

module.exports = {
    getIsWateringSystemConnected: function (req, res) {
        console.log('[wateringSystem - getIsWateringSystemConnected()]');
        try {
            console.log("[GET] /api/wateringSystem/state/ Get state");
            blynkProxy.isHWConnected().then(
                function (result) {
                    var value = result == "true" ? "1" : "0";
                    res.send(value);
                }).catch(function(error) {console.log(error); res.status(500)});
        } catch (e) {
            res.status(500);
            console.error(e);
            return new Error(e);
        }
    },

    setPinValue: function (req, res) {
        try {
            console.log("[wateringSystem - setPinValue()]'");
            if (req == undefined) {
                res.status(500);
                console.error("[PUT] /api/wateringSystem/state/ error bad request");
                return new Error("empty content");
            }
            var state = req.params.state;
            if (state != 1 && state != 0) {
                res.status(500);
                console.error("[PUT] /api/wateringSystem/state/error bad value");
                return new Error("empty bad Value");
            }
            blynkProxy.setPinValue("D8", state).then(res.send("1")).catch(function(error) {console.log(error); res.status(500)});
        } catch (e) {
            res.status(500);
            console.error(e);
            return new Error(e);
        }
    }
}