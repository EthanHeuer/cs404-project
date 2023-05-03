import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Stack } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import TrackPanel from './TrackPanel';
import HeaderBar from './HeaderBar';
import PatternPanel from './PatternPanel';
import DAW from '../api/daw';

/**
 * @param {Object} props
 * @param {DAW} props.daw
 * @returns {JSX.Element}
 */
function App(props) {
  const { daw } = props;

  const [value, setValue] = React.useState('2');
  const [activePatternId, setActivePatternId] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handlePatternView = (patternIdString) => {
    const patternId = parseInt(patternIdString, 10);
    handleChange(null, '2');
    setActivePatternId(patternId);
  };

  const handlePlay = () => {
    daw.play();
  };

  const handleStop = () => {
    daw.stop();
  };

  return (
    <>
      <HeaderBar onPlay={handlePlay} onStop={handleStop} />
      <TabContext value={value}>
        <Stack sx={{ borderBottom: 1, borderColor: 'divider' }} direction='row'>
          <TabList onChange={handleChange}>
            <Tab label='Track' value='1' />
            <Tab label='Pattern' value='2' />
            <Tab label='Analyzer' value='3' />
          </TabList>
        </Stack>
        <TabPanel value='1'>
          <TrackPanel daw={daw} onPatternView={handlePatternView} />
        </TabPanel>
        <TabPanel value='2'>
          <PatternPanel daw={daw} activePatternId={activePatternId} setActivePatternId={setActivePatternId} />
        </TabPanel>
        <TabPanel value='3'>Item Three</TabPanel>
      </TabContext>
    </>
  );
}

App.propTypes = {
  daw: PropTypes.instanceOf(DAW).isRequired
};

export default App;
