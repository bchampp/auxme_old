import React, { useEffect, useState } from 'react';
import qs from "query-string";

/* Material UI Stuff */
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Backdrop, CircularProgress, Button } from '@material-ui/core';

/* Custmo Components */
import SharingURLWindow from './SharingURL';
import api from '../../../api';

/* Custom Button Styling -- there are better ways to organize styling for material components */
const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
    backdrop: {
        zIndex: 100 + 1,
        color: '#fff',
      },
});

/* Party Component Implementation */
export default function Party(props) {
    const classes = useStyles();

    // Hooks
    const [room, setRoom] = useState(null); // Room doesn't exist
    const [name, setName] = useState('');

    const [nameInputOpen, setNameInputOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [sharingURLOpen, setSharingURLOpen] = useState(false);
    const [sharingLink, setSharingLink] = useState('')

    /* Component Life Cycle Methods */
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
        setLoader(true);
        const res = await api.party.newRoom(name); // Will need to pass in user token here ?
        // Add some shit here for catching bad API calls
        let sharingLink = 'http://localhost:3000/party?room=' + res.id;

        setRoom(name);
        setLoader(false);
        setNameInputOpen(false);
        setSharingURLOpen(true);
        setSharingLink(sharingLink)
    }

    const joinPartyRoom = async id => {
        console.log("Joining party room with ID: " + id);
        const res = await api.party.fetchRoom(id)
        setRoom(res.name);
    }

    const onChangeName = e => {
        setName(e.target.value);
    }

    const handleModalClose = () => setSharingURLOpen(false);
    return (
        <div className="hero section center-content illustration-section-01">
            {/* Room Doesn't Exist yet */}
            { room === null ?
                <div style={{ height: '100px', paddingTop: '10px' }}>
                    <Button classes={{
                        root: classes.root, // class name, e.g. `classes-nesting-root-x`
                        label: classes.label, // class name, e.g. `classes-nesting-label-x`
                    }}
                        onClick={() => { setNameInputOpen(true) }}>
                        New Party Room
                </Button>
                </div>
                :
                <div>
                    Welcome to room: {room}
                </div>
            }
            {
                nameInputOpen === true &&
                <div>
                    <p style={{ color: 'white' }}>Name your party!</p>
                    <TextField
                        classes={{
                            root: classes.root, // class name, e.g. `classes-nesting-root-x`
                            label: classes.label, // class name, e.g. `classes-nesting-label-x`
                        }}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                // Do code here
                                ev.preventDefault();
                                generatePartyRoom();
                            }
                        }}
                        name="name"
                        onChange={onChangeName}
                    />
                </div>
            }

            {/* Loader */}
            <Backdrop className={classes.backdrop} open={loader}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {/* Sharing URL Window */}
            <SharingURLWindow
                open={sharingURLOpen} onClose={handleModalClose} sharingURL={sharingLink}
            />
        </div>
    )
}
