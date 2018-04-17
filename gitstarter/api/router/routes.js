var express = require('express');

module.exports = function(app) {
  var homeController = require('../controllers/homeController');
  var loginController = require('../controllers/loginController');
  var projectController = require('../controllers/projectController')
  
  app.get('/', homeController.getHome);
  app.get('/trending', homeController.getTrending);
  app.get('/value', homeController.getValue);
  app.get('/login', loginController.login);
  app.get('/main', loginController.callback);
  app.get('/data/week', projectController.getWeekData);
  app.get('/data/month', projectController.getMonthData);
  
}
