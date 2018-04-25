var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');

var PORT = process.env.PORT || 8080;

var app = express();

app.use(cookieParser());
var routes = require('./api/router/routes');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app')));

app.listen(PORT, function() {
  console.log("Listening on port " + PORT);
});

routes(app);
