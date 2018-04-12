var Trending = require('github-trend');
var scraper = new Trending.Scraper();

exports.getHome = function (req, res, next) {
  req.vueOptions = {
    head: {
      title: "GitStarter"
    }
  };
  scraper.scrapeTrendingReposFullInfo('').then(repos => {
    const data = {
      repos: repos
    };
    res.renderVue('homePage.vue', data, req.vueOptions);
  }).catch(err => {
    res.renderVue('homePage.vue', {}, req.vueOptions);
  });
};
