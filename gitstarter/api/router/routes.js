var express = require('express');
var expressVue = require('express-vue');
var path = require('path');

module.exports = function(app) {
  const vueOptions = {
    rootPath: path.join(__dirname, "../../app")
  }
  const expressVueMiddleware = expressVue.init(vueOptions);
  app.use(expressVueMiddleware);

  var homeController = require('../controllers/homeController');
  app.get('/', homeController.getHome);
}
