'use strict';
import BaseDrawer from './base';

class CircleDrawer extends BaseDrawer {
  draw(options) {
    let {
      strokeStyle = '#BBB',
      lineWidth = 2,
      fill = false,
      fillStyle = '#BBB',
      data = []
    } = options;
    let ctx = this.ctx;
    // get the total width && height
    const totalWidth = this.element.width;
    const totalHeight = this.element.height;
    // radius
    let radius = Math.min(totalWidth, totalHeight) / 2;
    data = this.normalizeData(data, 2 * radius/3 - lineWidth);
    // clear the canvas
    ctx.clearRect(0, 0, totalWidth, totalHeight);
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    let len = data.length;
    data.forEach((value, index) => {
      let angle = (index / len) * 2 * Math.PI;
      // data range from [radius/3, radius]
      let x = totalWidth/2 + (1 * radius/3 + value) * Math.sin(angle);
      let y = totalHeight/2 + (1 * radius/3 + value) * Math.cos(angle);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.lineWidth = lineWidth;
    ctx.closePath();
    ctx.stroke();
    if (fill) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
  }
}

export default CircleDrawer;
