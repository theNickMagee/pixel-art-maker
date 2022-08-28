class PixelCanvas {
    constructor(x, y, width, height, resolution) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.resolution = resolution;
        this.showGrid = true;
        this.showSelector = true;
        // this are indexes
        this.selectorX = 0;
        this.selectorY = 0;
    }

    draw() {
        // draw bg and outline
        stroke(5);
        strokeWeight(2);
        rect(this.x, this.y, this.width, this.height);
        // render grid
        this.renderGrid();
        // render selector
        this.renderSelector();
    }

    renderGrid() {
        if (this.showGrid) {
            push();
            strokeWeight(0.4);
            stroke(5);
            for (let i = this.x; i <= this.width + this.resolution; i += this.resolution) {
                line(i, this.y, i, this.y + this.height);
            }
            for (let i = this.y; i <= this.height + this.resolution; i += this.resolution) {
                line(this.x, i, this.x + this.width, i);
            }
            pop();
        }
    }

    renderSelector() {
        push();
        strokeWeight(2);
        stroke(0);
        rect(this.x + this.resolution * this.selectorX,
            this.y + this.resolution * this.selectorY,
            this.resolution, this.resolution)
        pop();
    }

    keyPressed(keyCode) {
        console.log(this.keyPressed)
        if (keyCode === LEFT_ARROW) {
            this.selectorX = this.selectorX - 1;
            if (this.selectorX < 0) {
                this.selectorX = round(this.width / this.resolution) - 1;
            }
        } else if (keyCode === RIGHT_ARROW) {
            this.selectorX = this.selectorX + 1;
            if (this.selectorX > round(this.width / this.resolution) - 1) {
                this.selectorX = 0;
            }
        } else if (keyCode === DOWN_ARROW) {
            this.selectorY = this.selectorY + 1;
            if (this.selectorY > round(this.height / this.resolution) - 1) {
                this.selectorY = 0;
            }
        } else if (keyCode === UP_ARROW) {
            this.selectorY = this.selectorY - 1;
            if (this.selectorY < 0) {
                this.selectorY = round(this.height / this.resolution) - 1;
            }
        }
    }
}
