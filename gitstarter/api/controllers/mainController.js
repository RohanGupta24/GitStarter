var path = require('path');

exports.getMain = function(req, res) {
  res.sendFile(path.join(__dirname, '../../app/views/mainPage.html'));
}
