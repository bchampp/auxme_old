const express = require('express');
const router = express.Router();
//const controlService = require('./control.service');

router.post('/toggleplay', toggleplay);

module.exports = router;

function toggleplay(req, res, next) {
  console.log("Recieved data: ");
  console.log(req.body);
  res.send('Test Complete');
}
