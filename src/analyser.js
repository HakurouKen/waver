'use strict';

const AudioContext = typeof window === 'undefined' ?
  null : window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

if (!AudioContext) {
  throw new Error('AudioContext is not supported in your environment.');
}

class AudioAnalyser {
  constructor(srcGen, fftSize=2048) {
    let ctx = new AudioContext();
    let source = srcGen(ctx);
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
      // magic number 7/8 is a empirical value
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

const MEDIA_SOURCE_TYPE = {
  'element': 'createMediaElementSource',
  'stream': 'createMediaStreamSource'
};

AudioAnalyser.sourceGenerator = function (type, ...args) {
  if (type === 'custom') {
    // Usage: AudioAnalyser.sourceGenerator('custom', genFunction)
    let customConstructor = args[0];
    if (typeof customConstructor !== 'function') {
      throw Error('Custom constructor must be a function')
    } else {
      return function(ctx) {
        return customConstructor(ctx);
      };
    }
  } else if (typeof type === 'function') {
    // Usage: AudioAnalyser.sourceGenerator(genFunction)
    return function(ctx) {
      return type(ctx);
    };
  } else if (!(type in MEDIA_SOURCE_TYPE)) {
    throw Error('Unsupported type.')
  }
  // Usage: AudioAnalyser.sourceGenerator('element', element)
  // Or:    AudioAnalyser.sourceGenerator('stream', stream)
  return function (ctx) {
    return ctx[MEDIA_SOURCE_TYPE[type]].apply(ctx, args);
  };
};

export default AudioAnalyser;
