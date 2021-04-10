type Direction = 0 | 90 | 180 | 240;
export const createRetroSnaker = (canvasEl: HTMLCanvasElement, canvasBgEl: HTMLCanvasElement, cSize: number) => {
  const ctx = canvasEl.getContext('2d');
  const ctxBg = canvasBgEl.getContext('2d');
  const cellSize = cSize;
  let gameX, gameY, cWidth, cHeight;
  let snake = createSnake(ctx, cellSize, gameX, gameY);
  let gameMainTimerId;

  const initCanvasSize = () => {
    gameX = Math.floor(canvasEl.width / cellSize);
    gameY = Math.floor(canvasEl.height / cellSize);
    canvasEl.width = gameX * cellSize;
    canvasEl.height = gameY * cellSize;
    cWidth = canvasEl.width;
    cHeight = canvasEl.height;
    canvasBgEl.width = cWidth;
    canvasBgEl.height = cHeight;
  };

  const renderGird = () => {
    ctxBg.strokeStyle = '#cccccc';
    ctxBg.lineWidth = 1;
    for (let i = 0; i <= gameX; i++) {
      ctxBg.beginPath();
      ctxBg.moveTo(i * cellSize, 0);
      ctxBg.lineTo(i * cellSize, cHeight);
      ctxBg.stroke();
    }
    for (let i = 0; i <= gameY; i++) {
      ctxBg.beginPath();
      ctxBg.moveTo(0, i * cellSize);
      ctxBg.lineTo(cWidth, i * cellSize);
      ctxBg.stroke();
    }
    ctx.restore();
  };

  const start = (speed: number) => {
    clearInterval(gameMainTimerId);
    gameMainTimerId = setInterval(() => {
      draw();
    }, speed);
  };

  const destory = () => {
    ctx.clearRect(0, 0, cWidth, cHeight);
    clearInterval(gameMainTimerId);
    gameMainTimerId = undefined;
    snake = createSnake(ctx, cellSize, gameX, gameY);
  };

  const pause = () => {
    clearInterval(gameMainTimerId);
    gameMainTimerId = undefined;
  };

  const turn = (direction: Direction) => {
    if (gameMainTimerId === undefined) return;
    snake.turn(direction);
  };

  const draw = () => {
    ctx.clearRect(0, 0, cWidth, cHeight);
    snake.move();
    snake.attemptEat();
    snake.draw();
  };

  initCanvasSize();
  renderGird();

  return { start, turn, pause, destory };
};

const createSnake = (ctx: CanvasRenderingContext2D, cellSize: number, gameX: number, gameY: number) => {
  const sBody = [
    [10, 8],
    [9, 8],
    [8, 8],
  ];
  let eatPoint = [Math.floor(Math.random() * gameX), Math.floor(Math.random() * gameY)];

  //   移动方向
  let moveDirection: Direction = 90;

  const attemptEat = () => {
    const headSnake = sBody[0];
    if (eatPoint[0] === headSnake[0] && eatPoint[1] === headSnake[1]) {
      sBody.push([]);
      eatPoint = [Math.floor(Math.random() * gameX), Math.floor(Math.random() * gameY)];
    }
  };

  const move = () => {
    const headNow = [...sBody[0]];
    let headNew;
    switch (moveDirection) {
      case 90:
        headNew = [headNow[0] + 1, headNow[1]];
        break;
      case 240:
        headNew = [headNow[0] - 1, headNow[1]];
        break;
      case 0:
        headNew = [headNow[0], headNow[1] - 1];
        break;
      case 180:
        headNew = [headNow[0], headNow[1] + 1];
        break;
      default:
        break;
    }
    if (headNew[0] > gameX - 1) {
      headNew[0] = 0;
    }
    if (headNew[1] > gameY - 1) {
      headNew[1] = 0;
    }

    if (headNew[0] < 0) {
      headNew[0] = gameX - 1;
    }
    if (headNew[1] < 0) {
      headNew[1] = gameY - 1;
    }
    sBody.unshift(headNew);

    sBody.pop();
  };

  const turn = (direction: Direction) => {
    if (direction === moveDirection) {
      return;
    }
    if (direction + moveDirection === 180 || direction + moveDirection === 330) {
      return;
    }
    moveDirection = direction;
  };

  const draw = () => {
    ctx.save();

    ctx.fillStyle = 'grey';
    ctx.fillRect(eatPoint[0] * cellSize, eatPoint[1] * cellSize, cellSize, cellSize);

    sBody.map((item, index) => {
      if (item[0] === undefined) {
        return;
      }
      if (index === 0) {
        ctx.fillStyle = 'red';
      } else {
        ctx.fillStyle = '#333333';
      }
      ctx.beginPath();
      ctx.arc((item[0] + 0.5) * cellSize, (item[1] + 0.5) * cellSize, cellSize / 2, 0, 2 * Math.PI, false);
      ctx.fill();
    });

    ctx.restore();
  };

  return { draw, move, turn, attemptEat };
};
