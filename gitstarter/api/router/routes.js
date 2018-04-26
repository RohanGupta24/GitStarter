var express = require('express');

module.exports = function(app) {
  var homeController = require('../controllers/homeController');
  var mainController = require('../controllers/mainController');
  var loginController = require('../controllers/loginController');
  var projectController = require('../controllers/projectController');
  var investController = require('../controllers/investController');

  app.get('/', homeController.getHome);
  app.get('/user', homeController.getUserContent);
  app.get('/home', investController.getInvested);
  app.get('/trending', homeController.getTrending);
  app.get('/value', homeController.getValue);
  app.get('/login', loginController.login);
  app.get('/logout', loginController.logout);
  app.get('/main', loginController.callback);
  app.get('/data/week', projectController.getWeekData);
  app.get('/data/month', projectController.getMonthData);
  app.get('/data/year', projectController.getYearData);
  app.post('/invest', investController.investProject);
  app.post('/sell', investController.sellProject);
  app.get('/investments', investController.getInvestments);
  app.get('/activities', investController.getActivities);
  app.get('/balance', investController.getBalance);
  app.get('/explore', mainController.getMain);
  app.get('/transactions', mainController.getTransaction);
  app.get('/downArrow.gif', homeController.getDownArrow);
  app.get('/logo.png', mainController.getLogo);
  app.get('/faq', mainController.getFAQ);
}
