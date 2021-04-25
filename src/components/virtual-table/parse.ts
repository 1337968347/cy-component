import { clamp } from '../../utils/helpers';
import { VituralOption, CellData, RowData } from './interface';
const PRERENDERCATCH = 5;
export const createDataParse = ({ sourceData = [], column = [], defaultWidth = 40, defaultHeight = 30, rootEl }: VituralOption) => {
  const viewportElement = rootEl;

  let source = [];
  let positionX = new Array(column.length);
  let positionY = new Array(source.length);
  let vWidth: number = 0;
  let vHeight: number = 0;

  const init = () => {
    setSource(sourceData);
    calcCellsPosition();
  };

  const setSource = (sourceF: any[]) => {
    source = [...sourceF];
    positionX = new Array(source.length);
  };

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

  const getViewportRangeX = (scrollX: number) => {
    let startX: number, endX: number;
    const { vWidth } = getViewportSize();
    startX = Math.max(0, positionX.findIndex(i => scrollX <= i) - PRERENDERCATCH);
    endX = clamp(startX, startX + Math.floor(vWidth / defaultWidth) + 2 * PRERENDERCATCH, column.length - 1);
    return { startX, endX };
  };

  const getViewportRangeY = (scrollY: number) => {
    let startY: number, endY: number;
    const { vHeight } = getViewportSize();
    startY = Math.max(0, positionY.findIndex(i => scrollY <= i) - PRERENDERCATCH);
    endY = clamp(startY, startY + Math.floor(vHeight / defaultHeight) + 2 * PRERENDERCATCH, source.length - 1);
    return { startY, endY };
  };

  const getViewportRange = (scrollX: number, scrollY: number) => {
    const { startX, endX } = getViewportRangeX(scrollX);
    const { startY, endY } = getViewportRangeY(scrollY);
    return { startX, endX, startY, endY };
  };

  const getViewportData = (startX: number, endX: number, startY: number, endY: number) => {
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

  const getViewportHeader = (startX: number, endX: number) => {
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

  init();

  return {
    setSource,

    getTotalWidth,
    getTotalHeight,
    getViewportRange,
    getViewportData,
    getViewportHeader,
    getViewportHeaderHeight,
  };
};
