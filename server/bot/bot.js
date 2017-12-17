const url = require('url');
const request = require('request-promise');
const { newsList } = require('./newslist');
const db = require('../db/db');

const REDDIT_URL = 'https://www.reddit.com/r/all/comments/.json?limit=100';

module.exports = () => {
  request({ url: REDDIT_URL, json: true }).then(response => {
    const comments = response.data.children;

    for (let i = 0; i < comments.length; i++) {
      if (
        comments[i].data.author != 'AutoModerator' &&
        comments[i].data.author != 'autotldr' &&
        comments[i].data.over_18 == false
      ) {
        const urlsAr = _findUrls(comments[i].data.body);

        for (let k = 0; k < urlsAr.length; k++) {
          _getAllNews(urlsAr[k], comments[i]);
        }
      }
    }
  });
};

_getAllNews = (fullUrl, commentData) => {
  const hostURL = url.parse(fullUrl).hostname;
  if (hostURL !== null) {
    for (let k = 0; k < newsList.length; k++) {
      if (
        hostURL.includes('.' + newsList[k].domain) ||
        hostURL == newsList[k].domain
      ) {
        const query = `INSERT INTO redditnews (DOMAIN, NAME, URL, SUBREDDIT, AUTHOR)
          VALUES ('${newsList[k].domain}', 
                  '${newsList[k].name}', 
                  '${fullUrl}', 
                  '${commentData.data.subreddit}', 
                  '${commentData.data.author}');`;

        db.query(query, null, (results, error) => {
          console.log(fullUrl);
        });
      }
    }
  }
};

_findUrls = text => {
  let source = (text || '').toString();
  let urlArray = [];
  let url;
  let matchArray;

  let regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;

  while ((matchArray = regexToken.exec(source)) !== null) {
    let token = matchArray[0];
    urlArray.push(token);
  }

  return urlArray;
};
