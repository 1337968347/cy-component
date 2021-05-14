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

export const createScrollService = ({ beforeScroll, afterScroll }: ScrollHook, scrollThrottle: number = 3000) => {
  const previousScroll: DimensionMap<number> = { rows: 0, cols: 0 };
  const preventArtificialScroll: DimensionMap<null | number> = { rows: null, cols: 0 };

  let laseScrollTime = new Date().getTime();

  const scroll = (dimension: DimensionType, offset: number) => {
    cancelScroll(dimension);
    const scrollTime = laseScrollTime + scrollThrottle;
    const now = new Date().getTime();
    if (now < scrollTime) {
      return;
    }
    laseScrollTime = new Date().getTime();

    if (previousScroll[dimension] === offset) {
      return;
    }
    previousScroll[dimension] = offset;

    beforeScroll({
      dimension: dimension,
      coordinate: offset,
    });
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
    setScroll,
  };
};

export const createGirdScrollService = () => {
  const elements: { [propsName: string]: HTMLElement[] } = {};

  const setScroll = (dimension: DimensionType, offset: number) => {
    for (let key in elements) {
      const els = elements[key];
      els.map((el: any) => {
        el.setScroll(dimension, offset);
      });
    }
  };

  const resignElement = (el: HTMLElement | null, key: string) => {
    if (!elements[key]) {
      elements[key] = [];
    }

    if (el) {
      elements[key].push(el);
    } else if (elements[key]) {
      delete elements[key];
    }
  };

  return {
    resignElement,
    setScroll,
  };
};

export const girdScrollService = createGirdScrollService();
