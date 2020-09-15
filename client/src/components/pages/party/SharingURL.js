import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export default function SharingURLWindow(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title" style={{color: 'black'}}>Thank you for creating a party room!</DialogTitle>
        <div style={{'textAlign': 'center'}}>
            Share your party room with your friends with the following URL: 
            <p>{props.sharingURL}</p>
        </div>
    </Dialog>
  );
}
