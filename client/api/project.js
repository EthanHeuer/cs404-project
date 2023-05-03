// eslint-disable-next-line no-unused-vars
import Pattern from './pattern';
// eslint-disable-next-line no-unused-vars
import Track from './track';

class Project {
  /**
   * @param {number} bpm
   * @param {Track} track
   * @param {Pattern[]} patterns
   */
  constructor(bpm, track, patterns) {
    this.bpm = bpm;
    this.track = track;
    this.patterns = patterns;
    this.rate = 60 / this.bpm;
    this.bars = 32;
  }

  getPatternByID(id) {
    return this.patterns.find((pattern) => (pattern.id === id));
  }
}

export default Project;
