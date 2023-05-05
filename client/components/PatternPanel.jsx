import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Stack, Paper, Button, Divider
} from '@mui/material';
import DAW from '../api/daw';
import Note from '../api/note';
import PatternPanelHeader from './PatternPanelHeader';

/**
 * @param {Object} props
 * @param {DAW} props.daw
 * @param {number} props.activePatternId
 * @param {function} props.setActivePatternId
 * @param {function} props.onNewPattern
 * @param {function} props.onClearPattern
 * @returns {JSX.Element}
 */
function PatternPanel(props) {
  const {
    daw, activePatternId, setActivePatternId, onNewPattern, onClearPattern
  } = props;
  const { pack } = daw;
  const { files } = pack;
  const { project } = daw;
  const { patterns } = project;
  const [barSize, setBarSize] = React.useState(0);
  const [hue, setHue] = React.useState(patterns[activePatternId].hue);
  const [playbackRate, setPlaybackRate] = React.useState(patterns[activePatternId].control.playbackRate);
  const [bars, setBars] = React.useState(patterns[activePatternId].bars);

  const canvasRef = React.useRef(null);

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 0;
    canvas.height = 0;
    const parentRect = canvas.parentElement.getBoundingClientRect();

    const pattern = patterns[activePatternId];
    const { notes } = pattern;

    canvas.style = 'display: block';

    const fullHeight = parentRect.height;
    const numSamples = files.length;
    const spacer = 8;
    setBarSize((fullHeight - spacer * (numSamples - 1)) / numSamples);
    const fullWidth = barSize * pattern.bars * 4 * 4;

    canvas.height = fullHeight;
    canvas.width = fullWidth;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numSamples; i++) {
      for (let b = 0; b < pattern.bars * 4 * 4; b++) {
        let lum = 0;

        if (b % 2 === 0) {
          lum = 18;
        } else {
          lum = 16;
        }

        ctx.fillStyle = `hsl(200, 0%, ${lum}%)`;

        ctx.fillRect(b * barSize, (barSize + spacer) * i, barSize, barSize);
      }
    }

    for (let b = 1; b < pattern.bars * 4; b++) {
      ctx.strokeStyle = '#bbbbbb';
      ctx.lineWidth = b % 4 === 0 ? 4 : 1;
      ctx.beginPath();
      ctx.moveTo(b * barSize * 4, 0);
      ctx.lineTo(b * barSize * 4, canvas.height);
      ctx.stroke();
    }

    for (let b = 0; b < pattern.bars * 4; b++) {
      ctx.fillStyle = '#f0f0f0';
      ctx.font = '14px Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(`${b + 1}`, b * barSize * 4 + 8, 4);
    }

    for (let n = 0; n < notes.length; n++) {
      const note = notes[n];

      const x = (4 * note.beat + 0.5) * barSize;
      const y = (note.sampleId + 0.5) * barSize + note.sampleId * spacer;

      ctx.fillStyle = `hsl(${pattern.hue}, 100%, 50%)`;
      ctx.beginPath();
      ctx.arc(x, y, 0.9 * (barSize / 2), 0, 2 * Math.PI);
      ctx.fill();
    }
  }, [activePatternId, barSize, files.length, patterns]);

  const handlePatternChange = (event) => {
    setActivePatternId(event.target.value);
    setHue(patterns[event.target.value].hue);
  };

  const handleSetHue = (value) => {
    patterns[activePatternId].hue = value;
    draw();
    setHue(value);
  };

  const handleSetPlaybackRate = (value) => {
    patterns[activePatternId].control.playbackRate = value;
    setPlaybackRate(value);
  };

  const handleNewPattern = () => {
    onNewPattern();
  };

  const handleClearPattern = () => {
    onClearPattern();
    draw();
  };

  const handleClick = React.useCallback((event) => {
    const canvas = canvasRef.current;
    const parentRect = canvas.parentElement.getBoundingClientRect();

    const pattern = patterns[activePatternId];
    const { notes } = pattern;

    const spacer = 8;

    const x = event.clientX - parentRect.left;
    const y = event.clientY - parentRect.top;

    const dx = Math.floor(x / barSize) / 4;
    const dy = Math.floor(y / (barSize + spacer));

    let found = false;

    for (let n = 0; n < notes.length; n++) {
      const note = notes[n];

      if (note.beat === dx && note.sampleId === dy) {
        notes.splice(n, 1);
        found = true;
        break;
      }
    }

    if (!found) {
      notes.push(new Note(dy, dx));
    }

    draw();
  }, [activePatternId, barSize, draw, patterns]);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    draw();

    canvas.addEventListener('click', handleClick);
    return () => canvas.removeEventListener('click', handleClick);
  }, [draw, handleClick]);

  return (
    <>
      <PatternPanelHeader
        activePatternId={activePatternId}
        hue={hue}
        setHue={handleSetHue}
        playbackRate={playbackRate}
        setPlaybackRate={handleSetPlaybackRate}
        bars={bars}
        setBars={setBars}
        patterns={patterns}
        onNewPattern={handleNewPattern}
        onPatternChange={handlePatternChange}
        onClearPattern={handleClearPattern}
      />
      <Stack component={Paper} direction='row' spacing={1} sx={{ p: 1 }}>
        <Stack direction='column' spacing={1}>
          {
            files.map((file) => (
              <Button key={file.id} sx={{ whiteSpace: 'nowrap' }}>{file.name}</Button>
            ))
          }
        </Stack>
        <Divider orientation='vertical' flexItem />
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <canvas ref={canvasRef} />
        </Box>
      </Stack>
    </>
  );
}

PatternPanel.propTypes = {
  daw: PropTypes.instanceOf(DAW).isRequired,
  activePatternId: PropTypes.number.isRequired,
  setActivePatternId: PropTypes.func.isRequired,
  onNewPattern: PropTypes.func.isRequired,
  onClearPattern: PropTypes.func.isRequired
};

export default PatternPanel;
