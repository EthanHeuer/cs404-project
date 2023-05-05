import Control from './control';
// eslint-disable-next-line no-unused-vars
import Note from './note';

/**
 * Layout of the samples and time
 */
class Pattern {
  /**
   * @param {string} name
   * @param {Note[]} notes
   * @param {number} hue
   * @param {import('./control').ControlObject} [controlObject={}]
   */
  constructor(name, notes, bars, hue, controlObject = {}) {
    this.id = Pattern.nextId++;
    this.name = name;
    this.notes = notes;
    this.bars = bars;
    this.control = Control.fromObject(controlObject);
    this.hue = hue;
  }

  /**
   * @param {(note: Note) => void} res
   */
  iterate(res) {
    for (let i = 0; i < this.notes.length; i++) {
      res(this.notes[i]);
    }
  }

  /**
   * Clear all notes
   */
  clear() {
    this.notes = [];
  }

  static nextId = 0;
}

export default Pattern;
