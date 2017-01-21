'use strict';

class BaseDrawer {
    constructor(element) {
        this.element = element;
        this.ctx = element.getContext('2d');
    }

    draw(options) {
        throw new Error('`draw` method must be overwrite.');
    }
}

export default BaseDrawer;
