type Direction = 0 | 90 | 180 | 240;
export const createRetroSnaker = (canvasEl: HTMLCanvasElement) => {
  const ctx = canvasEl.getContext('2d');
  const cWidth = canvasEl.width;
  const cHeight = canvasEl.height;
  const cellSize = 25;
  const snake = createSnake(ctx, cellSize, cWidth, cHeight);

  const renderGird = () => {
    ctx.save();
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    for (let i = 0; i <= cWidth / cellSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, cHeight);
      ctx.stroke();
    }
    for (let i = 0; i <= cHeight / cellSize; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(cWidth, i * cellSize);
      ctx.stroke();
    }
    ctx.restore();
  };

  const draw = () => {
    ctx.clearRect(0, 0, cWidth, cHeight);
    renderGird();
    snake.draw();
  };

  const start = () => {
    setInterval(() => {
      snake.move();
      draw();
    }, 300);
  };

  const turn = (direction: Direction) => {
    snake.turn(direction);
  };

  document.onkeydown = function (ev) {
    switch (ev.code) {
      case 'ArrowDown':
        snake.turn(180);
        break;
      case 'ArrowUp':
        snake.turn(0);
        break;
      case 'ArrowLeft':
        snake.turn(240);
        break;
      case 'ArrowRight':
        snake.turn(90);
        break;
      default:
        break;
    }
  };

  return { start, turn };
};

const createSnake = (ctx: CanvasRenderingContext2D, cellSize: number, canvasWidth: number, canvasHeight: number) => {
  const snakeBody = [
    [100, 4 * cellSize],
    [100 - cellSize, 4 * cellSize],
    [100 - 2 * cellSize, 4 * cellSize],
  ];

  //   移动方向
  let moveDirection: Direction = 90;

  const move = () => {
    const headNow = [...snakeBody[0]];
    let headNew;
    switch (moveDirection) {
      case 90:
        headNew = [headNow[0] + cellSize, headNow[1]];
        break;
      case 240:
        headNew = [headNow[0] - cellSize, headNow[1]];
        break;
      case 0:
        headNew = [headNow[0], headNow[1] - cellSize];
        break;
      case 180:
        headNew = [headNow[0], headNow[1] + cellSize];
        break;
      default:
        break;
    }
    if (headNew[0] > canvasWidth) {
      headNew[0] = 0;
    }
    if (headNew[1] > canvasHeight) {
      headNew[1] = 0;
    }
    
    if (headNew[0] < 0) {
      headNew[0] = canvasWidth;
    }
    if (headNew[1] < 0) {
      headNew[1] = canvasHeight;
    }
    snakeBody.unshift(headNew);
    snakeBody.pop();
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

    snakeBody.map((item, index) => {
      if (index === 0) {
        ctx.fillStyle = 'red';
      } else {
        ctx.fillStyle = '#333333';
      }
      ctx.beginPath();
      ctx.arc(item[0], item[1], cellSize / 2, 0, 2 * Math.PI, false);
      ctx.fill();
    });
    ctx.restore();
  };

  return { draw, move, turn };
};
