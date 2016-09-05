var config = require('../../config');
var mongoose = require('mongoose');
var mongoDbProxy = {

    init: function () {
        this.connect();
        this.createModels();
    },

    createModels: function () {
        var rainSensorValuesSchema = new mongoose.Schema({
            rainSensorValue: Number,
            date: { type: Date, default: Date.now },
        });

        this.rainSensorValuesModel = mongoose.model(this.getRainValuesModelName(), rainSensorValuesSchema);
    },

    getRainValuesModelName: function () {
        if (config.mock) {
            return 'rainValues_mock'
        }
        return 'rainValues'
    },

    connect: function () {
        this.db = mongoose.connection;

        this.db.on('connecting', function () {
            console.log('connecting to MongoDB...');
        });

        this.db.on('error', function (error) {
            console.error('Error in MongoDb connection: ' + error);
            mongoose.disconnect();
        });
        this.db.on('connected', function () {
            console.log('MongoDB connected!');
        });
        this.db.once('open', function () {
            console.log('MongoDB connection opened!');
        });
        this.db.on('reconnected', function () {
            console.log('MongoDB reconnected!');
        });
        this.db.on('disconnected', function () {
            console.log('MongoDB disconnected!');
            mongoose.connect('mongodb://koolcenter:aze123AZE@ds011903.mlab.com:11903/koolcenter');
        });
        mongoose.connect('mongodb://koolcenter:aze123AZE@ds011903.mlab.com:11903/koolcenter'); 
    },

    addRainSensorValue: function (value) {
        return new Promise(function (resolve, reject) {
            console.log("Entering");
            var sensorValue = new this.rainSensorValuesModel({ 'rainSensorValue': value });
            console.log("Saving");
            sensorValue.save(function (error) {
                console.log("SAVE Is DONE");
                if (error) {
                    console.log("Error :" + error);
                    console.log("calling reject");
                    reject(error);
                    console.log("reject called");
                    return;
                }

                resolve();
            });
        }.bind(this));
    },

    getRainValues : function() {
        return new Promise(function (resolve, reject) {
            console.log("OK"); console.log("Creating query");
            var query = this.rainSensorValuesModel.find(null).limit(100);
            query.exec(
                    function (err, result) {
                        console.log("OK"); console.log("Query completed");
                        if (err) { reject(err); }
                        resolve(result);
                    }
                    );
            console.log("OK"); console.log("Query executed");
        }.bind(this));
    }

}

mongoDbProxy.init();

module.exports = mongoDbProxy;
