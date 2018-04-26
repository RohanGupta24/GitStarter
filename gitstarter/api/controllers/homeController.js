var path = require('path');
var fetch = require('node-fetch');
var Trending = require('github-trend');
var scraper = new Trending.Scraper();

const baseURL = "https://api.github.com";

exports.getDownArrow = function (req, res, next) {
	res.sendFile(path.join(__dirname, '../../app/views/downArrow.gif'));
}

exports.getHome = function (req, res, next) {
  if (req.cookies.session_token == null || req.cookies.session_token == "") {
    res.sendFile(path.join(__dirname, '../../app/views/homePage.html'));
  } else {
    res.redirect('/home');
  }
};

exports.getTrending = function (req, res, next) {
  scraper.scrapeTrendingReposFullInfo('').then(repos => {
    var projectsList = [];
    for (var i = 0; i < Math.min(5, repos.length); i++) {
      var repo = new Object();

      repo.Author = repos[i].owner;
      repo.ProjectName = repos[i].name;
      repo.ProjectDescription = repos[i].description;
      projectsList.push(repo);
    }
    const data = {
      projectsList: projectsList
    }
    res.send(data);
  }).catch(err => {
    res.status(400).send({message : "Repos not found."})
  });
}

exports.getUserContent = function (req, res, next) {
  const user = req.query.user;
  var path = "/users/" + user;
  if (req.cookies.session_token != null) {
    path = path + "?access_token=" + req.cookies.session_token;
  }
  fetch(baseURL + path).then(function(response) {
    return response.json();
  }).then(function(json) {
    const data = {
      "avatar_url" : json.avatar_url,
      "html_url" : json.html_url
    }
    res.send(data);
  }).catch(function(err) {
    res.status(400).send({message : "User content unavailable."});
  });
}

exports.getValue = function (req, res, next) {
  const owner = req.query.owner;
  const repo = req.query.repo;
  var path = "/repos/" + owner + "/" + repo + "/stats/commit_activity";
  if (req.cookies.session_token != null) {
    path = path + "?access_token=" + req.cookies.session_token;
  }
  fetch(baseURL + path).then(function(response) {
    return response.json();
  }).then(function(json) {
    var day = new Date();
    var dayOfWeek = day.getDay();
    var weekData = json[json.length - 1];
    var commitData = 0;
    var prevCommitData = 0;
    for (var i = 0; i <= dayOfWeek; i++) {
      commitData += weekData.days[i];
      if (i < dayOfWeek) {
        prevCommitData += weekData.days[i];
      }
    }
    weekData = json[json.length - 2];
    for (var i = 6; i > dayOfWeek; i--) {
      commitData += weekData.days[i];
      prevCommitData += weekData.days[i];
    }
    prevCommitData += weekData.days[dayOfWeek];
    var percentChange = Math.round(((commitData - prevCommitData) / prevCommitData) * 1000) / 10;
    var data = {owner: owner, repo: repo, currentValue: commitData, previousValue: prevCommitData, percentChange: percentChange};
    res.send(data);
  }).catch(function(err) {
    res.status(400).send({message : "Commit activity not found."})
  });
}
