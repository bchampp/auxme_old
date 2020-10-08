const express = require('express');
const request = require('request'); // "Request" library
const axios = require('axios');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
import dotenv from "dotenv";

const router = express.Router();

/* BLYNK App Token */
const BLYNK_AUTH_TOKEN = 'DafemG2lDYKwlMdmLxV6egEtb9oDcx5z';

// Verify that hardware is connected
router.post("/get-status", async (req, res) => {
    request({
        method: 'PUT',
        url: `http://blynk-cloud.com/4ae3851817194e2596cf1b7103603ef8/isHardwareConnected`,
      }, function (error, response, body) {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
      });
});

router.post("/get-volume", async (req, res) => {
    // Request color from virtual pin 0
    request(`http://blynk-cloud.com/${BLYNK_AUTH_TOKEN}/get/D0`, (error, response, body) => {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
        // Add logic for bad connection and reconnecting 

        res.json({response: { success: true }});
    });
});

router.post("/set-color", (req, res) => {
    const { color } = req.query;

    // Send color to Arduino
    res.json({ response: { success: true }});
});

export default router;
