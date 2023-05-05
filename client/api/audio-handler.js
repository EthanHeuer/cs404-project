// eslint-disable-next-line no-unused-vars
import Control from './control';

/**
 * Container for the AudioContext object
 */
class AudioHandler {
  /** */
  constructor() {
    this.audioCtx = new AudioContext();
    /** @type {AudioBufferSourceNode[]} */
    this.audioBuffers = [];
  }

  /**
   * Retrieve a local file
   * @param {string} filePath
   */
  async getFile(filePath) {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  /**
   * Get and load a local file
   * @param {string} filePath
   */
  async loadFile(filePath) {
    const sample = await this.getFile(filePath);
    return sample;
  }

  /**
   * @param {AudioBuffer} audioBuffer
   * @param {number} time
   * @param {Control} control
   * @return {AudioBufferSourceNode}
   */
  playSample(patternControl, trackPatternControl, audioBuffer, time, control) {
    const sampleSource = new AudioBufferSourceNode(this.audioCtx, {
      buffer: audioBuffer,
      playbackRate: control.playbackRate,
      detune: control.detune
    });

    const gainNode = new GainNode(this.audioCtx, { gain: control.gain });
    const panNode = new StereoPannerNode(this.audioCtx, { pan: control.pan });

    const node = this.controlNode(control);

    sampleSource.connect(node)
      .connect(patternControl)
      .connect(trackPatternControl)
      .connect(panNode)
      .connect(gainNode)
      .connect(this.audioCtx.destination);

    sampleSource.start(this.audioCtx.currentTime + time);
    this.audioBuffers.push(sampleSource);

    return sampleSource;
  }

  /**
   * @param {Control} control
   * @return {AudioNode}
   */
  controlNode(control) {
    const gainNode = new GainNode(this.audioCtx, { gain: control.gain });
    const pannerNode = new StereoPannerNode(this.audioCtx, { pan: control.pan });

    gainNode.connect(pannerNode);

    return gainNode;
  }

  /**
   */
  stop() {
    this.audioBuffers.forEach((audioBuffer) => audioBuffer.stop());
    this.audioBuffers = [];
  }
}

export default AudioHandler;
