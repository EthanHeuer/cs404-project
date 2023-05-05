import React from 'react';
import PropTypes from 'prop-types';
import {
  Add, Circle, Clear, ClearAll, Sensors, VolumeUp
} from '@mui/icons-material';
import {
  AppBar, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, Slider, Stack, TextField, Toolbar, Tooltip
} from '@mui/material';
import Pattern from '../api/pattern';

function PatternPanelHeader(props) {
  const {
    activePatternId, hue, setHue, playbackRate, setPlaybackRate, bars, setBars, patterns, onNewPattern, onPatternChange, onClearPattern
  } = props;

  const [pan, setPan] = React.useState(50);
  const [gain, setGain] = React.useState(100);

  const handleHueChange = (event) => {
    const value = Number(event.target.value);
    setHue(value);
  };

  const handlePlaybackRateChange = (event) => {
    const value = Number(event.target.value) / 100;
    setPlaybackRate(value);
  };

  const handleBarsChange = (event) => {
    const value = Number(event.target.value);
    setBars(value);
  };

  const handlePanSliderChange = (event, value) => {
    setPan(value);
  };

  const handlePanInputChange = (event) => {
    const value = Number(event.target.value);
    setPan(value);
  };

  const handleGainSliderChange = (event, value) => {
    setGain(value);
  };

  const handleGainInputChange = (event) => {
    const value = Number(event.target.value);
    setGain(value);
  };

  const handleNewPattern = () => {
    onNewPattern();
  };

  const handleClearPattern = () => {
    onClearPattern();
  };

  return (
    <AppBar position='static'>
      <Toolbar
        component={Stack}
        direction='row'
        spacing={2}
      >
        <Stack
          direction='row'
        >
          {/* NEW PATTERN */}
          <Tooltip title='New Pattern'>
            <IconButton
              onClick={handleNewPattern}
            >
              <Add />
            </IconButton>
          </Tooltip>

          {/* ACTIVE PATTERN SELECT */}
          <FormControl
            sx={{
              mr: 1,
              ml: 1,
              width: 200
            }}
          >
            <InputLabel>Pattern</InputLabel>
            <Select
              value={activePatternId}
              label='Pattern'
              onChange={onPatternChange}
              size='small'
            >
              {
                patterns.map((pattern) => (
                  <MenuItem key={pattern.id} value={pattern.id}>{pattern.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>

          {/* CLEAR PATTERN */}
          <Tooltip title='Clear' arrow>
            <IconButton onClick={handleClearPattern}>
              <ClearAll />
            </IconButton>
          </Tooltip>

          {/* DELETE PATTERN */}
          <Tooltip title='Delete' arrow>
            <IconButton>
              <Clear />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* HUE */}
        <TextField
          label='Hue'
          value={hue}
          size='small'
          sx={{
            width: 100
          }}
          onChange={handleHueChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Circle sx={{ color: `hsl(${hue}, 100%, 50%)` }} />
              </InputAdornment>
            )
          }}
        />

        {/* RATE */}
        <TextField
          label='Rate'
          value={playbackRate * 100}
          size='small'
          sx={{
            width: 100
          }}
          onChange={handlePlaybackRateChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>%</InputAdornment>
            )
          }}
        />

        {/* BARS */}
        <TextField
          label='Bars'
          value={bars}
          size='small'
          sx={{
            width: 100
          }}
          onSubmit={handleBarsChange}
          disabled
        />

        {/* PAN */}
        <Stack
          direction='row'
          spacing={2}
          alignItems='center'
        >
          <Sensors />
          <Slider
            value={pan}
            sx={{ width: 100 }}
            onChange={handlePanSliderChange}
          />
          <Input
            value={pan}
            size='small'
            inputProps={{
              min: 0,
              max: 100,
              type: 'number'
            }}
            onChange={handlePanInputChange}
          />
        </Stack>

        {/* GAIN */}
        <Stack
          direction='row'
          spacing={2}
          alignItems='center'
        >
          <VolumeUp />
          <Slider
            value={gain}
            sx={{ width: 100 }}
            onChange={handleGainSliderChange}
          />
          <Input
            value={gain}
            size='small'
            inputProps={{
              min: 0,
              max: 100,
              type: 'number'
            }}
            onChange={handleGainInputChange}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

PatternPanelHeader.propTypes = {
  activePatternId: PropTypes.number.isRequired,
  hue: PropTypes.number.isRequired,
  setHue: PropTypes.func.isRequired,
  playbackRate: PropTypes.number.isRequired,
  setPlaybackRate: PropTypes.func.isRequired,
  bars: PropTypes.number.isRequired,
  setBars: PropTypes.func.isRequired,
  patterns: PropTypes.arrayOf(PropTypes.instanceOf(Pattern)).isRequired,
  onPatternChange: PropTypes.func.isRequired,
  onNewPattern: PropTypes.func.isRequired,
  onClearPattern: PropTypes.func.isRequired
};

export default PatternPanelHeader;
