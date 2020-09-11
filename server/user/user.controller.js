const express = require('express');
const router = express.Router();
//const controlService = require('./control.service');

router.post('/isLoggedIn', isLoggedIn);
router.post('/setAccessToken', setAccessToken);
router.post('/getAccessToken', getAccessToken);
router.post('/setRefreshToken', setRefreshToken);
router.post('/getRefreshToken', getRefreshToken);
router.post('/setTokens', setTokens);
router.post('/getTokens', getTokens);

module.exports = router;

let loggedIn = false;
let accessToken = '';
let refreshToken = '';

function isLoggedIn(req, res, next) {
  res.json({'loggedIn': loggedIn});
}

function setAccessToken(req, res, next) {
  accessToken = req.body.accessToken;
  res.json({'success': true});
}
function getAccessToken(req, res, next) {
  res.json({'accessToken': accessToken});
}

function setRefreshToken(req, res, next) {
  refreshToken = req.body.refreshToken;
  res.json({'success': true});
}
function getRefreshToken(req, res, next) {
  res.json({'refreshToken': refreshToken});
}

function setTokens(req, res, next) {
  accessToken = req.body.accessToken;
  refreshToken = req.body.refreshToken;
  console.log(req.body);
  loggedIn = (accessToken != '');
  res.json({'success': true});
}
function getTokens(req, res, next) {
  res.json({'accessToken': accessToken, 'refreshToken': refreshToken});
}
