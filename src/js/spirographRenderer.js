
const alpha = 100; // how opaque is the tracing system

export default {
  render,
}

function render(p, sines, params) {

  p.push(); // start a transformation matrix
  p.translate(p.width / 2, p.height / 2); // move to middle of screen

  for (let i = 0; i < params.numSines; i++) {
    let erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
    // setup for tracing
    if (params.trace) {
      p.stroke(20 * i, 200 - 20 * i, 255 * (p.float(i) / params.numSines), alpha);
      p.fill(0, 0, 255, alpha / 2);
      erad = 5.0 * (1.0 - p.float(i) / params.numSines); // pen width will be related to which sine
      p.strokeWeight(erad); // Make the points 10 pixels in
    }
    let radius = params.radScale * params.rad / (i * params.radRatio + 1); // radius for circle itself
    p.rotate(sines[i]); // rotate circle
    if (!params.trace) p.ellipse(0, 0, radius * 2, radius * 2); // if we're simulating, draw the sine

    drawDot(p, radius, erad, params.trace);

    p.translate(0, radius); // move into position for next sine
    // update angle based on fundamental
    sines[i] = (sines[i] + (params.speed + (params.speed * i * params.ratio))) % p.TWO_PI;
  }

  p.pop(); // pop down final transformation
}

function drawDot(p, radius, erad, trace) {
  p.push(); // go up one level
  p.translate(0, radius); // move to sine edge

  if (trace) p.ellipse(0, 0, erad, erad); // draw with erad if tracing
  else p.ellipse(0, 0, 5, 5); // draw a little circle

  p.pop(); // go down one level
}

function drawArc(p, radius, erad, trace) {
  p.push(); // go up one level
  p.translate(0, radius); // move to sine edge

  p.point(0, 0);

  //if (trace) p.ellipse(0, 0, erad, erad); // draw with erad if tracing
  //else p.ellipse(0, 0, 5, 5); // draw a little circle

  p.pop(); // go down one level
}