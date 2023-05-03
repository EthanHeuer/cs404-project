import Control from './control';
// eslint-disable-next-line no-unused-vars
import Pattern from './pattern';
// eslint-disable-next-line no-unused-vars
import TrackPattern from './track-pattern';

/**
 * Collection of patterns and their order
 */
class Track {
  /**
   * @param {TrackPattern[]} trackPatterns
   * @param {import('./control').ControlObject} [controlObject={}]
   */
  constructor(trackPatterns, controlObject = {}) {
    this.trackPatterns = trackPatterns;
    this.control = Control.fromObject(controlObject);
  }

  /**
   * @param {(trackPattern: TrackPattern) => void} res
   */
  iterate(res) {
    for (let i = 0; i < this.trackPatterns.length; i++) {
      res(this.trackPatterns[i]);
    }
  }
}

export default Track;
