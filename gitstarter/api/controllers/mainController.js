var path = require('path');

exports.getMain = function(req, res) {
  if (req.cookies.session_token == null || req.cookies.session_token == "") {
    res.sendFile(path.join(__dirname, '../../app/views/homePage.html'));
  } else {
    res.sendFile(path.join(__dirname, '../../app/views/explore.html'));
  }
}
