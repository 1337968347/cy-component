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
  console.log(config);
  return { enable: () => {}, destroy: () => {} };
};
