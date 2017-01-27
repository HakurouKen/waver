'use strict';
import BaseDrawer from './base';

class BilateralStripeDrawer extends BaseDrawer {
  draw(options) {
    let {
      fillStyle = '#BBB',
      gap = 2,
      middleLine = true,
      middleLineWidth = 2,
      data = []
    } = options;
    let ctx = this.ctx;
    // get the total width && height
    const totalWidth = this.element.width;
    const totalHeight = this.element.height;
    data = this.normalizeData(data);
    const stripeWidth = (totalWidth + gap) / data.length - gap;
    // clear the canvas
    ctx.clearRect(0, 0, totalWidth, totalHeight);

    ctx.fillStyle = fillStyle;
    data.forEach((value, index) => {
      value = middleLine ? Math.max(middleLineWidth, value) : value;
      ctx.fillRect(index * (stripeWidth + gap), (totalHeight - value)/2, stripeWidth, value);
    });
  }
}

export default BilateralStripeDrawer;
