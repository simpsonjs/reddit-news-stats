var newsController = (function() {
  var urls = {
    basicStats: '/api/stats/basic',
    topReferencers: '/api/stats/users',
    subBreakdown: '/api/stats/subreddits',
    subredditSearch: '/api/stats/subredditsearch',
    subredditSelect: '/api/stats/subredditselect',
    domainBreakdown: '/api/stats/domain',
    timeBreakdown: '/api/stats/timedata'
  };

  function xhrGet(url, data) {
    return $.ajax({
      url: url,
      type: 'GET',
      data: data,
      dataType: 'json'
    }).fail(function(er) {
      console.log('error: ', er);
    });
  }

  function setUpBasicStats() {
    var basicTable = $('#basic-stats-table').DataTable();
    xhrGet(urls.basicStats, null).done(function(data) {
      $('#basic-stats-count span').text(data.count);
      for (var i = 0; i < data.stats.length; i++) {
        basicTable.row
          .add([
            data.stats[i].rank,
            data.stats[i].domain,
            data.stats[i].name,
            data.stats[i].count,
            data.stats[i].percentTotal
          ])
          .draw();
      }
    });
  }

  function setUpTopReferencers() {
    var topRefTable = $('#top-referencers-table').DataTable();
    xhrGet(urls.topReferencers, null).done(function(data) {
      for (var i = 0; i < data.length; i++) {
        topRefTable.row
          .add([i + 1, data[i].author, data[i].count, data[i].freq])
          .draw();
      }
    });
  }

  function setUpSubBreakdown() {
    xhrGet(urls.subBreakdown, null).done(function(data) {
      $('#subreddit-sub-count span').text(data.subCount);
      Highcharts.chart(
        'subreddit-breakdown-chart',
        chartOptions('References by Subreddit', data.data)
      );
    });
  }

  function setUpSourceBreakdown() {
    xhrGet(urls.subredditSearch, null).done(function(data) {
      $('#subreddit-search').autocomplete({
        source: data,
        select: function(e, ui) {
          sourceBreakdown(ui.item.value);
        }
      });

      $('#subreddit-search').val('Futurology');
      sourceBreakdown('Futurology');
    });
  }

  function sourceBreakdown(subreddit) {
    var params = { subreddit: subreddit };
    xhrGet(urls.subredditSelect, params).done(function(data) {
      Highcharts.chart(
        'source-breakdown-chart',
        chartOptions(subreddit, data.data)
      );
    });
  }

  function setUpDomainBreakdown() {
    var params = { domain: 'businessinsider.com' };
    xhrGet(urls.domainBreakdown, params).done(function(data) {
      $('#domain-breakdown').autocomplete({
        source: data.news,
        select: function(e, ui) {
          domainBreakdown(ui.item.value);
        }
      });

      $('#domain-breakdown').val('businessinsider.com');
      Highcharts.chart(
        'domain-breakdown-chart',
        chartOptions('businessinsider.com', data.data)
      );
    });
  }

  function domainBreakdown(domain) {
    var params = { domain: domain };
    xhrGet(urls.domainBreakdown, params).done(function(data) {
      Highcharts.chart(
        'domain-breakdown-chart',
        chartOptions(domain, data.data)
      );
    });
  }

  function setUpTimeBreakdown() {
    xhrGet(urls.timeBreakdown, null).done(function(data) {
      Highcharts.chart(
        'time-breakdown-chart',
        barChartOptions(data.hour, data.count)
      );
    });
  }

  function chartOptions(title, data) {
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: title
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color:
                (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                'black'
            }
          }
        }
      },
      series: [
        {
          name: 'Count',
          colorByPoint: true,
          data: data
        }
      ]
    };
  }

  function barChartOptions(x, y) {
    return (timeOptions = {
      chart: {
        type: 'column'
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Reference count by hour of day'
      },
      xAxis: {
        categories: x,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total Count'
        }
      },
      tooltip: {},
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Count',
          data: y
        }
      ]
    });
  }

  function init() {
    setUpBasicStats();
    setUpTopReferencers();
    setUpSubBreakdown();
    setUpSourceBreakdown();
    setUpDomainBreakdown();
    setUpTimeBreakdown();
  }

  return {
    init: init
  };
})();
