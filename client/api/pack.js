import Sample from './sample';
// eslint-disable-next-line no-unused-vars
import AudioHandler from './audio-handler';

/**
 * A container for samples
 */
class Pack {
  /**
   * @param {[string, number][]} files
   * @param {string} dir
   * @param {string} extension
   */
  constructor(files, dir, extension) {
    /** @type {Sample[]} */
    this.files = files.map((file) => new Sample(file[0], file[1], dir, extension));
    this.dir = dir;
    this.extension = extension;
  }

  /**
   * @param {AudioHandler} audioHandler
   */
  async load(audioHandler) {
    const results = [];
    for (let f = 0; f < this.files.length; f++) {
      results.push(audioHandler.loadFile(this.files[f].path));
    }

    const resultsAwait = await Promise.all(results);

    for (let f = 0; f < this.files.length; f++) {
      this.files[f].audioBuffer = resultsAwait[f];
    }

    return this;
  }

  /**
   * @param {number} id
   * @return {Sample}
   */
  getSample(id) {
    return this.files[id];
  }

  /**
   * @param {string} name
   * @return {Sample}
   */
  getSampleByName(name) {
    return this.files.find((sample) => sample.name === name);
  }
}

export default Pack;
