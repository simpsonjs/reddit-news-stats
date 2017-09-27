const url = require('url');
const request = require('request');
const { newsList } = require('./newslist');

const BASE_URL = 'https://www.reddit.com/r/all/comments/.json?limit=100';
let newsAddedUrl;

module.exports = (connection) => {
  request({ url: BASE_URL, json: true }, (error, response, body) => {
  if (!error && response.statusCode === 200) {

      let comments = body.data.children;

      for (let i = 0; i < comments.length; i++) {
        if (comments[i].data.author != 'AutoModerator' && comments[i].data.author != 'autotldr' && comments[i].data.over_18 == false) {

          let urlsAr = findUrls(comments[i].data.body);

          for (let k = 0; k < urlsAr.length; k++) {
            getAllNews(urlsAr[k], comments[i], connection);
          }

        }
      }

    }
  });
}

getAllNews = (fullUrl, commentData, connection) => {
  const hostURL = url.parse(fullUrl).hostname;
  if (hostURL != null && newsAddedUrl != fullUrl) {

    for (let k = 0; k < newsList.length; k++) {
      if (hostURL.includes('.' + newsList[k].domain) || hostURL == newsList[k].domain) {

        newsAddedUrl = fullUrl;

        const query = `INSERT INTO redditnews (DOMAIN, NAME, URL, SUBREDDIT, AUTHOR)
                    VALUES ('${newsList[k].domain}', '${newsList[k].name}', '${fullUrl}', '${commentData.data.subreddit}', '${commentData.data.author}');`;

        executeQuery(query, connection);
        console.log(fullUrl);
      }
    }

  }
}

executeQuery = (query, connection) => {
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
  });
}

findUrls = (text) => {
  let source = (text || '').toString();
  let urlArray = [];
  let url;
  let matchArray;

  let regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;

  while((matchArray = regexToken.exec(source)) !== null)
  {
      let token = matchArray[0];
      urlArray.push(token);
  }

  return urlArray;
}
