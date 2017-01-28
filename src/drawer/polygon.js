'use strict';
import BaseDrawer from './base';

class PolygonDrawer extends BaseDrawer {
  draw(options) {
    let {
      n = 3,
      rotate = 0,
      lineWidth = 2,
      data = [],
      rotateStep = 2 * Math.PI / (data.length || 1),
    } = options;
    let ctx = this.ctx;
    const totalWidth = this.element.width;
    const totalHeight = this.element.height;
    const radius = Math.max(this.element.width, this.element.height) / 2;
    data = this.normalizeData(data, radius);
    ctx.clearRect(0, 0, totalWidth, totalHeight);
    let angle = 2 * Math.PI / n;
    data.forEach((value, index) => {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        let x = totalWidth / 2 + value * Math.sin(i*angle + rotate + rotateStep*index);
        let y = totalHeight / 2 - value * Math.cos(i*angle + rotate + rotateStep*index);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.lineWidth = lineWidth;
      ctx.closePath();
      ctx.stroke();
    });
  }
}

export default PolygonDrawer;
