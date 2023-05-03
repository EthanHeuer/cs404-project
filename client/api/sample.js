/**
 * Audio sample containing its AudioBuffer
 */
class Sample {
  /**
   * @param {string} name
   * @param {number} bpm
   * @param {string} dir
   * @param {string} extension
   */
  constructor(name, bpm, dir, extension) {
    this.id = Sample.nextId++;
    this.name = name;
    this.bpm = bpm;
    this.dir = dir;
    this.extension = extension;
    this.path = `${dir}/${name}.${extension}`;
    /** @type {AudioBuffer} */
    this.audioBuffer = undefined;
  }

  static nextId = 0;
}

export default Sample;
