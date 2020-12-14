export const pointerCoord = (ev: any): { x: number; y: number } => {
  // get X coordinates for either a mouse click
  // or a touch depending on the given event
  if (ev) {
    const changedTouches = ev.changedTouches;
    if (changedTouches && changedTouches.length > 0) {
      const touch = changedTouches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    if (ev.pageX !== undefined) {
      return { x: ev.pageX, y: ev.pageY };
    }
  }
  return { x: 0, y: 0 };
};

export const now = (ev: UIEvent) => {
  return ev.timeStamp || Date.now();
};

export const debounce = (func: (...args: any[]) => void, wait = 0) => {
  let timer: any;
  return (...args: any[]): any => {
    clearTimeout(timer);
    timer = setTimeout(func, wait, ...args);
  };
};

export const getActivatableTarget = ev => {
  return ev.target.closest('.activatable');
};

export const startTapClick = () => {
  let lastTouch = -MOUSE_WAIT * 10;

  // Touch Events
  const onTouchStart = (ev: TouchEvent) => {
    lastTouch = now(ev);
    pointerDown(ev);
  };

  const onMouseDown = (ev: MouseEvent) => {
    const t = now(ev) - MOUSE_WAIT;
    if (lastTouch < t) {
      pointerDown(ev);
    }
  };

  const pointerDown = (ev: any) => {
    setActivatedElement(getActivatableTarget(ev), ev);
  };
  const setActivatedElement = (el: HTMLElement, ev) => {
    if (!!!el) {
      return;
    }
    const { x, y } = pointerCoord(ev);
    const rippleEl = el.querySelector('.ripple-effect');
    rippleEl &&
      addRipple(rippleEl, x, y).then(removeRipple => {
        removeRipple();
      });
  };
  const addRipple = (el, x, y) => {
    return new Promise<() => void>(resolve => {
      const type = el.getAttribute('data-type') == 'unbounded' ? 'unbounded' : 'bounded';
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const hypotenuse = Math.sqrt(width * width + height * height);
      const maxDim = Math.max(height, width);
      const maxRadius = type == 'unbounded' ? maxDim : hypotenuse + PADDING;
      const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
      const finalScale = maxRadius / initialSize;
      let posX = x - rect.left;
      let posY = y - rect.top;
      if (type == 'unbounded') {
        posX = width * 0.5;
        posY = height * 0.5;
      }
      const styleX = posX - initialSize * 0.5;
      const styleY = posY - initialSize * 0.5;
      const moveX = width * 0.5 - posX;
      const moveY = height * 0.5 - posY;

      // nextTick
      const div = document.createElement('div');
      div.classList.add('ripple-effect-inner');
      const style = div.style;
      style.top = styleY + 'px';
      style.left = styleX + 'px';
      style.width = style.height = initialSize + 'px';
      if (type == 'unbounded') {
        style.borderRadius = '50%';
      }
      style.setProperty('--final-scale', `${finalScale}`);
      style.setProperty('--translate-end', `${moveX}px, ${moveY}px`);

      const container = el.shadowRoot || el;
      container.appendChild(div);
      setTimeout(() => {
        resolve(() => {
          removeRipple(div);
        });
      }, 225 + 100);
    });
  };
  document.addEventListener('mousedown', onMouseDown, true);
  document.addEventListener('touchstart', onTouchStart, true);
};

const removeRipple = (ripple: HTMLElement) => {
  ripple.classList.add('fade-out');
  setTimeout(() => {
    ripple.remove();
  }, 200);
};

const PADDING = 10;
const INITIAL_ORIGIN_SCALE = 0.4;
const MOUSE_WAIT = 2500;
