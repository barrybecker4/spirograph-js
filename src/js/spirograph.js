let MAX_SINES = 50  ; // how many of these things can we do at once?
let sines = new Array(MAX_SINES); // an array to hold all the current angles
let rad; // an initial radius value for the central sine

const SLIDER_MARGIN = 10;
const SLIDER_WIDTH = 150;


let alpha = 50; // how opaque is the tracing system

let trace = false; // are we tracing?
let oldTrace = !trace;

let fundSlider;
let numSinesSlider;
let ratioSlider;

function setup() {
  createCanvas(100, 100);
  windowResized();

  background(204); // clear the screen

  textSize(14);
  noStroke();
  fundSlider = createSlider(0, 1000, 100); // the speed of the central sine
  fundSlider.position(SLIDER_MARGIN, 30);
  fundSlider.style('width', SLIDER_WIDTH + 'px');
  numSinesSlider = createSlider(1, 20, 2);
  numSinesSlider.position(SLIDER_MARGIN, 50);
  numSinesSlider.style('width', SLIDER_WIDTH + 'px');
  ratioSlider = createSlider(0, 100, 0); // what multiplier for speed is each additional sine?
  ratioSlider.position(SLIDER_MARGIN, 70);
  ratioSlider.style('width', SLIDER_WIDTH + 'px');

  for (let i = 0; i<sines.length; i++) {
    sines[i] = PI; // start EVERYBODY facing NORTH
  }

}

function windowResized() {
  resizeCanvas(windowWidth - 30, windowHeight - 40);
  rad = height / 4; // compute radius for central circle
}

function draw() {

  const fund = fundSlider.value() / 20000;
  const numSines = numSinesSlider.value();
  const ratio = 1.0 + ratioSlider.value() / 10;
  //console.log(r="ratio=" + ratio);

  if (!trace) {
    stroke(0, 255); // black pen
    noFill(); // don't fill
    background(204); // clear screen if showing geometry
  }
  if (!trace || trace != oldTrace) {
    const textX = 2 * SLIDER_MARGIN + SLIDER_WIDTH;
    text('fund',textX, 18);
    text('numSines',textX, 37);
    text('ratio',textX, 58);
    oldTrace = trace;
  }


  // MAIN ACTION
  push(); // start a transformation matrix
  translate(width / 2, height / 2); // move to middle of screen

  for (let i = 0; i < numSines; i++) {
    let erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
    // setup for tracing
    if (trace) {
      stroke(20 * i, 200 - 20 * i, 255 * (float(i) / sines.length), alpha); // blue
      fill(0, 0, 255, alpha / 2); // also, um, blue
      erad = 5.0 * (1.0 - float(i) / sines.length); // pen width will be related to which sine
    }
    let radius = rad / (i + 1); // radius for circle itself
    rotate(sines[i]); // rotate circle
    if (!trace) ellipse(0, 0, radius * 2, radius * 2); // if we're simulating, draw the sine
    push(); // go up one level
    translate(0, radius); // move to sine edge
    if (!trace) ellipse(0, 0, 5, 5); // draw a little circle
    if (trace) ellipse(0, 0, erad, erad); // draw with erad if tracing
    pop(); // go down one level
    translate(0, radius); // move into position for next sine
    // update angle based on fundamental
    sines[i] = (sines[i] + (fund + (fund * i * ratio))) % TWO_PI;
  }

  pop(); // pop down final transformation
}

function keyReleased() {
  if (key === ' ') {
    trace = !trace;
    background(255);
  }
}
