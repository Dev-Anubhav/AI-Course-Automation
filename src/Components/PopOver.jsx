import React, { useState } from 'react';
import { Button, Popover, TextField, Box } from '@mui/material';

const PopUp = ({handleSubmit,inputValue,setInputValue,anchorEl,handleClose}) => {

  return (
    <div className='relative' style={{ height: '100vh'}}>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, maxWidth: 300 }}>
          <TextField
            sx={{ mb: 2 }}
            label="Enter text"
            variant="outlined"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Popover>

    
    </div>
  );
};

export default PopUp;
