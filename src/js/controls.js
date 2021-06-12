const SLIDER_MARGIN = 10;
const SLIDER_WIDTH = 150;
const SLIDER_HEIGHT = 20;

const UI_PANEL_X = SLIDER_MARGIN;
const UI_PANEL_Y = 30;

export default function createSliders(p) {

  const allSliders = {
    speedSlider: createSlider(p, 0, 1000, 100, 0),
    numSinesSlider: createSlider(p, 1, 20, 2, 1),
    speedRatioSlider: createSlider(p, 0, 100, 0, 2),
  };

  allSliders.drawSliderLabels = function() {
    const textX = 2 * SLIDER_MARGIN + SLIDER_WIDTH;
    p.text('speed',textX, getSliderY(0)  - 12);
    p.text('num Sines',textX, getSliderY(1) - 12 );
    p.text('speed ratio',textX, getSliderY(2) - 12);
  }

  return allSliders;
}


function createSlider(p, minValue, maxValue, defaultValue, i) {
  const slider = p.createSlider(minValue, maxValue, defaultValue); // the speed of the central sine
  slider.position(SLIDER_MARGIN, getSliderY(i));
  slider.style('width', SLIDER_WIDTH + 'px');
  return slider;
}

function getSliderY(i) {
  return UI_PANEL_Y + i * SLIDER_HEIGHT;
}


