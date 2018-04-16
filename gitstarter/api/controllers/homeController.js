var path = require('path');
var fetch = require('node-fetch');
var Trending = require('github-trend');
var scraper = new Trending.Scraper();

const baseURL = "https://api.github.com";

exports.getHome = function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../app/views/homePage.html'));
};

exports.getTrending = function (req, res, next) {
  scraper.scrapeTrendingReposFullInfo('').then(repos => {
    var repositories = new Object();
    repositories.author = repos.owner;
    repositories.projectName = repos.name;
    repositories.projectDescription = repos.description;
    const data = {
      projectsList: repositories
    }
    res.send(data);
  }).catch(err => {
    res.status(400).send({message : "Repos not found."})
  });
}

exports.getUserContent = function (req, res, next) {
  const user = req.query.user;
  const path = "/users/" + user;
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
  const path = "/repos/" + owner + "/" + repo + "/stats/commit_activity";
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
    var data = {currentValue: commitData, previousValue: prevCommitData, percentChange: percentChange};
    res.send(data);
  }).catch(function(err) {
    res.status(400).send({message : "Commit activity not found."})
  });
}
