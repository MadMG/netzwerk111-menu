# netzwerk111-menu
A netzwerk111.at menu parser

## Usage
```javascript
var menu = require('netzwerk111-menu');
 
menu.retrieve(function (err, data) {
 if (err) {
   // do error handling
 }
 
 // work with the received data
});
```

## Data structure
Representation of a single day:
```javascript
{
    "date": string  // date string with format 'YYYY-MM-DD'
    "items": array, // array with menu descriptions
    "week": number  // week in year
  }
```
  
Example:
```javascript
[
  {
    "date": "2016-09-19",
    "items": [
      "Falsches Cordon bleu mit Pommes frites",
      "Nudelauflauf mit Tomaten und Mozzarella"
    ],
    "week": "38"
  },
  {
    "date": "2016-09-20",
    "items": [
      "Schweinskotelett \"Zingara\" mit Röstitaler",
      "Ebly-Zartweizenpfanne mit Schafkäse und buntem Gemüse"
    ],
    "week": "38"
  },
  {
    "date": "2016-09-21",
    "items": [
      "Rindsragout mit Butterspätzle",
      "Linseneintopf mit Salzkartoffeln"
    ],
    "week": "38"
  },
  {
    "date": "2016-09-22",
    "items": [
      "Gebackenes Pangasiusfilet mit Kräuterreis und Sauce Tartar",
      "Polentalaibchen auf Ratatouillegemüse"
    ],
    "week": "38"
  },
  {
    "date": "2016-09-23",
    "items": [
      "Champignonrahmschnitzel mit Bandnudeln",
      "Cremiger Blattspinat mit Erdäpfelröster und Spiegelei"
    ],
    "week": "38"
  }
]
```
