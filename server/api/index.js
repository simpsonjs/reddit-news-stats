const { newsList } = require('../bot/newslist');
const queries = require('./queries')

const urls = {
  basicStats: '/api/stats/basic',
  topReferencers: '/api/stats/users',
  subBreakdown: '/api/stats/subreddits',
  subredditSearch: '/api/stats/subredditsearch',
  subredditSelect: '/api/stats/subredditselect',
  domainBreakdown: '/api/stats/domain',
  timeBreakdown: '/api/stats/timedata'
};

module.exports = (app, connection) => {

  app.get(urls.basicStats, (req, res) => {

    connection.query(queries.basicStats, (error, results, fields) => {
      if (error) throw error;

      let totalCount = 0, dataAr = [];

      for (let i = 0; i < results.length; i++) {
        totalCount += results[i].count;
      }

      for (let i = 0; i < results.length; i++) {
        dataAr.push({
          rank: i + 1,
          domain: results[i].domain,
          name: results[i].name,
          count: results[i].count,
          percentTotal: (results[i].count / totalCount * 100).toFixed(3) + '%',
        });
      }

      res.send({stats: dataAr, count: totalCount});
    });

  });

  app.get(urls.topReferencers, (req, res) => {

    connection.query(queries.topReferencers, (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });

  });

  app.get(urls.subBreakdown, (req, res) => {

    connection.query(queries.subBreakdown, (error, results, fields) => {
      if (error) throw error;

      let count = 0, totalCount = 0, dataAr = [];

      for (let i = 0; i < results.length; i++) {
        totalCount += results[i].count;
      }

      for (let i = 0; i < 13; i++) {
        dataAr.push({
          name: results[i].subreddit,
          y: results[i].count
        });
        count += results[i].count;
      }

      dataAr.push({ name: 'other', y: totalCount - count });

      res.send({data: dataAr, subCount: results.length});
    });

  });

  app.get(urls.subredditSearch, (req, res) => {

    connection.query(queries.subredditSearch, (error, results, fields) => {
      if (error) throw error;

      let subredditAr = [];

      for (let k = 0; k < results.length; k++) {
        subredditAr.push(results[k].subreddit);
      }

      res.send(subredditAr);
    });

  });

  app.get(urls.subredditSelect, (req, res) => {

    connection.query(queries.subredditSelect(req.query.subreddit), (error, results, fields) => {
      if (error) throw error;

      let dataAr = [];

      for (let i = 0; i < results.length; i++) {
        dataAr.push({
          name: results[i].domain,
          y: results[i].count
        });
      }

      res.send({data: dataAr, subCount: results.length});
    });

  });

  app.get(urls.domainBreakdown, (req, res) => {

    connection.query(queries.domainBreakdown(req.query.domain), (error, results, fields) => {
      if (error) throw error;

      let dataAr = [], newsAr = [], count = 0, totalCount = 0;

      for (k = 0; k < results.length; k++) {
        totalCount += results[k].count;
      }

      if (results.length < 12) {
        for (let k = 0; k < results.length; k++) {
          dataAr.push({
            name: results[k].subreddit,
            y: results[k].count
          });
        }
      } else {
        for (let k = 0; k < 12; k++) {
          dataAr.push({
            name: results[k].subreddit,
            y: results[k].count
          });
          count += results[k].count;
        }
        dataAr.push({
          name: 'other',
          y: totalCount - count
        });
      }

      for (let i = 0; i < newsList.length; i++) {
        newsAr.push(newsList[i].domain);
      }

      res.send({ data: dataAr, news: newsAr});
    });

  });

  app.get(urls.timeBreakdown, (req, res) => {

    connection.query(queries.timeBreakdown, (error, results, fields) => {
      if (error) throw error;

      let hourAr = [], countAr = [];

      for (let i = 0; i < results.length; i++) {
        hourAr.push(results[i].hour);
        countAr.push(results[i].count);
      }

      res.send({ hour: hourAr, count: countAr});
    });

  });

};
