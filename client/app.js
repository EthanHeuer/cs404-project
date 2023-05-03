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

const GRAMMAR = new Map([
  ['S', ['PP']],
  ['P', ['AB']],
  ['A', ['k-sk', 'k-s-', 'k--s', 'kks-']],
  ['B', ['-s-s', '--s-', '-ks-', '-sks']]
]);

const generate = (symbol) => {
  if (!GRAMMAR.has(symbol)) {
    return symbol;
  }

  const alternatives = GRAMMAR.get(symbol);
  const random = Math.floor(Math.random() * alternatives.length);
  const alternative = alternatives[random];

  return alternative.split('').map(generate).join('');
};

const patterns = [];

for (let p = 0; p < 5; p++) {
  const pattern = new Pattern(`Pattern ${p + 1}`, [], 2, Math.floor(Math.random() * 360));

  const generated = generate('S');

  for (let n = 0; n < generated.length; n++) {
    const symbol = generated[n];
    let sampleName = '';

    const random = Math.floor(3 * Math.random() ** (1.7) + 1);

    if (symbol === 'k') {
      sampleName = `kick-${random}`;
    } else if (symbol === 's') {
      sampleName = `snare-${random}`;
    } else if (symbol === '-') {
      sampleName = `fill-${random}`;
    }

    const sampleId = pack.getSampleByName(sampleName).id;

    pattern.notes.push(new Note(sampleId, n / 2));
  }

  patterns.push(pattern);
}

const trackPattern = [];

trackPattern.push(new TrackPattern(0, [1, 0, 0, 0, 1, 0, 0, 0]));
trackPattern.push(new TrackPattern(1, [0, 0, 1, 0, 0, 0, 0, 0]));
trackPattern.push(new TrackPattern(2, [0, 0, 0, 0, 0, 0, 1, 0]));

const track = new Track(trackPattern);
const project = new Project(175, track, patterns);
const daw = new DAW(pack, project);

export default daw;
