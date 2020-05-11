var firstOpened = true;
var playing = false;

var osc;
var osc2;

var freq1, freq2;
var rand = 400;
let phase;

let env;
let col;
let to;
let from;

var t = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(0);
  to = color(255, 232, 232);
  from = color(0, 0, 0);

  osc = new p5.Oscillator();
  osc2 = new p5.Oscillator();

  freq1 = 800 + random(10);
  freq2 = 800 + random(10);

  env = new p5.Envelope();
  env.setADSR(0.001, 0.5, 0.1, 0.5);

  // set attackLevel, releaseLevel
  env.setRange(1, 0);
  phase = map(4 + random(10), 4, 14, 0.025, 0.005);
}

function draw() {
  background(lerpColor(from, to, map(sin(t), -1, 1, 0, 1)));
  if (firstOpened === false) {
    freq1 = rand + random(10);
    freq2 = rand + random(10);
    osc.freq(freq1);
    osc.amp(0.1);
    osc2.freq(freq2);
    osc2.amp(0.1);
  }
  t += phase;
}

function mouseClicked() {
  if (firstOpened === true) {
    firstOpened = false;
    toggleSound();
    freq1 = 800 + random(10);
    freq2 = 800 + random(10);
  } else {
    rand = 400 + random(800);
    phase = map(4 + random(10), 4, 14, 0.03, 0.005);
    console.log(phase);
  }
}

function toggleSound() {
  if (playing === false) {
    osc.start();
    osc2.start();
    playing = true;
    // button.html("Stop");
  } else {
    osc.stop();
    osc2.stop();
    playing = false;
    button.html("Play");
  }
}