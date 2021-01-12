export interface PanRecognizer {
    start(x: number, y: number): void;
    detect(x: number, y: number): boolean;
    isGesture(): boolean;
    getDirection(): number;
  }
  
  export const createPanRecognizer = (direction: string, thresh: number, maxAngle: number): PanRecognizer => {
    const radians = maxAngle * (Math.PI / 180);
    const isDirX = direction === 'x';
    const maxCosine = Math.cos(radians);
    const threshold = thresh * thresh;
  
    let startX = 0;
    let startY = 0;
  
    let dirty = false;
    let isPan = 0;
    // 1 下拉或者右滑
    // -1 上拉或者左滑
    return {
      start(x: number, y: number) {
        startX = x;
        startY = y;
        isPan = 0;
        dirty = true;
      },
      detect(x: number, y: number): boolean {
        if (!dirty) {
          return false;
        }
  
        const deltaX = x - startX;
        const deltaY = y - startY;
        const distance = deltaX * deltaX + deltaY * deltaY;
  
        // 判断是否滑动足够距离
        if (distance < threshold) {
          return false;
        }
        const hypotenuse = Math.sqrt(distance);
        const cosine = (isDirX ? deltaX : deltaY) / hypotenuse;
        // 滑动的角度是否有偏离
        // 余弦值越大。 说明角度越小
        if (cosine > maxCosine) {
          isPan = 1;
        } else if (cosine < -maxCosine) {
          isPan = -1;
        } else {
          isPan = 0;
        }
  
        dirty = false;
        return true;
      },
  
      isGesture(): boolean {
        return isPan !== 0;
      },
  
      getDirection(): number {
        return isPan;
      },
    };
  };
  