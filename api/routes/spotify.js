import express from 'express';
// import Queue from '../models/queue';

const router = express.Router();

// auxme.ca/api/spotify/get-user
router.post("/get-user", (req, res) => {
    console.log("Making a backend call!");
    res.json({ response: {
        success: true
    }});
})

router.post("/play", (req, res) => {
    console.log("Frontend call to play/pause track");
    res.json({ response: {
        success: true
    }});
})


router.post("/next", (req, res) => {
    console.log("Backend call to get next track");
    res.json({ response: {
        success: true
    }});
})

router.post("/previous", (req, res) => {
    console.log("Backend call to get previous track");
    res.json({ response: {
        success: true
    }});
})

router.post("/search", (req, res) => {
    console.log("Search songs");
    res.json({ response: {
        success: true
    }});
})

export default router;