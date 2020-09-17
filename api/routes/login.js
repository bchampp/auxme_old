const express = require('express');
const router = express.Router();
const request = require('request'); // "Request" library
const axios = require('axios');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
import dotenv from "dotenv";

dotenv.config('../../.ENV');


// ---------------------------------------------------- SPOTIFY LOGIN ----------------------------------------------------
var client_id = 'f9a4fbbe54354fe78dab1ef7d09d97a2'; // Your client id
var client_secret = '61ce9c15e3d84cecaa1cfbe2f085a858'; // Your secret
var redirect_uri = process.env.REDIRECT_URI;// 'http://localhost:8080/api/login/callback'; // Your redirect uri

console.log(redirect_uri);
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

router.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

router.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your routerlication requests authorization
  var scope = 'user-read-private user-read-email user-modify-playback-state user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

router.get('/callback', function(req, res) {

  // your routerlication requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;


  //THIS WAS NOT WORKING BECAUSE I WAS NOT RECIEVING COOKIES, THERE IS NO ERROR CHECKING RIGHT NOW
  // if (state === null || state !== storedState) {
  //   res.redirect('/#' +
  //     querystring.stringify({
  //       error: 'state_mismatch'
  //     }));
  // } else {
  if (true) {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          //console.log(body);
          console.log("Got Data");
        });

        // we can also pass the token to the browser to make requests from there
        // res.redirect('http://localhost:3000?' +
        //   querystring.stringify({
        //     access_token: access_token,
        //     refresh_token: refresh_token
        //   }));

        res.cookie('access_token', access_token);
        res.cookie('refresh_token', refresh_token);
        res.redirect('http://localhost:3000');

        // pass tokens to our api
        // axios.post('http://localhost:'+process.env.PORT+'/api/spotify/setTokens', {
        //   accessToken: access_token, refreshToken: refresh_token
        // }).then((res) => {
        //   console.log("Set Tokens");
        // }).catch((err) => {
        //   console.log(err);
        // });
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

router.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

// ---------------------------------------------------- END SPOTIFY LOGIN ----------------------------------------------------

module.exports = router;
