let TITLE_BAR_HEIGHT = 50;
let PADDING_INC = 10;


class PixelCanvasOptions {
    constructor(x, y, w, h, parentPixelCanvas) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.pixelCanvas = parentPixelCanvas;
        this.selectedCategory = 1;
        this.buttons = [];
        this.selectedColor = color(207, 76, 102);

        this.colorPickerX = this.x + PADDING_INC;
        this.colorPickerY = this.y + TITLE_BAR_HEIGHT + PADDING_INC;
        this.colorPickerW = 255;
        this.colorPickerH = 255;


    }

    display() {

        this.displayBackground();

        this.displaySelectorBar();

        if (this.selectedCategory === 1) {
            this.displayColorOptions();
        } else if (this.selectedCategory === 2) {
            this.displaySizingOptions();
        }
        else if (this.selectedCategory === 3) {
            this.displayFileOptions();
        }
    }

    mousePressed(mx, my) {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].mousePressed(mx, my);
        }
    }

    changeSelectedColor(r, g, b) {
        this.selectedColor = color(r, g, b);
        this.displaySelectedColor();
    }

    displayBackground() {
        push();
        noStroke();
        fill(204, 234, 237);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }

    displaySelectorBar() {


        let titleStrings = ["COLOR", "SIZING", "FILE"]
        push();

        for (let i = 0; i < titleStrings.length; i++) {
            stroke(20);
            let buttonFillColor = color(118, 182, 222);
            if (i + 1 === this.selectedCategory) {
                buttonFillColor = color(207, 76, 102);
            }

            let titleX = this.x + (this.w / titleStrings.length) * i;
            let titleY = this.y;
            let titleW = this.w / titleStrings.length;
            let titleH = TITLE_BAR_HEIGHT;
            let b = new Button(titleX, titleY, titleW, titleH, buttonFillColor, titleStrings[i], () => this.switchTitleOption(titleStrings[i]));


            if (!this.buttons.includes(b)) {
                this.buttons.push(b);
            }
            b.run();

        }

        pop();
    }


    switchTitleOption(optionTitle) {
        console.log("called");
        this.displayBackground();


        if (optionTitle === "COLOR") {
            this.selectedCategory = 1;
            this.buttons[0].color = color(207, 76, 102);
            this.buttons[1].color = color(118, 182, 222);
            this.buttons[2].color = color(118, 182, 222);
            this.displayColorOptions();
        }
        if (optionTitle === "SIZING") {
            this.selectedCategory = 2;
            this.buttons[1].color = color(207, 76, 102);
            this.buttons[2].color = color(118, 182, 222);
            this.buttons[0].color = color(118, 182, 222);
            this.displaySizingOptions();
        }
        if (optionTitle === "FILE") {
            this.selectedCategory = 3;
            this.buttons[2].color = color(207, 76, 102);
            this.buttons[0].color = color(118, 182, 222);
            this.buttons[1].color = color(118, 182, 222);
            this.displayFileOptions();

        }

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].run();
        }
    }



    displayColorOptions() {

        // let colorPicker = createColorPicker('#ed225d');
        // colorPicker.position(this.x, this.y);



        push();
        this.displayColorPicker();
        this.displaySelectedColor();
        pop();

        //color selector invisible button
        let b = new Button(this.x + PADDING_INC, this.y + TITLE_BAR_HEIGHT + PADDING_INC, 255, 255, color(0, 0, 0, 0), "", () => this.getColorOfClick(mouseX, mouseY, this.colorPickerX, this.colorPickerY, this.colorPickerW, this.colorPickerH));
        b.run();

        if (!this.buttons.includes(b)) {
            this.buttons.push(b);
        }

    }

    getColorOfClick(mx, my, cpx, cpy, cpw, cph) {
        // console.log("changing selected color: ", cpx + cpw - mx, my - cpy, mx - cpx);
        this.changeSelectedColor(cpx + cpw - mx, my - cpy, mx - cpx);


    }

    displaySelectedColor() {
        push();
        noStroke();
        fill(this.selectedColor);
        rect(this.x + PADDING_INC, this.y + TITLE_BAR_HEIGHT + 255 + PADDING_INC * 2, 255, PADDING_INC * 3);
        pop();
    }

    displayColorPicker() {
        let img = createImage(255, 255);
        img.loadPixels();

        for (let i = 0; i < img.width; i++) {
            for (let j = 0; j < img.height; j++) {
                img.set(i, j, color(255 - i, j, i));
            }
        }
        img.updatePixels();

        image(img, this.colorPickerX, this.colorPickerY);
    }

    displaySizingOptions() {
        push();
        textAlign(CENTER, CENTER);
        text("SIZING", this.x, this.y, this.w, this.h);
        pop();

        //change dimensions of canvas

        // keep current art? for now no

        //change pixel size (this will eventually be a keyboard shortcut)

    }

    displayFileOptions() {
        push();
        textAlign(CENTER, CENTER);
        text("FILE", this.x, this.y, this.w, this.h);
        pop();

        //download file

        //upload image
    }
}