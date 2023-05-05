/* eslint-disable no-dupe-else-if */
import DAW from './api/daw';
import Pack from './api/pack';
import Pattern from './api/pattern';
import Note from './api/note';
import Track from './api/track';
import TrackPattern from './api/track-pattern';
import Project from './api/project';

const pack = new Pack([
  ['kick-crash', 175],
  ['kick-1', 175],
  ['kick-2', 175],
  ['kick-3', 175],
  ['kick-fill-1', 175],
  ['kick-fill-2', 175],
  ['snare-1', 175],
  ['snare-2', 175],
  ['snare-3', 175],
  ['fill-1', 175],
  ['fill-2', 175],
  ['fill-3', 175],
  ['hat', 175]
], '/samples', 'wav');

const KICK_CRASH = 0;
const KICK_1 = 1;
const KICK_2 = 2;
const KICK_3 = 3;
const KICK_FILL_1 = 4;
const KICK_FILL_2 = 5;
const SNARE_1 = 6;
const SNARE_2 = 7;
const SNARE_3 = 8;
const FILL_1 = 9;
const FILL_2 = 10;
const FILL_3 = 11;
const HAT = 12;

const pattern1 = new Pattern('Pattern A', [
  new Note(KICK_1, 0),
  new Note(FILL_1, 0.5),
  new Note(SNARE_1, 1),
  new Note(FILL_1, 1.5),
  new Note(FILL_1, 2),
  new Note(SNARE_2, 2.5),
  new Note(FILL_2, 3),
  new Note(SNARE_2, 3.5),
  new Note(KICK_1, 4),
  new Note(FILL_1, 4.5),
  new Note(SNARE_1, 5),
  new Note(HAT, 5.5),
  new Note(KICK_CRASH, 6),
  new Note(SNARE_2, 6.5),
  new Note(SNARE_3, 7),
  new Note(SNARE_2, 7.5)
], 2, 15);

const pattern2 = new Pattern('Pattern B', [
  new Note(KICK_2, 0),
  new Note(FILL_2, 0.5),
  new Note(SNARE_2, 1),
  new Note(FILL_2, 1.5),
  new Note(FILL_2, 2),
  new Note(SNARE_3, 2.5),
  new Note(FILL_3, 3),
  new Note(SNARE_3, 3.5),
  new Note(KICK_2, 4),
  new Note(FILL_2, 4.5),
  new Note(SNARE_2, 5),
  new Note(HAT, 5.5),
  new Note(KICK_CRASH, 6),
  new Note(SNARE_3, 6.5),
  new Note(SNARE_1, 7),
  new Note(SNARE_3, 7.5)
], 2, 65);

const halfStep = new Pattern('Half Step', [
  new Note(KICK_3, 0),
  new Note(FILL_1, 0.25),
  new Note(SNARE_2, 0.5),
  new Note(FILL_1, 0.75),
  new Note(SNARE_3, 1),
  new Note(FILL_2, 1.25),
  new Note(SNARE_3, 1.5),
  new Note(FILL_2, 1.75),
  new Note(KICK_3, 2),
  new Note(FILL_1, 2.25),
  new Note(SNARE_2, 2.5),
  new Note(HAT, 2.75),
  new Note(KICK_CRASH, 3),
  new Note(SNARE_3, 3.25),
  new Note(SNARE_1, 3.5),
  new Note(SNARE_3, 3.75)
], 1, 115, { playbackRate: 0.5, gain: 0.8 });

const fill1 = new Pattern('Fill 1',
  [
    ...Array.from({ length: 4 }).map((_, i) => new Note(KICK_FILL_1, i)),
    ...Array.from({ length: 8 }).map((_, i) => new Note(SNARE_2, 0.25 * i + 2, { gain: 0.125 * i })),
  ],
  1,
  200
);

const patterns = [pattern1, pattern2, halfStep, fill1];

const trackPattern = [];

trackPattern.push(new TrackPattern(0, [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]));
trackPattern.push(new TrackPattern(1, [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]));
trackPattern.push(new TrackPattern(2, [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0]));
trackPattern.push(new TrackPattern(3, [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]));

const track = new Track(trackPattern);
const project = new Project(175, track, patterns);
const daw = new DAW(pack, project);

export default daw;
