import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import api from '../../../api';
import qs from "query-string";
import { Input, TextField } from '@material-ui/core';

const Party = (props) => {
    const [room, setRoom] = useState(null);
    const [textOpen, setTextOpen] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        console.log("Rendering component");
        const query = qs.parse(props.location.search);
        if (query && query.room) {
            let roomID = query.room;
            joinPartyRoom(roomID)
        }
    }); // Add any listeners we want here 

    const generatePartyRoom = async () => {
        console.log("Generating new party room with name: " + name);
        const res = await api.party.newRoom(name); // Will need to pass in user token here ?
        // Add some shit here for catching bad API calls 
        setRoom(name);
        console.log(res);
    }

    const joinPartyRoom = async id => {
        console.log("Joining party room with ID: " + id);
        const res = await api.party.fetchRoom(id)
        setRoom(res.name);
    }

    const generateSharingLink = (id) => {

    }

    const onChangeName = e => {
        setName(e.target.value);
    }

    return (
        <div className="hero section center-content illustration-section-01">
            Start a new Party!
            { room === null ?
                <div style={{ height: '400px' }}>
                    <Button onClick={() => { setTextOpen(true) }}>
                        New Party Room
                </Button>
                </div>
                :
                <div>
                    Welcome to room: {room}
                </div>
            }
            {
                textOpen === true &&
                <TextField
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            // Do code here
                            generatePartyRoom();
                            ev.preventDefault();
                        }
                    }}
                    color={'white'}
                    name={'name'}
                    onChange={onChangeName}
                />
            }
        </div>
    )
}

export default Party;

