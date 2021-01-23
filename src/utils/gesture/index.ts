import { createPointerEvents } from './pointer-events';
import { createPanRecognizer } from './recognizers';
export interface GestureDetail {
  type: string;
  startX: number;
  startY: number;
  startTime: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  currentTime: number;
  event: UIEvent;
  data?: any;
}
export type GestureCallback = (detail: GestureDetail) => boolean | void;
export interface GestureConfig {
  el: Node;

  direction?: 'x' | 'y';
  passive?: boolean;
  maxAngle?: number;
  threshold?: number;
  blurOnStart?: boolean;

  canStart?: GestureCallback;
  onWillStart?: (_: GestureDetail) => Promise<void>;
  onStart?: GestureCallback;
  onMove?: GestureCallback;
  onEnd?: GestureCallback;
}

export interface Gesture {
  enable(enable?: boolean): void;
  destroy(): void;
}

export const createGesture = (config: GestureConfig): Gesture => {
  let hasCapturedPan = false;
  let hasStartedPan = false;
  let hasFiredStart = false;
  let hasFiredEnd = false;

  const finalConfig: GestureConfig = {
    direction: 'x',
    passive: true,
    maxAngle: 40,
    threshold: 10,

    ...config,
  };

  const detail: GestureDetail = {
    type: 'pan',
    startX: 0,
    startY: 0,
    startTime: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    currentTime: 0,
    event: undefined,
    data: undefined,
  };

  const canStart = finalConfig.canStart;
  const onWillStart = finalConfig.onWillStart;
  const onStart = finalConfig.onStart;
  const onMove = finalConfig.onMove;
  const onEnd = finalConfig.onEnd;
  const passive = finalConfig.passive;
  const blurOnStart = finalConfig.blurOnStart;
  const threshold = finalConfig.threshold;

  const pan = createPanRecognizer(finalConfig.direction, finalConfig.threshold, finalConfig.maxAngle);

  const pointerDown = (ev: UIEvent): boolean => {
    if (hasStartedPan) {
      return false;
    }
    hasStartedPan = true;
    hasFiredEnd = false;
    const timeStamp = Date.now();
    updateDetail(ev, detail);

    detail.startTime = timeStamp;
    detail.currentTime = timeStamp;
    detail.startX = detail.currentX;
    detail.startY = detail.currentY;
    detail.event = ev;
    if (canStart && canStart(detail) === false) {
      reset();
      return false;
    }
    if (threshold === 0) {
      return tryToCapturePan();
    }
    pan.start(detail.startX, detail.startY);

    return true;
  };
  const pointerMove = (ev: UIEvent) => {
    if (hasCapturedPan) {
      calcGestureData(detail, ev);
      requestAnimationFrame(() => {
        if (hasFiredEnd) {
          return;
        }
        if (onMove) {
          onMove(detail);
        }
      });
      return;
    }

    calcGestureData(detail, ev);
    if (pan.detect(detail.currentX, detail.currentY)) {
      if (pan.isGesture()) {
        tryToCapturePan();
      }
    }
  };
  const pointerUp = (ev: UIEvent | undefined) => {
    const tempHasFiredStart = hasFiredStart;
    const tempHasCapturedPan = hasCapturedPan;
    hasFiredEnd = true;
    reset();

    if (!tempHasFiredStart) {
      return;
    }
    calcGestureData(detail, ev);
    if (tempHasCapturedPan) {
      if (onEnd) {
        onEnd(detail);
      }
    }
  };

  const tryToCapturePan = () => {
    hasCapturedPan = true;

    detail.startX = detail.currentX;
    detail.startY = detail.currentY;
    detail.startTime = detail.currentTime;

    if (onWillStart) {
      onWillStart(detail).then(() => {
        fireOnStart();
      });
    } else {
      fireOnStart();
    }
    return true;
  };

  const fireOnStart = () => {
    hasFiredStart = true;
    if (blurOnStart) {
      blurActiveElement();
    }
    if (onStart) {
      onStart(detail);
    }
  };

  const reset = () => {
    hasCapturedPan = false;
    hasStartedPan = false;
    hasFiredStart = false;
  };

  const pointerEvents = createPointerEvents(finalConfig.el, pointerDown, pointerMove, pointerUp, {
    passive: passive,
    capture: false,
  });

  return {
    enable: (enable = true) => {
      if (!enable) {
        reset();
        if (hasCapturedPan) {
          pointerUp(undefined);
        }
      }
      pointerEvents.enable(enable);
    },
    destroy: () => {},
  };
};

const blurActiveElement = () => {
  if (typeof document !== 'undefined') {
    const activateElement = document.activeElement as HTMLElement;
    if (!activateElement && activateElement.blur) {
      activateElement.blur();
    }
  }
};

const calcGestureData = (detail: GestureDetail, ev: UIEvent | undefined) => {
  if (!ev) {
    return;
  }
  updateDetail(ev, detail);

  const currentX = detail.currentX;
  const currentY = detail.currentY;

  detail.deltaX = currentX - detail.startX;
  detail.deltaY = currentY - detail.startY;
  detail.event = ev;
};

const updateDetail = (ev: any, detail: GestureDetail) => {
  let x = 0;
  let y = 0;
  if (ev) {
    const changedTouches = ev.changedTouches;
    if (changedTouches && changedTouches.length > 0) {
      const touch = changedTouches[0];
      x = touch.clientX;
      y = touch.clientY;
    } else if (ev.pageX !== undefined) {
      x = ev.pageX;
      y = ev.pageY;
    }
  }
  detail.currentX = x;
  detail.currentY = y;
};
