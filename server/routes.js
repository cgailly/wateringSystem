var blynkProxy = require('./blynkProxy');
var wateringSystem = require('./wateringSystem');

module.exports = function (app) {
    this.app = app;
    app.put('/api/wateringSystem/state/:state', wateringSystem.setPinValue);
    app.get('/api/wateringSystem/connected/', wateringSystem.getIsWateringSystemConnected);
}