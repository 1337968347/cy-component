const createCanvasCtx = (canvasEl: HTMLCanvasElement) => {
  const ctx = canvasEl.getContext('2d');
  let _ctxOper;

  ctx.beginPath();
  ctx.lineWidth = 3;

  //   ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false)

  const renderLike = () => {
    ctx.beginPath();

    const pCtx = new Path2D();
    pCtx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    pCtx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    pCtx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    pCtx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    pCtx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    pCtx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.fillStyle = 'red';
    ctx.fill(pCtx);

    return _ctxOper;
  };

  const renderPalette = () => {
    ctx.save();
    ctx.translate(220, 0);
    for (var i = 0; i < 36; i++) {
      for (var j = 0; j < 36; j++) {
        ctx.save();
        ctx.fillStyle = 'rgb(' + Math.floor(255 - 7.083 * i) + ',' + Math.floor(255 - 7.083 * j) + ',0)';
        ctx.translate(j * 6, i * 6);
        ctx.fillRect(0, 0, 6, 6);
        ctx.restore();
      }
    }
    ctx.restore();
    return _ctxOper;
  };

  const renderCircle = () => {
    ctx.save();
    ctx.translate(0, 150);
    for (var i = 0; i < 36; i++) {
      for (var j = 0; j < 36; j++) {
        ctx.save();
        ctx.fillStyle = 'rgb(' + Math.floor(255 - 7.083 * i) + ',' + Math.floor(255 - 7.083 * j) + ',0)';
        ctx.beginPath();
        ctx.translate(j * 6, i * 6);
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    ctx.restore();
    return _ctxOper;
  };

  const renderDottedLine = () => {
    let offset = 0;
    const draw = () => {
      ctx.clearRect(265, 265, 110, 110);
      ctx.setLineDash([20, 20]);
      ctx.lineDashOffset = offset;
      ctx.strokeRect(270, 270, 100, 100);
    };

    const task = () => {
      draw();

      requestAnimationFrame(() => {
        offset++;
        if (offset > 40) {
          offset = 0;
        }
        task();
      });
    };

    task();

    return _ctxOper;
  };

  const renderGradient = () => {
    const lingrad = ctx.createLinearGradient(500, 50, 700, 50);
    lingrad.addColorStop(0, '#00ABEB');
    lingrad.addColorStop(0.5, '#fff');
    lingrad.addColorStop(0.5, '#26C000');
    lingrad.addColorStop(1, '#fff');

    ctx.fillStyle = lingrad;
    ctx.fillRect(500, 50, 200, 50);

    // 创建渐变
    var radgrad = ctx.createRadialGradient(545, 145, 10, 552, 150, 30);
    radgrad.addColorStop(0, '#A7D30C');
    radgrad.addColorStop(0.9, '#019F62');
    radgrad.addColorStop(1, 'rgba(1,159,98,0)');
    ctx.fillStyle = radgrad;
    ctx.fillRect(500, 100, 150, 150);

    return _ctxOper;
  };

  const renderImage = () => {
    const imageEl = document.createElement('img');
    imageEl.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
    imageEl.onload = () => {
      const ptrn = ctx.createPattern(imageEl, 'repeat');
      ctx.fillStyle = ptrn;
      ctx.fillRect(600, 150, 150, 150);
    };
    return _ctxOper;
  };

  const renderTitle = () => {
    ctx.fillStyle = 'red';
    ctx.font = '20px Times New Roman';
    ctx.fillText('渐变', 550, 30);
    return _ctxOper;
  };

  const renderRotate = () => {
    ctx.save();
    ctx.translate(500, 300);
    for (let i = 0; i < 6; i++) {
      ctx.save();
      ctx.fillStyle = `rgba(${51 * i},${255 - 51 * i},255)`;
      for (let j = 0; j < i * 6; j++) {
        ctx.rotate((Math.PI * 2) / (i * 6));
        ctx.beginPath();
        ctx.arc(0, i * 12.5, 5, 0, Math.PI * 2, true);
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.restore();
    return _ctxOper;
  };

  const renderStars = () => {
    ctx.save();
    ctx.translate(0, 400);
    ctx.fillStyle = '#232256';
    ctx.fillRect(0, 0, 800, 300);

    const renderStar = (r: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(r, 0);
      for (var i = 0; i < 9; i++) {
        ctx.rotate(Math.PI / 5);
        if (i % 2 == 0) {
          ctx.lineTo((r / 0.525731) * 0.200811, 0);
        } else {
          ctx.lineTo(r, 0);
        }
      }

      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    for (let i = 0; i < 200; i++) {
      ctx.save();
      ctx.fillStyle = '#fff';
      ctx.translate( Math.floor(Math.random() * 800), Math.floor(Math.random() * 300));
      renderStar(Math.floor(Math.random() * 6) + 3);
      ctx.restore();
    }

    ctx.restore();
  };

  return (_ctxOper = {
    renderLike,
    renderPalette,
    renderCircle,
    renderDottedLine,
    renderGradient,
    renderImage,
    renderTitle,
    renderRotate,
    renderStars,
    ctx,
  });
};

export default createCanvasCtx;
