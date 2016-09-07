var blynkProxy = require('./blynkProxy');
var wateringSystem = require('./wateringSystem');
var mongoDbProxy = require('./mongoDb/mongoDbProxy');

module.exports = function (app) {
    this.app = app;
    app.put('/api/wateringSystem/relay/:state', wateringSystem.setRelayValue);
    app.get('/api/wateringSystem/relay/', wateringSystem.getRelayValue);
    app.get('/api/wateringSystem/rainDetector/', wateringSystem.getRainDetectorValue);
    app.get('/api/wateringSystem/connected/', wateringSystem.getIsWateringSystemConnected);
    app.get('/api/wateringSystem/rainDetector/data', function (req, res) {
        mongoDbProxy.getRainValues().then(function (result) { res.send(result); },
                                        function () {
                                            res.status(500);
                                            console.error(e);
                                            return new Error(e);
                                        });
    });
}