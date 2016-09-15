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
        return err;
      }

      $ = cheerio.load(body, {
        normalizeWhitespace: true,
        xmlMode: true
      });

      var result = {};

      $('.menu-category').each(function (i, category) {
        if (i > 0) {  // skip general menu
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

            var weekProperty = 'week' + date.format('W');
            var day = {};

            day['date'] = date.format('YYYY-MM-DD');
            day['items'] = menuItems;

            var week = result[weekProperty];
            if (!week) {
              week = [];
            }

            week.push(day);

            result[weekProperty] = week;
          });
        }
      });

      callback(undefined, result);
    });
  }
};