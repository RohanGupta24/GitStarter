var Trending = require('github-trend');
var scraper = new Trending.Scraper();

exports.getHome = function (req, res, next) {
  req.vueOptions = {
    head: {
        title: 'GitStarter',
        scripts: [
            { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js' },
        ],
        styles: [
            { style: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' }
        ]
    }
  };
  scraper.scrapeTrendingReposFullInfo('').then(repos => {
    const data = {
      ProjectsLists: repos
    };
    console.log(repos);
    res.renderVue('homePage.vue', data, req.vueOptions);
  }).catch(err => {
    res.renderVue('homePage.vue', {}, req.vueOptions);
  });
};
