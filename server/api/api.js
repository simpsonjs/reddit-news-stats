const { newsList } = require('../bot/newslist');
const queries = require('./queries');
const db = require('../db/db');

exports.getBasicStats = (req, res) => {
  db.query(queries.basicStats, null, (results, error) => {
    if (error) return res.status(500).send();

    let totalCount = 0,
      dataAr = [];

    for (let i = 0; i < results.length; i++) {
      totalCount += results[i].count;
    }

    for (let i = 0; i < results.length; i++) {
      dataAr.push({
        rank: i + 1,
        domain: results[i].domain,
        name: results[i].name,
        count: results[i].count,
        percentTotal: (results[i].count / totalCount * 100).toFixed(3) + '%'
      });
    }

    res.send({ stats: dataAr, count: totalCount });
  });
};

exports.getTopReferencers = (req, res) => {
  db.query(queries.topReferencers, null, (results, error) => {
    if (error) return res.status(500).send();
    res.send(results);
  });
};

exports.getSubBreakdown = (req, res) => {
  db.query(queries.subBreakdown, null, (results, error) => {
    if (error) return res.status(500).send();

    let count = 0,
      totalCount = 0,
      dataAr = [];

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

    res.send({ data: dataAr, subCount: results.length });
  });
};

exports.getSubredditSearch = (req, res) => {
  db.query(queries.subredditSearch, null, (results, error) => {
    if (error) return res.status(500).send();

    let subredditAr = [];

    for (let k = 0; k < results.length; k++) {
      subredditAr.push(results[k].subreddit);
    }

    res.send(subredditAr);
  });
};

exports.getSubredditSelect = (req, res) => {
  db.query(
    queries.subredditSelect(req.query.subreddit),
    null,
    (results, error) => {
      if (error) return res.status(500).send();

      let dataAr = [];

      for (let i = 0; i < results.length; i++) {
        dataAr.push({
          name: results[i].domain,
          y: results[i].count
        });
      }

      res.send({ data: dataAr, subCount: results.length });
    }
  );
};

exports.getDomainBreakdown = (req, res) => {
  db.query(
    queries.domainBreakdown(req.query.domain),
    null,
    (results, error) => {
      if (error) return res.status(500).send();

      let dataAr = [],
        newsAr = [],
        count = 0,
        totalCount = 0;

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

      res.send({ data: dataAr, news: newsAr });
    }
  );
};

exports.getTimeBreakdown = (req, res) => {
  db.query(queries.timeBreakdown, null, (results, error) => {
    if (error) return res.status(500).send();

    let hourAr = [],
      countAr = [];

    for (let i = 0; i < results.length; i++) {
      hourAr.push(results[i].hour);
      countAr.push(results[i].count);
    }

    res.send({ hour: hourAr, count: countAr });
  });
};
