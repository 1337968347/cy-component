const canvasEl = document.querySelector("canvas");
const ctx = canvasEl.getContext("2d");

const w = 512;
const h = 512;

canvasEl.width = w;
canvasEl.height = h;


const imageData = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
for (let i = 0; i < w; i++) {
  for (let j = 0; j < h; j++) {
    const a = Math.random() * 0.5 + 0.5;
    imageData.data[(i * w + j) * 4 + 0] = 0;
    imageData.data[(i * w + j) * 4 + 1] = 0;
    imageData.data[(i * w + j) * 4 + 2] = 0;
    imageData.data[(i * w + j) * 4 + 3] = 255 * a;
  }
}
ctx.putImageData(imageData, 0, 0);
