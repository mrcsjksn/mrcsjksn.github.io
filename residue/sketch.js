var firstOpened = true;
var playing = false;

var osc;
var osc2;
var hiosc;
var hiamp = 0;

var freq1, freq2, hifreq;
var rand = 400;
var base = 300;
let phase;
let shift = 5; //change this to find register

let env;
let col;
let to;
let from;

let filter, filterFreq, filterWidth;

let midiNotes = [60, 62, 58, 60, 62, 60, 63, 60, 60, 56, 55, 58, 65, 63, 60, 62, 58, 60, 62, 60, 63, 60, 60, 56, 55, 58, 65, 63];
let hioscNote = [67, 67, 65, 67, 67, 67, 63, 62, 67, 67, 67]
let noteIndex = 0;
let hiNoteIndex = 0;
let midiVal, freq;

var t = 0;

var noSleep = new NoSleep(); // noSleep function
var wakeLockEnabled = false;
// var toggleEl = document.querySelector("#toggle");

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  to = color(255, 232, 232);
  from = color(0, 0, 0);

  osc = new p5.Oscillator();
  osc2 = new p5.Oscillator();
  hiosc = new p5.Oscillator();
  noise = new p5.Noise();
  filter = new p5.BandPass();

  noise.disconnect();
  filter.process(noise);

  noise.amp(0.2);

  freq1 = midiToFreq(shift + midiNotes[0]);
  freq2 = midiToFreq(shift + midiNotes[0]);

  env = new p5.Envelope();
  env.setADSR(0.01, 0.5, 0.1, 0.5);

  // set attackLevel, releaseLevel
  env.setRange(1, 1);
  phase = map(4 + random(10), 4, 14, 0.025, 0.005);
  hiosc.amp(0);
}

function draw() {
  background(lerpColor(from, to, map(sin(t), -1, 1, 0, 1)));
  if (firstOpened === false) {
    osc.freq(freq1);
    osc.amp(0.3);
    osc2.freq((freq2 - 3) + random(6));
    osc2.amp(0.1);
  }
  filterFreq = midiToFreq(48 + shift);
  filterWidth = map(sin(t), -1, 1, 5, 2);
  filter.set(filterFreq, filterWidth);
  if (millis() > (2 * 60 * 1000)) {
    hifreq = midiToFreq(hioscNote[hiNoteIndex % hioscNote.length] + shift + 24);
    hiosc.freq(hifreq);
    hiamp = map(sin(t * -1), -1, 1, 0, 0.01);
    hiosc.amp(hiamp);
    if (hiamp < 0.001) {
      hiNoteIndex++;
      //console.log("trigger");
    }
    if (millis() > (4 * 60 * 1000)) {
      hiosc.stop();
      osc.amp(0);
      osc2.amp(0);
      osc.stop();
      osc2.stop();
    }
  }

  t += phase;
  //noSleep

  // end noSleep
}

function mouseClicked() {
  if (firstOpened === true) {
    firstOpened = false;
    toggleSound();
    freq1 = midiToFreq(midiNotes[0] + shift);
    freq2 = midiToFreq(midiNotes[0] + shift);
    //freq1 = base + random(100);
    console.log(freqToMidi(freq1));
    //freq2 = base + random(10);
    console.log(freqToMidi(freq2));
  } else {
    midiVal = midiNotes[noteIndex % midiNotes.length] + shift;
    base = midiToFreq(midiVal);
    //phase = map(4 + random(10), 4, 14, 0.025, 0.005);
    freq1 = base;
    freq2 = midiToFreq(shift + midiNotes[abs((noteIndex - 2)) % (midiNotes.length - round(random(2, 8)))]);
    console.log(freqToMidi(freq1), freqToMidi(freq2), noteIndex);
    noteIndex++;

  }
  if (millis() > 60000) {
    noSleep.disable(); // let the screen turn off.
    wakeLockEnabled = false;
    console.log("WL disabled");
  }
}

function toggleSound() {
  if (playing === false) {
    osc.start();
    osc2.start();
    hiosc.start();
    noise.start();
    playing = true;
    noSleep.enable(); // keep the screen on!
    wakeLockEnabled = true;
    console.log("WL enabled");
    //button.html("Stop");
  } else {
    osc.stop();
    osc2.stop();
    playing = false;
    //button.html("Play");
  }
}