const SLIDER_MARGIN = 10;
const SLIDER_WIDTH = 150;
const SLIDER_HEIGHT = 20;
const NUM_SLIDERS = 9;

const UI_PANEL_X = SLIDER_MARGIN;
const UI_PANEL_Y = 30;
const TEXT_Y_OFFSET = -12;


// Todo:
// checkboxes for
// - show center circle
// - draw lines (possible?)
// - trace or not
// - mod colors
export default function createSliders(p) {

  const allSliders = {
    frameRateSlider: createSlider(1, 80, 10, 0),
    speedSlider: createSlider( 0, 1000, 100, 1),
    numSinesSlider: createSlider( 1, 20, 2, 2),
    speedRatioSlider: createSlider( 0, 100, 0, 3),
    radScaleSlider: createSlider( 1, 150, 50, 4),
    radRatioSlider: createSlider( 5, 500, 100, 5),

    radOffsetMinSlider: createSlider( -100, 0, 0, 6),
    radOffsetMaxSlider: createSlider( 0, 100, 0, 7),
    radOffsetSamplesSlider: createSlider( 1, 5, 1, 8),
  };

  allSliders.drawSliderLabels = function() {
    const textX = 2 * SLIDER_MARGIN + SLIDER_WIDTH;
    p.fill(255, 255, 255, 255);
    p.rect(0, 0, 2 * SLIDER_MARGIN + SLIDER_WIDTH + 140,  SLIDER_MARGIN + NUM_SLIDERS * SLIDER_HEIGHT);
    p.noFill();
    p.text(`frame rate (${Math.round(p.frameRate())})`, textX , getSliderY(0) + TEXT_Y_OFFSET);
    p.text(`speed (${allSliders.speedSlider.value()})`, textX , getSliderY(1) + TEXT_Y_OFFSET);
    p.text(`num Sines (${allSliders.numSinesSlider.value()})`, textX, getSliderY(2) + TEXT_Y_OFFSET);
    p.text(`speed ratio (${allSliders.speedRatioSlider.value()})`, textX, getSliderY(3) + TEXT_Y_OFFSET);
    p.text(`radius scale (${allSliders.radScaleSlider.value()})`, textX, getSliderY(4) + TEXT_Y_OFFSET);
    p.text(`radius ratio (${allSliders.radRatioSlider.value()})`, textX, getSliderY(5) + TEXT_Y_OFFSET);

    p.text(`rad offset min (${allSliders.radOffsetMinSlider.value()})`, textX, getSliderY(6) + TEXT_Y_OFFSET);
    p.text(`rad offset max (${allSliders.radOffsetMaxSlider.value()})`, textX, getSliderY(7) + TEXT_Y_OFFSET);
    p.text(`rad offset samples (${allSliders.radOffsetSamplesSlider.value()})`, textX, getSliderY(8) + TEXT_Y_OFFSET);
  }

  function createSlider( minValue, maxValue, defaultValue, i) {
    const slider = p.createSlider(minValue, maxValue, defaultValue); // the speed of the central sine
    slider.position(SLIDER_MARGIN, getSliderY(i));
    slider.style('width', SLIDER_WIDTH + 'px');
    return slider;
  }

  return allSliders;
}


function getSliderY(i) {
  return UI_PANEL_Y + i * SLIDER_HEIGHT;
}


