var express = require('express');
var router = express.Router();

// these routes begin with /api/users

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  // res.send('hello from server!')
  const name = req.body.name
  res.json({name})
})

module.exports = router;
