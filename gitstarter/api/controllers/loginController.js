var githubOAuth = require('github-oauth')({
  githubClient : process.env['GITHUB_CLIENT'],
  githubSecret : process.env['GITHUB_SECRET'],
  baseURL : 'https://git-starter.herokuapp.com',
  loginURI : '/login',
  callbackURI : '/main',
});

exports.login = function(req, res) {
  return githubOAuth.login(req, res);
};

exports.callback = function(req, res) {
  return githubOAuth.callback(req, res);
};

githubOAuth.on('error', function(err) {
  console.log(err);
});

githubOAuth.on('token', function(token, serverResponse) {
  serverResponse.end(JSON.stringify(token));
});
