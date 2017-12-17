const api = require('./api/api');

const urls = {
  basicStats: '/api/stats/basic',
  topReferencers: '/api/stats/users',
  subBreakdown: '/api/stats/subreddits',
  subredditSearch: '/api/stats/subredditsearch',
  subredditSelect: '/api/stats/subredditselect',
  domainBreakdown: '/api/stats/domain',
  timeBreakdown: '/api/stats/timedata'
};

module.exports = app => {
  app.get(urls.basicStats, api.getBasicStats);
  app.get(urls.topReferencers, api.getTopReferencers);
  app.get(urls.subBreakdown, api.getSubBreakdown);
  app.get(urls.subredditSearch, api.getSubredditSearch);
  app.get(urls.subredditSelect, api.getSubredditSelect);
  app.get(urls.domainBreakdown, api.getDomainBreakdown);
  app.get(urls.timeBreakdown, api.getTimeBreakdown);
};
