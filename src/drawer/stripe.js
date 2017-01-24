'use strict';
import BaseDrawer from './base';

class StripeDrawer extends BaseDrawer {
  draw(options) {
    let {
      fillStyle = '#BBB',
      gap = 2,
      cap = true,
      capHeight = 2,
      capStyle = '#BBB',
      capFallSpeed = 2,
      data = []
    } = options;
    let ctx = this.ctx;
    // get the total width && height
    let totalWidth = this.element.width;
    let totalHeight = this.element.height - (cap ? capHeight : 0);
    data = this.normalizeData(data);
    const stripeWidth = (totalWidth + gap) / data.length - gap;
    // clear the canvas
    ctx.clearRect(0, 0, totalWidth, totalHeight);
    // draw the cap
    if (cap) {
      ctx.fillStyle = capStyle;
      let lastCapData = this.lastCapData = this.lastCapData || [];
      // if the length of data changed, the gap's position will be re-calulate.
      const gapTransition = data.length === lastCapData.length;
      data.forEach((value, index) => {
        if (gapTransition && (value < lastCapData[index])) {
          // the cap will falldown in a uniform speed
          ctx.fillRect(index * (stripeWidth + gap), totalHeight - (lastCapData[index] -= capFallSpeed), stripeWidth, capHeight);
        } else {
          ctx.fillRect(index * (stripeWidth + gap), totalHeight - value, stripeWidth, capHeight);
          lastCapData[index] = value;
        }
      });
    }
    ctx.fillStyle = fillStyle;
    data.forEach((value, index) => {
      let stripeHeight = value - (cap ? capHeight : 0);
      ctx.fillRect(index * (stripeWidth + gap), totalHeight - stripeHeight, stripeWidth, stripeHeight);
    });
  }
}

export default StripeDrawer;
