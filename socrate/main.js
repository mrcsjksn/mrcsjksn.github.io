let t = 0;
let img;
let imgh, imgw, imgr;

function preload() {
  img = loadImage('/open001.png');
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(0);
  imgh = img.height;
  imgw = img.width;
  imgr = imgw / imgh;
  console.log(imgr);
}

function draw() {
  var i = noise(t) * 255;
  background(i);
  if (i < 127) {
    image(img, 0, 0, 0.8 * displayWidth, (1 - (1 / imgr)) * 0.8 * displayHeight);
  }
  t += 0.001;
}