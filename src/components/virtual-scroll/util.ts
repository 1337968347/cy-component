interface VituralOption {
  rowDatas: any[];
  defaultHeight: number;
}

export const createVirtualScanner = ({ rowDatas = [], defaultHeight = 30 }: VituralOption) => {
  const rowDataLen = rowDatas.length;
  const totalHeight = rowDataLen * defaultHeight;

  const getTotalHeight = () => {
    return totalHeight;
  };

  return {
    getTotalHeight,
  };
};
