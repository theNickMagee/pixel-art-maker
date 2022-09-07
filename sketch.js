const MIN_WIDTH = 900;
const HEIGHT = 900;
const PIXEL_CANVAS_X = 20;
const PIXEL_CANVAS_Y = 20;
let PIXEL_CANVAS_W = 400;
let PIXEL_CANVAS_H = 400;
let PIXEL_CANVAS_RES = 10;

// sprite sheet ref: https://github.com/CodingTrain/Coding-Challenges/blob/main/111_animated_sprite

let pixelCanvas;

function setup() {
  // set width equal to div widht, we dont want it to be too small
  let dims = calcCanvasDimensions();
  var canvas = createCanvas(dims[0], dims[1]);
  canvas.parent("mainCanvas");
  pixelCanvas = new PixelCanvas(
    PIXEL_CANVAS_X,
    PIXEL_CANVAS_Y,
    PIXEL_CANVAS_W,
    PIXEL_CANVAS_H,
    PIXEL_CANVAS_RES
  );
  noLoop();
}

function draw() {
  background(230);
  pixelCanvas.display();
}

function keyPressed() {
  pixelCanvas.keyPressed(keyCode);
  return false;
}

function mouseReleased() {
  pixelCanvas.mouseReleased(mouseX, mouseY);
}

function calcCanvasDimensions() {
  var canvasWidth;
  var canvasHeight = HEIGHT;
  if (windowWidth >= MIN_WIDTH) {
    canvasWidth = windowWidth;
  } else {
    canvasWidth = MIN_WIDTH;
  }

  return [canvasWidth, canvasHeight];
}

function windowResized() {
  let dims = calcCanvasDimensions();
  resizeCanvas(dims[0], dims[1]);
}
