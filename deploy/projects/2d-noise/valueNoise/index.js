const canvasEl = document.querySelector("canvas");
const ctx = canvasEl.getContext("2d");

const makeValueNoise = (w, h) => {
  const getValueTable = (w, h) => {
    const p = new Array(w * w);
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        p[i * w + j] = Math.random();
      }
    }
    return p;
  };

  const valueTable = getValueTable(w, h);

  const fade = (t) => {
    return t * t * t * (t * (t * 6 - 15) + 10);
  };

  const lerp = (u, v, a) => {
    return u * (1 - a) + v * a;
  };

  /**
   *
   * @param {*} u [0,1)
   * @param {*} v [0,1)
   */
  const getUVPixel = (u, v) => {
    const x1 = u * w;
    const y1 = v * h;
    const xInt = ~~x1;
    const yInt = ~~y1;
    const u1 = x1 - xInt;
    const v1 = y1 - yInt;

    const [g1, g2, g3, g4] = [
      [xInt, yInt],
      [xInt + 1, yInt],
      [xInt, yInt + 1],
      [xInt + 1, yInt + 1],
    ].map(([x, y]) => {
      const i = x * w + y;
      return valueTable[i] || 0;
    });
    // https://pic4.zhimg.com/80/v2-a54749b9a5f536968344c88f9e09d95b_720w.jpg

    const u2 = fade(u1);
    const v2 = fade(v1);
    const b = lerp(g1, g2, u2);
    const a = lerp(g3, g4, u2);
    const p = lerp(b, a, v2);
    return p;
  };

  return { getUVPixel };
};

const perlinOper = makeValueNoise(10, 10);

const w = 500;
const h = 500;
canvasEl.width = w;
canvasEl.height = h;

const imageData = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
for (let i = 0; i < w; i++) {
  for (let j = 0; j < h; j++) {
    const p = perlinOper.getUVPixel(i / w, j / h);
    imageData.data[(i * w + j) * 4 + 0] = 0;
    imageData.data[(i * w + j) * 4 + 1] = 0;
    imageData.data[(i * w + j) * 4 + 2] = 0;
    imageData.data[(i * w + j) * 4 + 3] = p * 255;
  }
}
ctx.putImageData(imageData, 0, 0);
