'use strict';
import BaseDrawer from './base';

class WaveFormDrawer extends BaseDrawer {
    draw(options) {
        let {
            strokeStyle = '#BBB',
            data = []
        } = options;
        let ctx = this.ctx;
        // get the total width && height
        let totalWidth = this.element.width;
        let totalHeight = this.element.height;
        data = this.normalizeData(data);
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
        ctx.stroke();
        ctx.closePath();
    }
}

export default WaveFormDrawer;
