import { DimensionType } from './interface';

interface ScrollHook {
  beforeScroll: (e: ScrollData) => void;
  afterScroll: (e: ScrollData) => void;
}

type DimensionMap<T> = {
  [propName in DimensionType]?: T;
};

interface ScrollData {
  dimension: DimensionType;
  coordinate: number;
}

export const createScrollService = ({ beforeScroll, afterScroll }: ScrollHook, scrollThrottle: number = 30) => {
  const previousScroll: DimensionMap<number> = { rows: 0, cols: 0 };
  const preventArtificialScroll: DimensionMap<null | number> = { rows: null, cols: 0 };

  let scrollThrottling = new Date().getTime();

  const scroll = (dimension: DimensionType, offset: number) => {
    cancelScroll(dimension);
    const change = new Date().getTime() + scrollThrottle;
    if (change < scrollThrottling) {
      return;
    }

    if (previousScroll[dimension] === offset) {
      return;
    }
    previousScroll[dimension] = offset;

    beforeScroll({
      dimension: dimension,
      coordinate: offset,
    });
    setScroll(dimension, offset);
  };

  const setScroll = (dimension: DimensionType, offset: number) => {
    cancelScroll(dimension);

    preventArtificialScroll[dimension] = requestAnimationFrame(() => {
      preventArtificialScroll[dimension] = null;
      afterScroll({ dimension, coordinate: offset });
    });
  };

  const cancelScroll = (dimension: DimensionType) => {
    if (typeof preventArtificialScroll[dimension] === 'number') {
      cancelAnimationFrame(preventArtificialScroll[dimension]);
      preventArtificialScroll[dimension] = null;
    }
  };

  return {
    scroll,
  };
};
