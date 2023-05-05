import AudioHandler from './audio-handler';
// eslint-disable-next-line no-unused-vars
import Pack from './pack';
// eslint-disable-next-line no-unused-vars
import Pattern from './pattern';
// eslint-disable-next-line no-unused-vars
import Track from './track';
// eslint-disable-next-line no-unused-vars
import Note from './note';
// eslint-disable-next-line no-unused-vars
import Project from './project';
import Control from './control';

/**
 * A virtual digital audio workstation.
 */
class DAW {
  /**
   * @param {Pack} pack
   * @param {Project} project
   */
  constructor(pack, project) {
    this.pack = pack;
    this.project = project;
    this.audioHandler = new AudioHandler();
  }

  /**
   * Load all of the samples in the pack.
   */
  async load() {
    return this.pack.load(this.audioHandler).then(() => this);
  }

  /**
   * Play the track
   */
  play() {
    this.stop();

    this.project.track.iterate((trackPattern) => {
      const pattern = this.project.getPatternByID(trackPattern.patternId);

      for (let b = 0; b < trackPattern.bars.length; b++) {
        if (trackPattern.bars[b] === 1) {
          pattern.iterate((note) => {
            const sample = this.pack.getSample(note.sampleId);
            const { audioBuffer, bpm } = sample;

            const delay = note.control.delay + trackPattern.control.delay + pattern.control.delay;
            const offset = ((note.beat + delay) / (trackPattern.control.playbackRate * pattern.control.playbackRate) + b * 4) * this.project.rate;

            const playbackRate = (this.project.bpm / bpm) * note.control.playbackRate * trackPattern.control.playbackRate * pattern.control.playbackRate;
            const detune = note.control.detune + trackPattern.control.detune + pattern.control.detune;
            let gain = note.control.gain * trackPattern.control.gain * pattern.control.gain;
            let pan = note.control.pan + trackPattern.control.pan + pattern.control.pan;

            if (gain > 1) {
              gain = 1;
            }

            if (pan > 1) {
              pan = 1;
            } else if (pan < -1) {
              pan = -1;
            }

            this.audioHandler.playSample(
              this.audioHandler.controlNode(pattern.control),
              this.audioHandler.controlNode(trackPattern.control),
              audioBuffer,
              offset,
              Control.fromObject({
                detune, playbackRate, gain, pan
              })
            );
          });
        }
      }
    });
  }

  /**
   */
  stop() {
    this.audioHandler.stop();
  }
}

export default DAW;
