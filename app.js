var cheerio = require('cheerio');
var request = require('request');
var moment = require('moment');
var dateFormat = 'DD.MM.YYYY';

module.exports = {
  retrieve: function (callback) {
    request({
      method: 'GET',
      url: 'http://www.netzwerk111.at/restaurant-hartberg/mittagsmenu/'
    }, function (err, response, body) {
      if (err) {
        callback(err);
        return;
      }

      $ = cheerio.load(body, {
        normalizeWhitespace: true,
        xmlMode: true
      });

      var result = [];

      $('.menu1').each(function (i, category) {
          var weekDescription;

          $(category).each(function (i, element) {
            weekDescription = $(element).text().trim();
          });

          $(category).parent().find('.menu-item').each(function (i, item) {
            var date = moment($(item).find('.menu-title2').text(), dateFormat);
            var menuItems = $(item).find('.menu-description2').text().split('Menü')
                .filter(function (element, index) {
                  return index !== 0;
                })
                .map(function (meal) {
                  var idx = meal.indexOf('- oder -');

                  if (idx !== -1) {
                    meal = meal.substring(4, idx);
                  } else {
                    meal = meal.substring(4);
                  }

                  return meal.trim();
                });

            result.push({
              date: date.format('YYYY-MM-DD'),
              items: menuItems,
              week: date.format('W')
            });
          });
      });

      callback(undefined, result);
    });
  }
};
