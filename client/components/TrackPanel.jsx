import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Paper, Stack, Box, Divider
} from '@mui/material';
import DAW from '../api/daw';

/**
 * @param {Object} props
 * @param {DAW} props.daw
 * @param {function} props.onPatternView
 * @returns {JSX.Element}
 */
function TrackPanel(props) {
  const { daw, onPatternView } = props;
  const { project } = daw;
  const { track } = project;
  const { trackPatterns } = track;

  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const parentRect = canvas.parentElement.getBoundingClientRect();

    canvas.height = parentRect.height;
    canvas.style = 'display: block';

    const numPatterns = trackPatterns.length;
    const spacer = 8;
    const barHeight = (canvas.height - spacer * (numPatterns - 1)) / numPatterns;
    const barWidth = Math.round((2 / 3) * barHeight);

    canvas.width = barWidth * trackPatterns[0].bars.length;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < numPatterns; i++) {
        const trackPattern = trackPatterns[i];
        const pattern = project.getPatternByID(trackPattern.patternId);

        for (let b = 0; b < trackPattern.bars.length; b++) {
          let lum = 0;

          if (b % 2 === 0) {
            lum = 18;
          } else {
            lum = 16;
          }

          ctx.fillStyle = `hsl(200, 0%, ${lum}%)`;

          ctx.fillRect(b * barWidth, (barHeight + spacer) * i, barWidth, barHeight);
        }

        for (let b = 0; b < trackPattern.bars.length; b++) {
          if (trackPattern.bars[b] === 1) {
            ctx.strokeStyle = `hsl(${pattern.hue}, 100%, 50%)`;
            ctx.lineWidth = 0.2 * barHeight;
            ctx.lineCap = 'round';

            ctx.beginPath();
            ctx.moveTo(b * barWidth + 0.5 * barWidth, (barHeight + spacer) * i + 0.5 * barHeight);
            ctx.lineTo(b * barWidth + 0.5 * barWidth + (pattern.bars * (1 / pattern.control.playbackRate) - 1) * barWidth, (barHeight + spacer) * i + 0.5 * barHeight);
            ctx.stroke();

            ctx.fillStyle = `hsl(${pattern.hue}, 100%, 50%)`;
            ctx.beginPath();
            ctx.arc(b * barWidth + 0.5 * barWidth, (barHeight + spacer) * i + 0.5 * barHeight, 0.2 * barHeight, 0, 2 * Math.PI);
            ctx.fill();

            // ctx.fillRect(b * barWidth, (barHeight + spacer) * i, barWidth * pattern.bars, barHeight);
          }
        }
      }
    };

    draw();

    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const barIndex = Math.floor(x / barWidth);
      const patternIndex = Math.floor(y / (barHeight + spacer));

      const trackPattern = trackPatterns[patternIndex];

      trackPattern.bars[barIndex] = trackPattern.bars[barIndex] === 1 ? 0 : 1;
      draw();
    });
  }, [project, trackPatterns]);

  const handlePatternView = (event) => {
    onPatternView(event.target.value);
  };

  return (
    <Stack component={Paper} direction='row' spacing={1} sx={{ p: 1 }}>
      <Stack direction='column' spacing={1}>
        {
          trackPatterns.map((trackPattern) => {
            const { patternId } = trackPattern;
            const pattern = project.getPatternByID(patternId);

            return (
              <Button
                key={pattern.id}
                sx={{
                  whiteSpace: 'nowrap',
                  height: '100px'
                }}
                value={pattern.id}
                onClick={handlePatternView}
              >
                {pattern.name}
              </Button>
            );
          })
        }
      </Stack>
      <Divider orientation='vertical' flexItem />
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <canvas ref={canvasRef} width={0} height={0} />
      </Box>
    </Stack>
  );
}

TrackPanel.propTypes = {
  daw: PropTypes.instanceOf(DAW).isRequired,
  onPatternView: PropTypes.func.isRequired
};

export default TrackPanel;
