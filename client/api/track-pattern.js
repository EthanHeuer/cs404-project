import Control from './control';
// eslint-disable-next-line no-unused-vars
import Pattern from './pattern';

class TrackPattern {
  /**
   * @param {number} patternId
   * @param {number[]} bars
   * @param {import('./control').ControlObject} [controlObject={}]
   */
  constructor(patternId, bars, controlObject = {}) {
    this.patternId = patternId;
    this.bars = bars;
    this.control = Control.fromObject(controlObject);
  }
}

export default TrackPattern;
