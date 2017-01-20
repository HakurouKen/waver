'use strict';

const AudioContext = typeof window === 'undefined' ?
    null : window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

if (!AudioContext) {
    throw new Error('AudioContext is not supported in your environment.');
}

const ctx = new AudioContext();
const analyser = ctx.createAnalyser();

class AudioAnalyser {
    constructor(element, fftSize=2048) {
        let ctx = new AudioContext();
        // only support HtmlElement for now.
        let source = ctx.createMediaElementSource(element);
        let analyser = ctx.createAnalyser();
        // make connections
        source.connect(analyser);
        analyser.connect(ctx.destination);
        analyser.fftSize = fftSize;

        this.ctx = ctx;
        this.analyser = analyser;
    }

    _getAnalyserData(method, num) {
      let analyser = this.analyser;
      let raw = new Uint8Array(analyser.frequencyBinCount);
      analyser[method](raw);
      const step = raw.length / num;
      let ret = [];
      for (let i = 0; i < num; i++) {
          // truncate the tail of the data (usually 0) to make the waveform look better.
          ret.push(raw[Math.round(step * i * 7/8)]);
      }
      return ret;
    }

    getFrequencyData(num=this.analyser.frequencyBinCount) {
      return this._getAnalyserData('getByteFrequencyData', num);
    }

    getTimeDomainData(num=this.analyser.frequencyBinCount) {
      return this._getAnalyserData('getByteTimeDomainData', num);
    }
}

export default AudioAnalyser;
