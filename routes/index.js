var express = require('express');
var router = express.Router();
var rp = require('request-promise');

/*
 * This is now using flat text.
 * Whoever takes this on, your goal will be to implement this using:
 *
 * https://api.vanhack.ca/s/vhs/data/laser.json
 * 
 */

router.get('/', function(req, res, next) {
  rp('https://api.vanhack.ca/s/vhs/data/laser.txt')
  .then(function (htmlString) {
    if( htmlString == "off" ) {
      res.render('index', { title: 'Is The Laser Busy', message: 'The laser is not busy!' });
    } else {
      res.render('index', { title: 'Is The Laser Busy', message: 'The laser is in use...' });
    }
  })
  .catch(function (err) {
    // Crawling failed...
    res.render('index', { title: 'Is The Laser Busy', message: 'There was an error!' });
    console.dir( err );
  });
});

module.exports = router;
