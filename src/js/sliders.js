
const SLIDER_MARGIN = 10;
const SLIDER_WIDTH = 150;

export default function createSliders(p) {

  const allSliders = {};

  const fundSlider = p.createSlider(0, 1000, 100); // the speed of the central sine
  fundSlider.position(SLIDER_MARGIN, 30);
  fundSlider.style('width', SLIDER_WIDTH + 'px');
  allSliders.fundSlider = fundSlider;

  const numSinesSlider = p.createSlider(1, 20, 2);
  numSinesSlider.position(SLIDER_MARGIN, 50);
  numSinesSlider.style('width', SLIDER_WIDTH + 'px');
  allSliders.numSinesSlider = numSinesSlider;

  const ratioSlider = p.createSlider(0, 100, 0); // what multiplier for speed is each additional sine?
  ratioSlider.position(SLIDER_MARGIN, 70);
  ratioSlider.style('width', SLIDER_WIDTH + 'px');
  allSliders.ratioSlider = ratioSlider;

  allSliders.drawSliderLabels = function() {
    const textX = 2 * SLIDER_MARGIN + SLIDER_WIDTH;
    p.text('fund',textX, 18);
    p.text('numSines',textX, 37);
    p.text('ratio',textX, 58);
  }

  return allSliders;
}

