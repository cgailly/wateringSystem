var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
console.log("__dirname " + __dirname);
var express = require('express');
this.app = express();
this.app.use(express.static(__dirname + '/Web'));
this.app.use(morgan('dev'));                     // log every request to the console
this.app.use(bodyParser.urlencoded({ extended: false }));
this.app.use(bodyParser.json());
this.app.use(methodOverride());


var routes = require('./server/routes');
this.routes = routes(this.app);
this.app.listen(config.web.port);
console.log("Listen " + config.web.port);