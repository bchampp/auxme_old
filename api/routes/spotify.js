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

export default router;