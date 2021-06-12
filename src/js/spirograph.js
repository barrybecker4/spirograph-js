import createSliders from './sliders.js'

const sketch = p => {
  let MAX_SINES = 50  ; // how many of these things can we do at once?
  let sines = new Array(MAX_SINES); // an array to hold all the current angles
  let rad; // an initial radius value for the central sine
  const sliders = createSliders(p);

  let alpha = 50; // how opaque is the tracing system

  let trace = false; // are we tracing?
  let oldTrace = !trace;


  p.setup = function() {
    p.createCanvas(100, 100);
    p.windowResized();

    p.background(204); // clear the screen

    p.textSize(14);
    p.noStroke();

    for (let i = 0; i < sines.length; i++) {
      sines[i] = p.PI; // start EVERYBODY facing NORTH
    }

  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth - 30, p.windowHeight - 40);
    rad = p.height / 4; // compute radius for central circle
  }

  p.draw = function() {

    const fund = sliders.fundSlider.value() / 20000;
    const numSines =sliders.numSinesSlider.value();
    const ratio = 1.0 +sliders.ratioSlider.value() / 10;
    //console.log(r="ratio=" + ratio);

    if (!trace) {
      p.stroke(0, 255); // black pen
      p.noFill(); // don't fill
      p.background(204); // clear screen if showing geometry
    }
    if (!trace || trace != oldTrace) {
      sliders.drawSliderLabels();
      oldTrace = trace;
    }


    // MAIN ACTION
    p.push(); // start a transformation matrix
    p.translate(p.width / 2, p.height / 2); // move to middle of screen

    for (let i = 0; i < numSines; i++) {
      let erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
      // setup for tracing
      if (trace) {
        p.stroke(20 * i, 200 - 20 * i, 255 * (p.float(i) / sines.length), alpha); // blue
        p.fill(0, 0, 255, alpha / 2); // also, um, blue
        erad = 5.0 * (1.0 - p.float(i)  / sines.length); // pen width will be related to which sine
      }
      let radius = rad / (i + 1); // radius for circle itself
      p.rotate(sines[i]); // rotate circle
      if (!trace) p.ellipse(0, 0, radius * 2, radius * 2); // if we're simulating, draw the sine
      p.push(); // go up one level
      p.translate(0, radius); // move to sine edge
      if (!trace) p.ellipse(0, 0, 5, 5); // draw a little circle
      if (trace) p.ellipse(0, 0, erad, erad); // draw with erad if tracing
      p.pop(); // go down one level
      p.translate(0, radius); // move into position for next sine
      // update angle based on fundamental
      sines[i] = (sines[i] + (fund + (fund * i * ratio))) % p.TWO_PI;
    }

    p.pop(); // pop down final transformation
  }

  p.keyReleased = function() {
    if (p.key === ' ') {
      trace = !trace;
      p.background(255);
    }
  }

}

new p5(sketch);
