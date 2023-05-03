class Control {
  /**
   * @param {number} detune
   * @param {number} playbackRate
   * @param {number} gain
   * @param {number} pan
   */
  constructor(detune, playbackRate, gain, pan) {
    this.detune = detune;
    this.playbackRate = playbackRate;
    this.gain = gain;
    this.pan = pan;

    if (this.detune === null || this.detune === undefined) {
      this.detune = 0;
    }
    if (this.playbackRate === null || this.playbackRate === undefined) {
      this.playbackRate = 1;
    }
    if (this.gain === null || this.gain === undefined) {
      this.gain = 1;
    }
    if (this.pan === null || this.pan === undefined) {
      this.pan = 0;
    }
  }

  /**
   * @param {ControlObject} controlObject
   * @return {Control}
   */
  static fromObject(controlObject) {
    const control = new Control(
      controlObject.detune,
      controlObject.playbackRate,
      controlObject.gain,
      controlObject.pan
    );

    return control;
  }
}

/**
 * @typedef {Object} ControlObject
 * @property {number} [detune=0]
 * @property {number} [playbackRate=1]
 * @property {number} [gain=1]
 * @property {number} [pan=0]
 */

export default Control;
