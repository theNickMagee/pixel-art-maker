class Button {
    constructor(x, y, w, h, color, text, functionOnPress) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.functionOnPress = functionOnPress;
        this.color = color;
        this.text = text;
    }

    run() {
        push();
        fill(this.color);
        noStroke();
        rect(this.x, this.y, this.w, this.h);


        //text
        fill(50);
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y, this.w, this.h);

        pop();
    }

    mousePressed(mx, my) {
        if (mx > this.x && mx < this.x + this.w &&
            my > this.y && my < this.y + this.h) {
            this.functionOnPress();
        }
    }




}


