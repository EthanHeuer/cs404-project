import Control from './control';

class Note {
  /**
   * @param {number} sampleId
   * @param {number} beat
   * @param {import('./control').ControlObject} controlObject
   */
  constructor(sampleId, beat, controlObject = {}) {
    this.sampleId = sampleId;
    this.beat = beat;
    this.control = Control.fromObject(controlObject);
  }
}

export default Note;
