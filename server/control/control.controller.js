const express = require('express');
const router = express.Router();
const request = require('request'); // "Request" library
//const controlService = require('./control.service');

//Music control
router.post('/togglePlay', togglePlay);
router.post('/nextTrack', nextTrack);
router.post('/prevTrack', prevTrack);

//User functions
router.post('/isLoggedIn', isLoggedIn);
router.post('/setAccessToken', setAccessToken);
router.post('/getAccessToken', getAccessToken);
router.post('/setRefreshToken', setRefreshToken);
router.post('/getRefreshToken', getRefreshToken);
router.post('/setTokens', setTokens);
router.post('/getTokens', getTokens);

module.exports = router;

let playing = false;
let loggedIn = false;
let accessToken = '';
let refreshToken = '';

function togglePlay(req, res, next) {
  if (!playing) {
    request({
      url: "https://api.spotify.com/v1/me/player/play",
      method: "PUT",
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }, (err, res, body) => {
      playing = true;
    });
  } else {
    request({
      url: "https://api.spotify.com/v1/me/player/pause",
      method: "PUT",
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }, (err, res, body) => {
      playing = false;
    });
  }
  res.json({success: true});
}

function nextTrack(req, res, next) {
  request({
    url: "https://api.spotify.com/v1/me/player/next",
    method: "POST",
    headers: { 'Authorization': 'Bearer ' + accessToken }
  }, (err, res, body) => {

  });
  res.json({success: true});
}

function prevTrack(req, res, next) {
  request({
    url: "https://api.spotify.com/v1/me/player/previous",
    method: "POST",
    headers: { 'Authorization': 'Bearer ' + accessToken }
  }, (err, res, body) => {

  });
  res.json({success: true});
}


// ---------------------------------------------------------------- USER Functions ----------------------------------------------------------------

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
  loggedIn = (accessToken != '');
  res.json({'success': true});
}
function getTokens(req, res, next) {
  res.json({'accessToken': accessToken, 'refreshToken': refreshToken});
}
