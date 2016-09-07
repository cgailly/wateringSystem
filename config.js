var config = {};
config.mock = true;
config.web = {};
config.Blynk = {};
config.web.port = 8081;
config.Blynk.port = 8080;
config.Blynk.server = "13.74.253.190";
config.Blynk.authToken = "b92369a1ae554debbfcaa5f3f9bc7bb7";

config.mongoDb = {};
config.mongoDb.url = 'mongodb://localhost:27017/wateringSystem';

 
module.exports = config;