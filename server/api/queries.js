const topReferencers = `SELECT x.*,
       (SELECT domain
        FROM   redditnews
        WHERE  author = x.author
        GROUP  BY domain
        ORDER  BY Count(*) DESC
        LIMIT  1) AS freq
FROM   (SELECT author,
               Count(*) AS count
        FROM   redditnews
        GROUP  BY author
        ORDER  BY Count(*) DESC
        LIMIT  20) x;`;

const basicStats = `SELECT domain, name, count(*) AS count FROM redditnews Group By domain, name Order By count desc;`;

const subBreakdown = `SELECT subreddit, count(*) AS count FROM redditnews GROUP BY subreddit ORDER BY count desc;`;

const subredditSearch = `SELECT DISTINCT subreddit FROM redditnews ORDER BY subreddit;`;

const subredditSelect = subreddit => {
  return `SELECT domain, count(*) AS count FROM redditnews WHERE subreddit = '${subreddit}' GROUP BY domain ORDER BY count desc;`;
};

const domainBreakdown = domain => {
  return `SELECT subreddit, count(*) AS count FROM redditnews WHERE domain = '${domain}' GROUP BY subreddit ORDER BY count desc;`;
};

const timeBreakdown = `SELECT hour(date) AS hour, count(*) AS count FROM redditnews GROUP BY hour(date) ORDER BY hour(date);`;

module.exports = {
  basicStats,
  topReferencers,
  subBreakdown,
  subredditSearch,
  subredditSelect,
  domainBreakdown,
  timeBreakdown
};
