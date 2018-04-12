var express = require('express');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 8080;

var app = express();

var routes = require('./api/router/routes');

app.use(bodyParser.json());

app.listen(PORT, function() {
  console.log("Listening on port " + PORT);
});

routes(app);
