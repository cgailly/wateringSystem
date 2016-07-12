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
                }).catch(function (error) { console.log(error); res.status(500) });
        } catch (e) {
            res.status(500);
            console.error(e);
            return new Error(e);
        }
    },

    setRelayValue: function (req, res) {
        try {
            console.log("[wateringSystem - setRelayValue()]'");
            if (req == undefined) {
                res.status(500);
                console.error("[PUT] /api/wateringSystem/relay/ error bad request");
                return new Error("empty content");
            }
            var state = req.params.state;
            if (state != 1 && state != 0) {
                res.status(500);
                console.error("[PUT] /api/wateringSystem/relay/error bad value");
                return new Error("empty bad Value");
            }
            blynkProxy.setPinValue("V1", state).then(function () { res.send("1") }).catch(function (error) { console.log(error); res.status(500) });
        } catch (e) {
            res.status(500);
            console.error(e);
            return new Error(e);
        }
    },


    getRelayValue: function (req, res) {
        try {
            blynkProxy.getPinValue("V1").then(function (result) {
                res.send(result);
            }).catch(function (error) { console.log(error); res.status(500) });
        } catch (e) {
            res.status(500);
            console.error(e);
            return new Error(e);
        }
    },

    getRainDetector: function (req, res) {
    try {
        blynkProxy.getPinValue("A15").then(function (result) {
            res.send(result);
        }).catch(function (error) { console.log(error); res.status(500) });
    } catch (e) {
        res.status(500);
        console.error(e);
        return new Error(e);
    }
}
}