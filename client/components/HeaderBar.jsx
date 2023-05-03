import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Button, ButtonGroup, Toolbar, Typography
} from '@mui/material';

function HeaderBar(props) {
  const { onPlay, onStop } = props;

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' sx={{ mr: 2 }}>{'CS 404 Project'}</Typography>
        <ButtonGroup variant='contained'>
          <Button onClick={onPlay}>Play</Button>
          <Button onClick={onStop}>Stop</Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}

HeaderBar.propTypes = {
  onPlay: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};

export default HeaderBar;
