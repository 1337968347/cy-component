import { VituralOption, RenderCellData } from './interface';

export const createDataParse = ({ rowDatas = [], defaultHeight = 30, rootEl }: VituralOption) => {
  const rowDataLen = rowDatas.length;
  const totalHeight = rowDataLen * defaultHeight;
  const RootElement = rootEl;

  const getTotalHeight = () => {
    return totalHeight;
  };

  const getViewportData = (scrollX: number, scrollY: number) => {
    const startI = Math.floor(scrollY / defaultHeight - 1);
    const viewportHeight = RootElement.clientHeight;
  };

  return {
    getTotalHeight,
  };
};
