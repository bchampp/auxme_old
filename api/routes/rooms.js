import express from 'express';
const router = express.Router();
import Session from '../models/session';

router.post("/new-room", (req, res) => {
    const { name } = req.query;

    console.log("Generating a new Party session with name: " + name);
    // Create new document inside database
    let session = new Session({
        name
    });

    session.save().then(studioSession => {
        let sessionID = studioSession.id;
        console.log(sessionID);

        res.json({
            response: {
                id: sessionID,
                success: true,
            }
        });
    }).catch(err => {
        res.json({
            success: false,
            err
        })
    })
});

router.post("/get-room", (req, res) => {
    const { id } = req.query;
    console.log("Fetching Session with ID: " + id);

    Session.findById(id).then(session => { 
        console.log(session);
        res.json({
            response: {
                name: session.name 
            }
        })
    })
});

export default router;