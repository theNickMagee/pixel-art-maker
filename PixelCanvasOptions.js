let TITLE_BAR_HEIGHT = 50;
let PADDING_INC = 10;

//if we ever want to use position() on a p5 element we need to get its window position 
let WINDOW_HEIGHT_DIF = 80;

class PixelCanvasOptions {
    constructor(x, y, w, h, parentPixelCanvas) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.pixelCanvas = parentPixelCanvas;
        this.selectedCategory = 1;
        this.titleButtonFillColor = color(118, 182, 222);
        this.selectedTitleFill = color(207, 76, 102);
        let titleY = this.y;
        let titleW = this.w / 3;
        let titleH = TITLE_BAR_HEIGHT;
        this.colorButton = new Button(this.x + (this.w / 3) * 0, titleY, titleW, titleH, this.selectedTitleFill, "COLOR", () => this.switchTitleOption("COLOR"));
        this.sizingButton = new Button(this.x + (this.w / 3) * 1, titleY, titleW, titleH, this.titleButtonFillColor, "SIZING", () => this.switchTitleOption("SIZING"));
        this.fileButton = new Button(this.x + (this.w / 3) * 2, titleY, titleW, titleH, this.titleButtonFillColor, "FILE", () => this.switchTitleOption("FILE"));


        this.buttons = [];
        this.buttons.push(this.colorButton);
        this.buttons.push(this.sizingButton);
        this.buttons.push(this.fileButton);


        this.colorPickerX = this.x + PADDING_INC;
        this.colorPickerY = this.y + TITLE_BAR_HEIGHT + PADDING_INC;
        this.colorPickerW = 255;
        this.colorPickerH = 255;

        this.selectedColor = color(255, 255, 255);
        console.log("brightness: ", brightness(this.selectedColor))
        this.brightnessSlider = createSlider(0, 1, map(brightness(this.selectedColor), 0, 100, 0, 1), 0.01);
        this.opacitySlider = createSlider(0, 255, 255, 1);

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

    mouseReleased(mx, my) {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].mouseReleased(mx, my);
        }
    }

    changeSelectedColor(r, g, b) {
        this.selectedColor = color(r, g, b);
        // this.brightnessSlider.value(map(brightness(this.selectedColor), 0, 255, 0, 1));
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


        this.colorButton.run();
        this.sizingButton.run();
        this.fileButton.run();

    }


    switchTitleOption(optionTitle) {
        console.log("called");
        this.displayBackground();


        if (optionTitle === "COLOR") {
            console.log("color")
            this.selectedCategory = 1;
            this.buttons[0].color = color(207, 76, 102);
            this.buttons[1].color = color(118, 182, 222);
            this.buttons[2].color = color(118, 182, 222);
            this.displayColorOptions();
        }
        if (optionTitle === "SIZING") {
            console.log("sizing")
            this.selectedCategory = 2;
            this.buttons[1].color = color(207, 76, 102);
            this.buttons[2].color = color(118, 182, 222);
            this.buttons[0].color = color(118, 182, 222);
            this.displaySizingOptions();
        }
        if (optionTitle === "FILE") {
            console.log("file")
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



        // sliders and rgb details

        this.opacitySlider.position(this.colorPickerX + this.colorPickerW + PADDING_INC * 3, this.colorPickerY + WINDOW_HEIGHT_DIF);
        this.opacitySlider.mouseReleased(() => {
            this.selectedColor.setAlpha(this.opacitySlider.value());
            this.display();
        });

        this.brightnessSlider.position(this.colorPickerX + this.colorPickerW + PADDING_INC * 3, this.colorPickerY + WINDOW_HEIGHT_DIF + PADDING_INC * 3);
        this.brightnessSlider.mouseReleased((val) => {

            this.changeSelectedColor(red(this.selectedColor), green(this.selectedColor), blue(this.selectedColor));
            this.display();
        });
    }



    getColorOfClick(mx, my, cpx, cpy, cpw, cph) {
        this.opacitySlider.value(255);

        // console.log("changing selected color: ", cpx + cpw - mx, my - cpy, mx - cpx);
        let bv = this.brightnessSlider.value() * 2;
        this.changeSelectedColor(bv * (cpx + cpw - mx), bv * (my - cpy), bv * (mx - cpx));


    }

    displaySelectedColor() {


        push();
        noStroke();
        console.log(red(this.selectedColor), green(this.selectedColor), blue(this.selectedColor), alpha(this.selectedColor))
        fill(red(this.selectedColor), green(this.selectedColor), blue(this.selectedColor), alpha(this.selectedColor));
        rect(this.x + PADDING_INC, this.y + TITLE_BAR_HEIGHT + 255 + PADDING_INC * 2, 255, PADDING_INC * 3);
        pop();
    }

    displayColorPicker() {

        let img = createImage(255, 255);
        img.loadPixels();

        let bv = this.brightnessSlider.value() * 2;

        for (let i = 0; i < img.width; i++) {
            for (let j = 0; j < img.height; j++) {
                img.set(i, j, color(bv * (255 - i), bv * j, bv * i));
            }
        }
        img.updatePixels();

        image(img, this.colorPickerX, this.colorPickerY);

        //color selector invisible button
        let b = new Button(this.x + PADDING_INC, this.y + TITLE_BAR_HEIGHT + PADDING_INC, 255, 255, color(0, 0, 0, 0), "", () => this.getColorOfClick(mouseX, mouseY, this.colorPickerX, this.colorPickerY, this.colorPickerW, this.colorPickerH));

        if (!this.buttons.includes(b)) {
            this.buttons.push(b);
        }
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