const OPTIONS_X = 0;
const OPTIONS_Y = 450;
let OPTIONS_W = 900;
let OPTIONS_H = 700;

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
        //canvas/graphics
        this.pg = createGraphics(width, height);
        this.pg.pixelDensity(1);
        this.pg.noLoop()
        this.pixels = new Array(width);
        for (var i = 0; i < this.pixels.length; i++) {
            this.pixels[i] = new Array(height);
        }
        for (let i = 0; i < this.width; i += 1) {
            for (let j = 0; j < this.height; j += 1) {
                this.pixels[i][j] = color(255, 255, 255);
            }
        }
        this.setPixels();
        this.selectedColor = color(255, 0, 0);
        this.options = new PixelCanvasOptions(OPTIONS_X, OPTIONS_Y, OPTIONS_W, OPTIONS_H, this);
    }

    display() {
        //render canvas
        image(this.pg, this.x, this.y, this.width, this.height);

        // render grid
        this.renderGrid();
        // render selector
        this.renderSelector();
        //show options
        this.options.display();
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
        noFill();
        rect(this.x + this.resolution * this.selectorX,
            this.y + this.resolution * this.selectorY,
            this.resolution, this.resolution)
        pop();
    }

    mousePressed(mx, my) {
        this.options.mousePressed(mx, my);
    }

    keyPressed(keyCode) {
        console.log(keyCode)
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
        } else if (keyCode === SHIFT) {
            this.insertColor();
        }
        this.display();
    }

    insertColor() {
        console.log("inserting color")
        for (let i = this.selectorX * this.resolution; i < this.selectorX * this.resolution + this.resolution; i++) {
            for (let j = this.selectorY * this.resolution; j < this.selectorY * this.resolution + this.resolution; j++) {
                // this.pixels[i][j] = this.selectedColor;
                this.pg.set(i, j, this.selectedColor);
                this.pg.updatePixels();
            }
        }
    }

    setPixels() {
        this.pg.background(250);
        this.pg.loadPixels();
        for (let i = 0; i < this.width; i += 1) {
            for (let j = 0; j < this.height; j += 1) {
                let index = 4 * (j * width + (i));
                this.pg.pixels[index] = red(this.pixels[i][j]);
                this.pg.pixels[index + 1] = green(this.pixels[i][j]);
                this.pg.pixels[index + 2] = blue(this.pixels[i][j]);
                this.pg.pixels[index + 3] = alpha(this.pixels[i][j]);
            }
        }
        this.pg.updatePixels();
    }
}
