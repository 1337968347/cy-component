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

export const now = () => {
  return Date.now();
};

export const getActivatableTarget = (ev: any): any => {
  if (ev.composedPath) {
    const path = ev.composedPath() as HTMLElement[];
    for (let i = 0; i < path.length - 2; i++) {
      const el = path[i];
      if (el.classList && el.classList.contains(activateClass)) {
        return el;
      }
    }
  } else {
    return ev.target.closest('.' + activateClass);
  }
};

// 源码 可以看这里
// https://github.com/ionic-team/ionic-framework/blob/master/core/src/utils/tap-click.ts
// https://github.com/ionic-team/ionic-framework/blob/master/core/src/components/ripple-effect/ripple-effect.tsx#L32
export const startTapClick = () => {
  let lastTouch = -MOUSE_WAIT * 10;
  // 当前活动的元素
  let activatableEle;
  // 移除涟漪效果的promise
  let activeRipple;

  // Touch Events
  const onTouchStart = ev => {
    lastTouch = now();
    pointerDown(ev);
  };

  const onMouseDown = ev => {
    const t = now() - MOUSE_WAIT;
    if (lastTouch < t) {
      pointerDown(ev);
    }
  };

  const onTouchEnd = ev => {
    lastTouch = now();
    pointerUp(ev);
  };

  const onMouseUp = ev => {
    const t = now() - MOUSE_WAIT;
    if (lastTouch < t) {
      pointerUp(ev);
    }
  };

  const pointerUp = ev => {
    setActivatedElement(undefined, ev);
  };

  const pointerDown = ev => {
    setActivatedElement(getActivatableTarget(ev), ev);
  };

  const setActivatedElement = (el: HTMLElement, ev) => {
    // 是当前活动的元素
    if (el && el === activatableEle) {
      return;
    }

    const { x, y } = pointerCoord(ev);
    // 如果当前有活动的元素。需要取消活动效果进行重新渲染
    if (activatableEle) {
      removeActivated();
    }

    if (el) {
      const rippleEl = getRippleEffect(el);
      if (rippleEl) {
        activeRipple = addRipple(rippleEl, x, y);
      }
    }
    activatableEle = el;
  };

  const addRipple = (el, x, y) => {
    return new Promise(resolve => {
      const type = el.getAttribute('data-type') === 'unbounded' ? 'unbounded' : 'bounded';
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const hypotenuse = Math.sqrt(width * width + height * height);
      const maxDim = Math.max(height, width);
      const maxRadius = type === 'unbounded' ? maxDim : hypotenuse + PADDING;
      const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
      const finalScale = maxRadius / initialSize;
      let posX = x - rect.left;
      let posY = y - rect.top;
      if (type === 'unbounded') {
        posX = width * 0.5;
        posY = height * 0.5;
      }
      const styleX = posX - initialSize * 0.5;
      const styleY = posY - initialSize * 0.5;
      const moveX = width * 0.5 - posX;
      const moveY = height * 0.5 - posY;

      requestAnimationFrame(() => {
        const div = document.createElement('div');
        div.classList.add('ripple-effect-inner');
        const style = div.style;
        style.top = styleY + 'px';
        style.left = styleX + 'px';
        style.width = style.height = initialSize + 'px';
        if (type === 'unbounded') {
          style.borderRadius = '50%';
        }
        style.setProperty('--final-scale', `${finalScale}`);
        style.setProperty('--translate-end', `${moveX}px, ${moveY}px`);
        const container = el.shadowRoot || el;
        container.appendChild(div);

        setTimeout(() => {
          resolve(() => {
            removeRippleEl(div);
          });
        }, 225 + 100);
      });
    });
  };

  const removeActivated = () => {
    removeRipple();
  };

  // 执行移除元素的方法
  const removeRipple = () => {
    if (activeRipple !== undefined) {
      activeRipple.then(remove => remove());
      activeRipple = undefined;
    }
  };
  const getRippleEffect = (el: HTMLElement) => {
    if (el.shadowRoot) {
      const ripple = el.shadowRoot.querySelector('cy-ripple');
      if (ripple) {
        return ripple;
      }
    }
    return el.querySelector('cy-ripple');
  };

  // 移除元素
  const removeRippleEl = ripple => {
    ripple.classList.add(fideClass);
    setTimeout(() => {
      ripple.remove();
    }, 200);
  };

  document.addEventListener('touchstart', onTouchStart, true);
  document.addEventListener('touchcancel', onTouchEnd, true);
  document.addEventListener('touchend', onTouchEnd, true);

  document.addEventListener('mousedown', onMouseDown, true);
  document.addEventListener('mouseup', onMouseUp, true);
};

// 效果参数
const PADDING = 10;
const INITIAL_ORIGIN_SCALE = 0.4;
const MOUSE_WAIT = 2500;

// fade-out 与uniapp的样式类冲突
const fideClass = 'fade-out';
const activateClass = 'activatable';
