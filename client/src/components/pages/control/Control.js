import React, { useState, useEffect } from 'react';
import { SliderPicker } from 'react-color'
import { makeStyles } from '@material-ui/core/styles';

import api from '../../../api';

// Icons
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

import {
    Button, InputLabel, Select, MenuItem,
    Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions,
    TextField, FormControl, Grid, Typography, Slider
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Control(props) {
    const classes = useStyles();

    // Controller Access Variables
    const [controllerToken, setControllerToken] = useState(0);
    // const [deviceConnected, setDeviceConnected] = useState(false);

    // Modal Toggles
    const [openNewDevice, setOpenNewDevice] = useState(false);
    const [openExistingDevice, setOpenExistingDevice] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('Controller Token') || 0;
        setControllerToken(token);
    });

    const closeDialog = () => {
        setOpenNewDevice(false);
        setOpenExistingDevice(false);
    }
    return (
        <div className="hero section center-content illustration-section-01">
            <h2>Control Page</h2>

            { controllerToken !== 0 ?
                <div>
                    <Controller classes={classes} />
                </div>
                :
                <div>
                    <Setup openNew={setOpenNewDevice} openExisting={setOpenExistingDevice} />
                </div>
            }
            <NewDeviceDialog open={openNewDevice} handleClose={closeDialog} />
            <ExistingDeviceDialog open={openExistingDevice} handleClose={closeDialog} setToken={setControllerToken} />
        </div>
    )
}

function Setup(props) {

    /* Setup Handlers */
    const handleNewDevice = () => {
        props.openNew(true);
    }

    const handleExistingDevice = () => {
        props.openExisting(true);
    }

    return (
        <div>
            <Button style={{ marginTop: '20px' }} variant='outlined' color='primary' size='large' onClick={handleNewDevice}>
                Set up a new device!
            </Button>
            <br />
            <Button style={{ marginTop: '20px' }} variant='outlined' color='secondary' size='large' onClick={handleExistingDevice}>
                I already have a device!
            </Button>
        </div>
    )
}

function NewDeviceDialog(props) {
    return (
        <Dialog onClose={props.handleClose} open={props.open}>
            <DialogTitle id="simple-dialog-title">Set up New Device</DialogTitle>
        </Dialog>
    );
}

function ExistingDeviceDialog(props) {
    const { open, handleClose } = props;

    const [icon, setIcon] = useState('');
    const [curToken, setCurToken] = useState('');
    const [validToken, setValidToken] = useState(false);

    // Change handler for auth token input
    const handleChange = (e) => {
        let val = e.target.value;
        if (val.length === 32) {
            setIcon('valid')
            setValidToken(true);
            setCurToken(val);
        } else if (val.length === 0) {
            setIcon('');
            setValidToken(false);
        } else {
            setIcon('loading')
            setValidToken(false);
        }
    }

    // Handle continue button
    const handleContinue = () => {
        props.setToken(curToken);
        handleClose();
        localStorage.setItem('Controller Token', curToken);
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle>Connect</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your AuxMe Device Access Code to connect to your devices.
          </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="code"
                    label="Authentication Code"
                    type="code"
                    fullWidth
                    onChange={handleChange}
                >
                    {icon.length > 0 &&
                        (
                            icon === 'valid' ?
                                <DoneIcon /> :
                                <CloseIcon />
                        )
                    }
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button disabled={!validToken} onClick={handleContinue} color="primary">
                    Continue
          </Button>
            </DialogActions>
        </Dialog>
    );
}

function Controller(props) {
    const [color, setColor] = useState();
    const [mode, setMode] = useState(1);
    const [sensitivity, setSensitivity] = useState(50);
    const [brightness, setBrightness] = useState(50);


    /* LED Control Handlers */
    const handleColorChange = color => {
        setColor(color);
        let r = color.rgb.r;
        let g = color.rgb.g;
        let b = color.rgb.b;

        console.log("Setting Color to\nR: " + r + "\nB: " + b + "\nG: " + g);
        api.controller.setColor(r, g, b);
    }

    const handleDropdownChange = (e) => {
        let mode = e.target.value;
        setMode(mode);
        api.controller.setMode(mode);
    };

    const handleSensitivityChange = (e, value) => {
        setSensitivity(value);
    }

    return (
        <div>
            {/* Color Adjustment Bar */}
            <div style={{ width: '50%', margin: 'auto' }}>
                <h3>1. Adjust Color</h3>
                <SliderPicker color={color} onChangeComplete={handleColorChange} />
            </div>
            {/* Lighting Mode Dropdown */}
            <div style={{ width: '50%', margin: 'auto', paddingTop: '20px' }}>
                <h3>2. Choose Lighting Mode</h3>
                <FormControl style={{ backgroundColor: 'white' }} variant='filled' className={props.classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={mode}
                        onChange={handleDropdownChange}
                    >
                        <MenuItem value={1}>Music Sync</MenuItem>
                        <MenuItem value={2}>Ambient</MenuItem>
                        <MenuItem value={3}>Still Color</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {/* Sensitivity Slider */}
            <div style={{ width: '50%', margin: 'auto', paddingTop: '20px' }}>
                <h3>3. Set the Volume Sensitivity</h3>

                <Grid container spacing={2}>
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <Slider value={sensitivity} onChange={handleSensitivityChange} aria-labelledby="continuous-slider" />
                    </Grid>
                    <Grid item>
                        <VolumeUp />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}