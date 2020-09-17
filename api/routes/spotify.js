import express from 'express';
// import Queue from '../models/queue';

const router = express.Router();

let playing = false;
let loggedIn = false;
let accessToken = '';
let refreshToken = '';

// auxme.ca/api/spotify/get-user
router.post("/get-user", (req, res) => {
    request({
      url: "https://api.spotify.com/v1/me",
      method: "GET",
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }, (err, res, body) => {

    });

    console.log("Making a backend call!");
    res.json({ response: {
        success: true
    }});
})

router.post("/play", (req, res) => {
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

    console.log("Frontend call to play/pause track");
    res.json({ response: {
        success: true
    }});
})


router.post("/next", (req, res) => {
    request({
      url: "https://api.spotify.com/v1/me/player/next",
      method: "POST",
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }, (err, res, body) => {

    });

    console.log("Backend call to get next track");
    res.json({ response: {
        success: true
    }});
})

router.post("/previous", (req, res) => {
    request({
      url: "https://api.spotify.com/v1/me/player/previous",
      method: "POST",
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }, (err, res, body) => {

    });

    console.log("Backend call to get previous track");
    res.json({ response: {
        success: true
    }});
})

router.post("/search", (req, res) => {
    request({
      url: "https://api.spotify.com/v1/search",
      method: "POST",
      headers: { 'Authorization': 'Bearer ' + accessToken },
      body: {q: req.body.q}
    }, (err, res, body) => {

    });

    console.log("Search songs");
    res.json({ response: {
        success: true
    }});
})


//--------------------------------------- USER Routes ------------------------------------------
router.post("/isLoggedIn", (req, res) => {
  res.json({'loggedIn': loggedIn});
});

router.post("/setTokens", (req, res) => {
  console.log(req.body);
  accessToken = req.body.accessToken;
  refreshToken = req.body.refreshToken;
  loggedIn = (accessToken != '');
  res.json({'success': true});
});
router.post("getTokens", (req, res) => {
  res.json({'accessToken': accessToken, 'refreshToken': refreshToken});
});


export default router;
