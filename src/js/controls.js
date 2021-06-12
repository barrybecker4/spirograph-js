const SLIDER_MARGIN = 10;
const SLIDER_WIDTH = 150;
const SLIDER_HEIGHT = 20;

const UI_PANEL_X = SLIDER_MARGIN;
const UI_PANEL_Y = 30;
const TEXT_Y_OFFSET = -12;

export default function createSliders(p) {

  const allSliders = {
    speedSlider: createSlider( 0, 1000, 100, 0),
    numSinesSlider: createSlider( 1, 20, 2, 1),
    speedRatioSlider: createSlider( 0, 100, 0, 2),
    radScaleSlider: createSlider( 1, 200, 100, 3),
  };

  allSliders.drawSliderLabels = function() {
    const textX = 2 * SLIDER_MARGIN + SLIDER_WIDTH;
    p.text('speed',textX, getSliderY(0) + TEXT_Y_OFFSET);
    p.text('num Sines',textX, getSliderY(1) + TEXT_Y_OFFSET);
    p.text('speed ratio',textX, getSliderY(2) + TEXT_Y_OFFSET);
    p.text('radius scale',textX, getSliderY(3) + TEXT_Y_OFFSET);
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


