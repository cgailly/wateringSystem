var blynkProxy = require('./blynkProxy');
var wateringSystem = require('./wateringSystem');

module.exports = function (app) {
    this.app = app;
    app.put('/api/wateringSystem/relay/:state', wateringSystem.setRelayValue);
    app.get('/api/wateringSystem/relay/', wateringSystem.getRelayValue);
    app.get('/api/wateringSystem/rainDetector/', wateringSystem.getRainDetectorValue);
    app.get('/api/wateringSystem/connected/', wateringSystem.getIsWateringSystemConnected);
}