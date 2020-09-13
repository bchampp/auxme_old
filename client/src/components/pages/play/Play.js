import React from 'react';
import Button from '@material-ui/core/Button';
import api from '../../../api';


// import sections

const Play = () => {

  const handleButton = () => {
    console.log("Button Click");
    api.spotify.getUser();
  }

  return (
    <>
      Music Player
      <Button style={{'zIndex': 101}} onClick={() => {handleButton()}}>
        Click Me
      </Button>
    </>
  );
}

export default Play;