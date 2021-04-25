export const clamp = (min: number, n: number, max: number) => {
  return Math.max(min, Math.min(n, max));
};

export const createThrottleFunc = (throttleLimit: number) => {
  let flag = true;

  const throttleF = (callback: () => void) => {
    if (flag) {
      callback();
      flag = false;
      setTimeout(() => {
        flag = true;
      }, throttleLimit);
    }
  };

  return { throttleF };
};
