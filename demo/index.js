'use strict';

import raf from '../src/raf';
import AudioAnalyser from '../src/analyser';
import StripeDrawer from '../src/drawer/stripe';
import WaveFormDrawer from '../src/drawer/waveform';
import CircleDrawer from '../src/drawer/circle';

const $ = document.getElementById.bind(document);
let audio = $('audio');
let stripeCanvas = $('stripe-canvas');
let waveformCanvas = $('waveform-canvas');
let circleCanvas = $('circle-canvas');
let uploader = $('upload');

let analyser = new AudioAnalyser(audio);
let stripeDrawer = new StripeDrawer(stripeCanvas);
let waveformDrawer = new WaveFormDrawer(waveformCanvas);
let circleDrawer = new CircleDrawer(circleCanvas);

uploader.onchange = function() {
  let files = this.files;
  if (files[0]) {
    if (audio.src) {
      URL.revokeObjectURL(audio.src);
    }
    audio.src = URL.createObjectURL(files[0]);
    audio.play();
  }
};

raf.cycle(() => {
  let stripeData = analyser.getFrequencyData(64);
  let waveformData = analyser.getTimeDomainData(64);
  stripeDrawer.draw({ data: stripeData });
  waveformDrawer.draw({ data: waveformData });
  circleDrawer.draw({ data: waveformData });
  return true;
});
