const newsList = [
  {
    domain: 'abc.net.au',
    name: 'ABC News AU',
    url: 'http://www.abc.net.au/'
  },
  {
    domain: 'abcnews.go.com',
    name: 'ABC News',
    url: 'http://abcnews.go.com/'
  },
  {
    domain: 'aljazeera.com',
    name: 'Al Jazeera English',
    url: 'http://www.aljazeera.com/'
  },
  {
    domain: 'arstechnica.com',
    name: 'Ars Technica',
    url: 'https://arstechnica.com/'
  },
  {
    domain: 'apnews.com',
    name: 'Associated Press',
    url: 'https://apnews.com/'
  },
  {
    domain: 'bbc.com',
    name: 'BBC News',
    url: 'http://www.bbc.com/'
  },
  {
    domain: 'bild.de',
    name: 'Bild',
    url: 'http://www.bild.de/'
  },
  {
    domain: 'bloomberg.com',
    name: 'Bloomberg',
    url: 'https://www.bloomberg.com/'
  },
  {
    domain: 'breitbart',
    name: 'Breitbart',
    url: 'http://www.breitbart.com/'
  },
  {
    domain: 'businessinsider.com',
    name: 'Business Insider',
    url: 'http://www.breitbart.com/'
  },
  {
    domain: 'buzzfeed.com',
    name: 'Buzzfeed',
    url: 'https://www.buzzfeed.com/'
  },
  {
    domain: 'cnbc.com',
    name: 'CNBC',
    url: 'http://www.cnbc.com/'
  },
  {
    domain: 'cnn.com',
    name: 'CNN',
    url: 'http://www.cnn.com/'
  },
  {
    domain: 'dailymail.co.uk',
    name: 'Daily Mail',
    url: 'http://www.dailymail.co.uk/'
  },
  {
    domain: 'tagesspiegel.de',
    name: 'Der Tagesspiegel',
    url: 'http://www.tagesspiegel.de/'
  },
  {
    domain: 'zeit.de',
    name: 'Die Zeit',
    url: '"http://www.zeit.de/'
  },
  {
    domain: 'engadget.com',
    name: 'Engadget',
    url: 'https://www.engadget.com/'
  },
  {
    domain: 'ew.com',
    name: 'Entertainment Weekly',
    url: 'http://ew.com/'
  },
  {
    domain: 'espn.com',
    name: 'ESPN',
    url: 'http://www.espn.com/'
  },
  {
    domain: 'ft.com',
    name: 'Financial Times',
    url: 'https://www.ft.com/'
  },
  {
    domain: 'focus.de',
    name: 'Focus',
    url: '"http://www.focus.de/'
  },
  {
    domain: 'football-italia.net',
    name: 'Football Italia',
    url: 'http://www.football-italia.net/'
  },
  {
    domain: 'fortune.com',
    name: 'Fortune',
    url: 'http://fortune.com/'
  },
  {
    domain: 'fourfourtwo.com',
    name: 'FourFourTwo',
    url: 'https://www.fourfourtwo.com/'
  },
  {
    domain: 'foxsports.com',
    name: 'Fox Sports',
    url: 'http://www.foxsports.com/'
  },
  {
    domain: 'foxnews.com',
    name: 'Fox News',
    url: 'http://www.foxnews.com/'
  },
  {
    domain: 'gruenderszene.de',
    name: 'Gruenderszene',
    url: 'https://www.gruenderszene.de/'
  },
  {
    domain: 'handelsblatt.com',
    name: 'Handelsblatt',
    url: 'http://www.handelsblatt.com/'
  },
  {
    domain: 'ca.ign.com',
    name: 'IGN',
    url: 'http://ca.ign.com/'
  },
  {
    domain: 'independent.co.uk',
    name: 'The Independent',
    url: 'http://www.independent.co.uk/'
  },
  {
    domain: 'mashable.com',
    name: 'Mashable',
    url: 'http://mashable.com/'
  },
  {
    domain: 'metro.co.uk',
    name: 'Metro',
    url: 'http://metro.co.uk/'
  },
  {
    domain: 'mirror.co.uk',
    name: 'Mirror',
    url: 'http://www.mirror.co.uk/'
  },
  {
    domain: 'mtv.com',
    name: 'MTV News',
    url: 'http://www.mtv.com/'
  },
  {
    domain: 'mtv.co.uk',
    name: 'MTV News(UK)',
    url: 'http://www.mtv.co.uk/'
  },
  {
    domain: 'nationalgeographic.com',
    name: 'National Geographic',
    url: 'http://www.nationalgeographic.com/'
  },
  {
    domain: 'newscientist.com',
    name: 'New Scientist',
    url: 'https://www.newscientist.com/'
  },
  {
    domain: 'newsweek.com',
    name: 'News Week',
    url: 'http://www.newsweek.com/'
  },
  {
    domain: 'nymag.com',
    name: 'New York Magazine',
    url: 'http://nymag.com/'
  },
  {
    domain: 'polygon.com',
    name: 'Polygon',
    url: 'https://www.polygon.com/'
  },
  {
    domain: 'recode.net',
    name: 'Recode',
    url: 'https://www.recode.net/'
  },
  {
    domain: 'reuters.com',
    name: 'Reuters',
    url: 'http://www.reuters.com/'
  },
  {
    domain: 'spiegel.de',
    name: 'Spiegel Online',
    url: 'http://www.spiegel.de/'
  },
  {
    domain: 't3n.de',
    name: 'T3n',
    url: 'http://t3n.de/'
  },
  {
    domain: 'talksport.com',
    name: 'TalkSport',
    url: 'http://talksport.com/'
  },
  {
    domain: 'techcrunch.com',
    name: 'TechCrunch',
    url: 'https://techcrunch.com/'
  },
  {
    domain: 'techradar.com',
    name: 'TechRadar',
    url: 'http://www.techradar.com/'
  },
  {
    domain: 'economist.com',
    name: 'The Economist',
    url: 'http://www.economist.com/'
  },
  {
    domain: 'theguardian.com',
    name: 'The Guardian',
    url: 'https://www.theguardian.com/'
  },
  {
    domain: 'thehindu.com',
    name: 'The Hindu',
    url: 'http://www.thehindu.com/'
  },
  {
    domain: 'huffingtonpost.com',
    name: 'The Huffington Post',
    url: 'http://www.huffingtonpost.com/'
  },
  {
    domain: 'ladbible.com',
    name: 'The Lad Bible',
    url: 'http://www.ladbible.com/'
  },
  {
    domain: 'nytimes.com',
    name: 'The New York Times',
    url: 'https://www.nytimes.com/'
  },
  {
    domain: 'thenextweb.com',
    name: 'The Next Web',
    url: 'https://thenextweb.com/'
  },
  {
    domain: 'sportsbible.com',
    name: 'The Sports Bible',
    url: 'http://www.sportbible.com/'
  },
  {
    domain: 'telegraph.co.uk',
    name: 'The Telegraph',
    url: 'http://www.telegraph.co.uk/'
  },
  {
    domain: 'timesofindia.indiatimes.com',
    name: 'The Times of India',
    url: 'http://timesofindia.indiatimes.com/'
  },
  {
    domain: 'theverge.com',
    name: 'The Verge',
    url: 'https://www.theverge.com/'
  },
  {
    domain: 'wsj.com',
    name: 'The Wall Street Journal',
    url: 'https://www.wsj.com/'
  },
  {
    domain: 'washingtonpost.com',
    name: 'The Washington Post',
    url: 'https://www.washingtonpost.com/'
  },
  {
    domain: 'time.com',
    name: 'Time',
    url: 'http://time.com/'
  },
  {
    domain: 'usatoday.com',
    name: 'USA Today',
    url: 'https://www.usatoday.com/'
  },
  {
    domain: 'wired.com',
    name: 'Wired',
    url: 'https://www.wired.com/'
  }
];

module.exports = {
  newsList: newsList
};
