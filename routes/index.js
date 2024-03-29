var express = require('express');
var router = express.Router();
var vagueTime = require('vague-time');
var axios = require('axios')

/*
 * This is now using flat text.
 * Whoever takes this on, your goal will be to implement this using:
 *
 * https://api.vanhack.ca/s/vhs/data/laser.json
 * 
 */

router.get('/', async function(req, res, next) {
  try {
    const result = await axios('https://api.vanhack.ca/s/vhs/data/laser.json')

    var laser_status = result.data

    var current_time = Math.floor(new Date().getTime() / 1000);
    var time_changed = laser_status.last_updated;
    var vague_changed = vagueTime.get({from:current_time, to:time_changed, units:'s'});
  
    if( laser_status.value == "off" ) {
      res.render('index', { title: 'Is The Laser Busy', message: 'The laser is not busy! Last usage was ' + vague_changed + '.' });
    } else {
      res.render('index', { title: 'Is The Laser Busy', message: 'The laser is in use and has been in use since ' + vague_changed + '.' });
    }
  } catch(err) {
    // Crawling failed...
    res.render('index', { title: 'Is The Laser Busy', message: 'There was an error!' });
    console.dir( err );
  }
})

module.exports = router;
