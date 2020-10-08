import React, { useEffect, useState } from 'react';
import { SliderPicker } from 'react-color'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import api from '../../../api';

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
    const [age, setAge] = React.useState('');
    const [color, setColor] = useState();

    useEffect(() => {
        console.log(color);
    });

    const handleColorChange = color => {
        setColor(color);
        api.controller.setColor(color);
    }

    const handleDropdownChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className="hero section center-content illustration-section-01">
            <h1>Control Page</h1>
            <div style={{ width: '50%', margin: 'auto' }}>
                <h2>1. Adjust Color</h2>
                <SliderPicker color={color} onChangeComplete={handleColorChange} />
            </div>
            <div style={{ width: '50%', margin: 'auto' , paddingTop: '20px'}}>
                <h2>2. Choose Lighting Mode</h2>
                <FormControl style={{backgroundColor: 'white'}} variant='filled' className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleDropdownChange}
                    >
                        <MenuItem value={1}>Music Sync</MenuItem>
                        <MenuItem value={2}>Ambient</MenuItem>
                        <MenuItem value={3}>Still Color</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}