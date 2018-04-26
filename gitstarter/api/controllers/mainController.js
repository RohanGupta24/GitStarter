var path = require('path');

exports.getMain = function(req, res) {
  if (req.cookies.session_token == null || req.cookies.session_token == "") {
    res.sendFile(path.join(__dirname, '../../app/views/homePage.html'));
  } else {
    res.sendFile(path.join(__dirname, '../../app/views/investments.html'));
  }
}

exports.getExplore = function(req, res) {
  if (req.cookies.session_token == null || req.cookies.session_token == "") {
    res.sendFile(path.join(__dirname, '../../app/views/homePage.html'));
  } else {
    res.sendFile(path.join(__dirname, '../../app/views/explore.html'));
  }
}

exports.getFAQ = function(req, res) {
  res.sendFile(path.join(__dirname, '../../app/views/faq.html'));
}

exports.getTransaction = function(req, res) {
  if(req.cookies.session_token == null || req.cookies.session_token == "") {
    res.sendFile(path.join(__dirname, '../../app/homePage.html'));
  } else {
    res.sendFile(path.join(__dirname, '../../app/views/transaction.html'));
  }
}
