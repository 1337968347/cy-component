interface VituralOption {
  rowDatas: any[];
  defaultHeight: number;
  rootEl: HTMLElement;
}

export const createVirtualScanner = ({ rowDatas = [], defaultHeight = 30, rootEl }: VituralOption) => {
  const rowDataLen = rowDatas.length;
  const totalHeight = rowDataLen * defaultHeight;
  const RootElement = rootEl;

  const getTotalHeight = () => {
    return totalHeight;
  };

  return {
    getTotalHeight,
  };
};
