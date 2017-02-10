'use strict';
import BaseDrawer from './base';

class RingDrawer extends BaseDrawer {
  draw(options) {
    let {
      fillStyle = 'rgba(0, 0, 0, 0.1)',
      data = []
    } = options;
    let ctx = this.ctx;
    const totalWidth = this.element.width;
    const totalHeight = this.element.height;
    let radius = Math.min(totalWidth, totalHeight)/2;
    data = this.normalizeData(data, radius);
    ctx.clearRect(0, 0, totalWidth, totalHeight);
    data.forEach(value => {
      ctx.beginPath();
      ctx.arc(totalWidth/2, totalHeight/2, value, 0, 2 * Math.PI, false);
      ctx.fillStyle = fillStyle;
      ctx.fill();
    });
  }
}

export default RingDrawer;
