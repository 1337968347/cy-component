import { clamp } from '../../utils/helpers';
import { VituralOption, CellData, RowData, DataParse } from './interface';

export const createDataParse = ({ source = [], column = [], defaultWidth = 40, defaultHeight = 30, rootEl }: VituralOption) => {
  const viewportElement = rootEl;

  const positionX = new Array(column.length);
  const positionY = new Array(source.length);
  let vWidth: number = 0;
  let vHeight: number = 0;

  const calcCellsPosition = () => {
    column.map((item, i) => {
      if (i === 0) {
        positionX[i] = 0;
      } else {
        const colWitdh = item.width || defaultWidth;
        positionX[i] = positionX[i - 1] + colWitdh;
      }
    });

    source.map((_item, i) => {
      if (i === 0) {
        positionY[i] = 0;
      } else {
        const rowHeight = defaultHeight;
        positionY[i] = positionY[i - 1] + rowHeight;
      }
    });
  };

  const getTotalWidth = () => {
    return column.length * defaultWidth;
  };

  const getTotalHeight = () => {
    return source.length * defaultHeight;
  };

  const getViewportSize = () => {
    if (vWidth === 0 && vHeight === 0) {
      vWidth = viewportElement.getBoundingClientRect().width;
      vHeight = viewportElement.getBoundingClientRect().height;
    }
    return {
      vWidth: vWidth,
      vHeight: vHeight,
    };
  };

  const getViewportRange = (scrollX: number, scrollY: number) => {
    let startX: number, endX: number, startY: number, endY: number;
    const { vWidth, vHeight } = getViewportSize();
    startX = Math.max(0, positionX.findIndex(i => scrollX <= i) - 1);
    endX = clamp(startX, startX + Math.floor(vWidth / defaultWidth) + 2, column.length - 1);
    startY = Math.max(0, positionY.findIndex(i => scrollY <= i) - 1);
    endY = clamp(startY, startY + Math.floor(vHeight / defaultHeight) + 1, source.length - 1);
    return { startX, endX, startY, endY };
  };

  const getViewportData = (scrollX: number, scrollY: number) => {
    const { startX, endX, startY, endY } = getViewportRange(scrollX, scrollY);
    const rowsData: RowData[] = [];
    const cellsData: CellData[] = [];
    for (let i = startY; i <= endY; i++) {
      const rows: RowData = {
        rows: i,
        position: {
          offsetY: positionY[i],
          height: defaultHeight,
        },
      };

      for (let j = startX; j <= endX; j++) {
        const cellData: CellData = {
          rows: i,
          cols: j,
          position: {
            offsetX: positionX[j],
            offsetY: positionY[i],
            width: defaultWidth,
            height: defaultHeight,
          },
          data: source[i][column[j].prop],
        };
        cellsData.push(cellData);
      }
      rowsData.push(rows);
    }
    return { rowsData, cellsData };
  };

  const getViewportHeader = (scrollX: number, scrollY: number) => {
    const { startX, endX } = getViewportRange(scrollX, scrollY);
    const headCells: CellData[] = [];
    for (let i = startX; i <= endX; i++) {
      const cellData: CellData = {
        position: {
          offsetX: positionX[i],
          offsetY: 0,
          width: defaultWidth,
          height: defaultHeight,
        },
        rows: 0,
        cols: i,
        data: column[i].name,
      };
      headCells.push(cellData);
    }
    return headCells;
  };

  const getViewportHeaderHeight = () => {
    return defaultHeight * 1.3;
  };

  calcCellsPosition();

  return {
    getTotalWidth,
    getTotalHeight,
    getViewportData,
    getViewportHeader,
    getViewportHeaderHeight,
  };
};
