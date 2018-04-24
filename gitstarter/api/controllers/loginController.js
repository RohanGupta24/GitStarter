var { Pool } = require('pg');
var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
var fetch = require('node-fetch');

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

exports.logout = function(req, res) {
  res.clearCookie('username');
  res.clearCookie('session_token');
  res.redirect('/');
};

githubOAuth.on('error', function(err, res) {
  console.log(err);
  res.status(401).redirect('/');
});

githubOAuth.on('token', function(token, res) {
  fetch("https://api.github.com/user?access_token=" + token.access_token).then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    pool.connect(function(err, client, done) {
      const query = "WITH I AS (SELECT username FROM Investor WHERE username = $1), J AS (INSERT INTO Investor(username, balance) SELECT $1, $2 WHERE NOT EXISTS (SELECT 1 FROM I) RETURNING username) SELECT username FROM I UNION ALL SELECT username FROM J";
      client.query(query, [json.login, 100], function(err, result) {
        console.log(err);
        console.log(result);
        console.log(json);
        if (err) {
          done();
          res.status(401).redirect('/');
        } else {
          done();
          res.cookie('username', json.login);
          res.cookie('session_token', token.access_token);
          res.redirect('/home');
        }
      })
    })
  }).catch(function(err) {
    console.log(err);
    res.status(401).redirect('/');
  });
});
