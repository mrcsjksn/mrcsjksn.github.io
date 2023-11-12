var firstOpened = true;
var playing = false;

var osc;
var osc2;

var freq1, freq2;
var rand = 400;
var base = 300; 
let phase;
let shift = 5; //change this to find register

let env;
let col;
let to;
let from;

let midiNotes = [60, 62, 58, 60, 62, 60, 63, 60, 60, 56, 55, 58, 65, 63, 60, 62, 58, 60, 62, 60, 63, 60, 60, 56, 55, 58, 65, 63];
let noteIndex = 0;
let midiVal, freq;

var t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  to = color(255, 232, 232);
  from = color(0, 0, 0);

  osc = new p5.Oscillator();
  osc2 = new p5.Oscillator();

  freq1 = midiToFreq(shift+midiNotes[0]);
  freq2 = midiToFreq(shift+midiNotes[0]-12);

  env = new p5.Envelope();
  env.setADSR(0.01, 0.5, 0.1, 0.5);

  // set attackLevel, releaseLevel
  env.setRange(1, 1);
  phase = map(4 + random(10), 4, 14, 0.025, 0.005);
}

function draw() {
  background(lerpColor(from, to, map(sin(t), -1, 1, 0, 1)));
  if (firstOpened === false) {
    osc.freq(freq1);
    osc.amp(0.3);
    osc2.freq((freq2-3)+random(6));
    osc2.amp(0.1);
  }
  t += phase;
}

function mouseClicked() {
  if (firstOpened === true) {
    firstOpened = false;
    toggleSound();
    freq1 = midiToFreq(midiNotes[0]+shift);
    freq2 = midiToFreq(midiNotes[0]-12+shift);
    //freq1 = base + random(100);
    console.log(freqToMidi(freq1));
    //freq2 = base + random(10);
    console.log(freqToMidi(freq2));
  } else {
    midiVal = midiNotes[noteIndex % midiNotes.length]+shift;
    base = midiToFreq(midiVal);
    phase = map(4 + random(10), 4, 14, 0.03, 0.005);
    freq1 = base;
    freq2 = midiToFreq(shift+midiNotes[abs((noteIndex-2)) % (midiNotes.length - round(random(1, 5)))]);
    console.log(freqToMidi(freq1), freqToMidi(freq2), noteIndex);
        noteIndex++;

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