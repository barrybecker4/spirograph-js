import createControls from './controls.js';
import spirographRenderer from './spirographRenderer.js';

const sketch = p => {
  let MAX_SINES = 50  ; // how many of these things can we do at once?
  let sines = new Array(MAX_SINES); // an array to hold all the current angles
  let rad; // an initial radius value for the central sine
  const controls = createControls(p);

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

    if (!trace) {
      p.stroke(0, 255); // black pen
      p.noFill(); // don't fill
      p.background(204); // clear screen if showing geometry
    }
    if (!trace || trace != oldTrace) {
      controls.drawSliderLabels();
      oldTrace = trace;
    }

    // add slider for radMin, radMax, radNumPoints
    // add toggle for show lines
    // make points smaller on outer circles
    // toggle for middle circle
    const params = {
      rad,
      trace,
      speed: controls.speedSlider.value() / 20000,
      numSines: controls.numSinesSlider.value(),
      ratio:  1.0 + controls.speedRatioSlider.value() / 10,
      radScale: controls.radScaleSlider.value() / 100,
      radRatio: controls.radRatioSlider.value() / 100,
    }

    spirographRenderer.render(p, sines, params);
  }

  p.keyReleased = function() {
    if (p.key === ' ') {
      trace = !trace;
      p.background(255);
    }
  }

}

new p5(sketch);
