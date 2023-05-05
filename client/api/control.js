class Control {
  /**
   * @param {number} detune
   * @param {number} playbackRate
   * @param {number} gain 0 to 1
   * @param {number} pan \-1 to 1
   * @param {number} delay
   */
  constructor(detune, playbackRate, gain, pan, delay) {
    this.detune = detune;
    this.playbackRate = playbackRate;
    this.gain = gain;
    this.pan = pan;
    this.delay = delay;

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
    if (this.delay === null || this.delay === undefined) {
      this.delay = 0;
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
      controlObject.pan,
      controlObject.delay
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
 * @property {number} [delay=0]
 */

export default Control;
