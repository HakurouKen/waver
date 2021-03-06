'use strict';
import BaseDrawer from './base';

class WaveformDrawer extends BaseDrawer {
  draw(options) {
    let {
      strokeStyle = '#BBB',
      lineWidth = 2,
      data = []
    } = options;
    let ctx = this.ctx;
    // get the total width && height
    const totalWidth = this.element.width;
    const totalHeight = this.element.height;
    data = this.normalizeData(data, totalHeight - lineWidth);
    const periodWidth = totalWidth / data.length;
      // clear the canvas
    ctx.clearRect(0, 0, totalWidth, totalHeight);
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    data.forEach((value, index) => {
      if (index === 0) {
        ctx.moveTo(0, value);
      }
      ctx.lineTo(index * periodWidth, value);
    });
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
}

export default WaveformDrawer;
