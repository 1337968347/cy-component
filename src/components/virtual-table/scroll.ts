import { DimensionType } from './interface';

interface ScrollHook {
  beforeScroll: (e: ScrollData) => void;
  afterScroll: (e: ScrollData) => void;
}

type PreviousScroll = {
  [propName in DimensionType]?: number;
};

interface ScrollData {
  dimension: DimensionType;
  coordinate: number;
}

export const createScrollService = ({ beforeScroll, afterScroll }: ScrollHook, scrollThrottle: number = 30) => {
  const previousScroll: PreviousScroll = { rows: 0, cols: 0 };

  let scrollThrottling = new Date().getTime();

  const scroll = (dimension: DimensionType, offset: number) => {
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
  };

  return {
    scroll,
  };
};
