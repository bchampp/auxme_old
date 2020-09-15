import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import api from '../../../api';
import qs from "query-string";
import { TextField } from '@material-ui/core';

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

export default function Party(props) {
    const classes = useStyles();
    const [room, setRoom] = useState(null);
    const [textOpen, setTextOpen] = useState(false);
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);

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
        setOpen(true);
        const res = await api.party.newRoom(name); // Will need to pass in user token here ?
        // Add some shit here for catching bad API calls 
        setRoom(name);
        setOpen(false);
        setTextOpen(false);
        console.log(res);
    }

    const joinPartyRoom = async id => {
        console.log("Joining party room with ID: " + id);
        const res = await api.party.fetchRoom(id)
        setRoom(res.name);
    }

    const onChangeName = e => {
        setName(e.target.value);
    }

    return (
        <div className="hero section center-content illustration-section-01">
            {/* Room Doesn't Exist yet */}
            { room === null ?
                <div style={{ height: '100px', paddingTop: '10px' }}>
                    <Button classes={{
                        root: classes.root, // class name, e.g. `classes-nesting-root-x`
                        label: classes.label, // class name, e.g. `classes-nesting-label-x`
                    }}
                        onClick={() => { setTextOpen(true) }}>
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
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}


