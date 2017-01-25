'use strict';

import raf from '../src/raf';
import AudioAnalyser from '../src/analyser';
import StripeDrawer from '../src/drawer/stripe';
import WaveFormDrawer from '../src/drawer/waveform';
import CircleDrawer from '../src/drawer/circle';
import BilateralStripeDrawer from '../src/drawer/bilateralStripe';

const $ = document.getElementById.bind(document);
let audio = $('audio');
let canvas = $('canvas');
let select = $('select');
let title = $('title');
let uploader = $('upload');

let analyser = new AudioAnalyser(AudioAnalyser.sourceGenerator('element', audio));
let drawers = {
  stripe: {
    cls: require('../src/drawer/stripe'),
    width: 800,
    height: 300,
    data: 'frequency'
  },
  bilateralStripe: {
    cls: require('../src/drawer/bilateralStripe'),
    width: 800,
    height: 300,
    data: 'frequency'
  },
  waveform: {
    cls: require('../src/drawer/waveform'),
    width: 800,
    height: 300,
    data: 'timedomain'
  },
  circle: {
    cls: require('../src/drawer/circle'),
    width: 300,
    height: 300,
    data: 'timedomain'
  },
  ring: {
    cls: require('../src/drawer/ring'),
    width: 300,
    height: 300,
    data: function(analyser) {
      return analyser.getFrequencyData(8)
    }
  }
};

const dataGetter = {
  frequency: 'getFrequencyData',
  timedomain: 'getTimeDomainData'
};

for (let key in drawers) {
  let config = drawers[key];
  config.instance = new config.cls(canvas);
  let getData = config.data;
  if (typeof getData === 'string') {
    config.data = function (analyser) {
      return analyser[dataGetter[getData]](64);
    }
  }
}

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

let drawer = null;
select.onchange = function () {
  let value = select.value;
  let text = select.options[select.selectedIndex].text;
  title.innerText = text;
  drawer = drawers[value];
  canvas.width = drawer.width || canvas.width;
  canvas.height = drawer.height || canvas.height;
};

select.onchange();

raf.cycle(() => {
  if (drawer) {
    let data = drawer.data(analyser);
    drawer.instance.draw({ data: data });
  };
  return true;
});
