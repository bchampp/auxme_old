import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import api from '../../../api';
import qs from "query-string";

const Party = (props) => {
    const [room, setRoom] = useState(null);

    useEffect(() => {
        console.log("Rendering component");
        const query = qs.parse(props.location.search);
        if (query && query.room) {
            let roomID = query.room;
            joinPartyRoom(roomID)
        }
    }); // Add any listeners we want here 

    const generatePartyRoom = () => {
        console.log("Generating new party room!");
        api.party.newRoom(); // Will need to pass in user token here ?
        setRoom(true);
    }

    const joinPartyRoom = (id) => {
        console.log("Joining party room with ID: " + id);
        window.location = "/party"
    }

    const generateSharingLink = (id) => {

    }

    return (
        <div className="hero section center-content illustration-section-01">
            Start a new Party!
            { room === null &&
                <div style={{ height: '400px' }}>
                    <Button onClick={() => { generatePartyRoom() }}>
                        New Party Room
                </Button>
                </div>
            }
        </div>
    )
}

export default Party;

