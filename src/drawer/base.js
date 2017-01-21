'use strict';

class BaseDrawer {
    constructor(element) {
        this.element = element;
        this.ctx = element.getContext('2d');
    }

    normalizeData(data, height) {
        height = height || this.element.height;
        return data.map(raw => {
            return raw/256 * height;
        });
    }

    draw(options) {
        throw new Error('`draw` method must be overwrite.');
    }
}

export default BaseDrawer;
