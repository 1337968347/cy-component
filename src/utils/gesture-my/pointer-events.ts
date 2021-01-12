import { addEventListener } from './listener';

const MOUSE_WAIT = 2000;

const getDocument = (node: Node) => {
  return node instanceof Document ? node : node.ownerDocument;
};

export const createPointerEvents = (el: Node, pointerDown: any, pointerMove: any, pointerUp: any, opts: { passage?: boolean; capture?: boolean }) => {
  let lastTouchevent = 0;

  let rmMouseDown: () => void | undefined;
  let rmMouseMove: () => void | undefined;
  let rmMouseUp: () => void | undefined;
  let rmTouchStart: () => void | undefined;
  let rmTouchMove: () => void | undefined;
  let rmTouchEnd: () => void | undefined;
  let rmTouchCancel: () => void | undefined;

  const handleTouchStart = (ev: any) => {
    lastTouchevent = Date.now() + MOUSE_WAIT;
    if (!pointerDown(ev)) {
      return;
    }
    // 处理Move事件
    if (!rmTouchMove && pointerMove) {
      rmTouchMove = addEventListener(el, 'touchmove', pointerMove, opts);
    }
    if (!rmTouchEnd) {
      rmTouchEnd = addEventListener(el, 'touchend', handleTouchEnd, opts);
    }
    if (!rmTouchCancel) {
      rmTouchCancel = addEventListener(el, 'touchcancel', handleTouchEnd, opts);
    }
  };

  const handleMouseDown = (ev: any) => {
    if (Date.now() < lastTouchevent) {
      return;
    }
    if (!pointerDown(ev)) {
      return;
    }
    if (!rmMouseMove && pointerMove) {
      rmMouseMove = addEventListener(getDocument(el), 'mousemove', pointerMove, opts);
    }
    if (!rmMouseUp && pointerUp) {
      rmMouseUp = addEventListener(getDocument(el), 'mouseup', handleMouseUp, opts);
    }
  };

  const handleMouseUp = (ev: any) => {
    stopMouse();
    if (pointerUp) {
      pointerUp(ev);
    }
  };

  const handleTouchEnd = (ev: any) => {
    stopTouch();
    if (pointerUp) {
      pointerUp(ev);
    }
  };

  const stopMouse = () => {
    if (rmMouseMove) {
      rmMouseMove();
    }
    if (rmMouseUp) {
      rmMouseUp();
    }
    rmMouseMove = rmMouseUp = undefined;
  };

  const stopTouch = () => {
    if (rmTouchMove) {
      rmTouchMove();
    }
    if (rmTouchEnd) {
      rmTouchEnd();
    }
    if (rmTouchCancel) {
      rmTouchCancel();
    }
    rmTouchMove = rmTouchEnd = rmTouchCancel = undefined;
  };

  const stop = () => {
    stopMouse();
    stopTouch();
  };

  const enable = (isEnabled = true) => {
    if (!isEnabled) {
      if (rmTouchStart) {
        rmTouchStart();
      }
      if (rmMouseDown) {
        rmMouseDown();
      }
      rmTouchStart = rmMouseDown = undefined;
      stop();
    } else {
      if (!rmTouchStart) {
        rmTouchStart = addEventListener(el, 'touchstart', handleTouchStart, opts);
      }

      if (!rmMouseDown) {
        rmMouseDown = addEventListener(el, 'mousedown', handleMouseDown, opts);
      }
    }
  };

  const destory = () => {
    enable(false);
    pointerDown = pointerMove = pointerUp = undefined;
  };

  return {
    stop,
    destory,
    enable,
  };
};
