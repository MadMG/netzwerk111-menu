const cheerio = require('cheerio');
const request = require('request');
const moment = require('moment');
const dateFormat = 'DD.MM.YYYY';

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

      let result = [];

      $('.menu1').each(function (i, category) {
        let weekDescription;

        $(category).each(function (i, element) {
          weekDescription = $(element).text().trim();
        });

        $(category).parent().find('.menu-item').each(function (i, item) {
          let date = moment($(item).find('.menu-title2').text(), dateFormat);
          let menuItems = $(item).find('.menu-description2').text().split('Menü')
              .filter(function (element, index) {
                return index !== 0;
              })
              .map(function (meal) {
                let idx = meal.indexOf('- oder -');

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
