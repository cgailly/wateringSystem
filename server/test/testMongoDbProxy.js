var expect  = require("chai").expect;
var chai = require("chai").expect;
var assert = require('assert');
var mongoDbProxy = require("../mongoDb/mongoDbProxy");


describe("testMongoDbProxy", function() {
        it("Test 0", function() {
            expect(1+1).to.equal(2);
        });

        it("addRainSensorValue.addRainSensorValue", function (done) {
            this.timeout(10000);
            mongoDbProxy.addRainSensorValue(1000).then(function () { console.log("Done"); done(); }, function (error) { console.log("TestError "); done(error); });           
        });
        it("addRainSensorValue.getRainValues", function (done) {
            this.timeout(10000);
            mongoDbProxy.getRainValues(1000).then(function (result) {
                for (var i = 0, l = result.length; i < l; i++) {
                    var entry = result[i];
                    console.log('------------------------------');
                    console.log('value : ' + entry.rainSensorValue);
                    console.log('Date : ' + entry.date);
                    console.log('------------------------------');
                }
                done(); 
            }, function (error) { console.log("TestError "); done(error); });
        });
    
        
});

