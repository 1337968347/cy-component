import { clamp } from '../../utils/helpers';
import { VituralOption, RenderCell, RenderRows } from './interface';

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
    const renderData: RenderRows[] = [];
    for (let i = startY; i <= endY; i++) {
      const rowData = [];
      const rows: RenderRows = {
        rows: i,
        offsetY: positionY[i],
        height: defaultHeight,
        cells: rowData,
      };

      for (let j = startX; j <= endX; j++) {
        const cellData: RenderCell = {
          position: {
            cols: j,
            offsetX: positionX[j],
            width: defaultWidth,
          },
          data: source[i][column[j].prop],
        };
        rowData.push(cellData);
      }
      renderData.push(rows);
    }
    return renderData;
  };

  const getViewportHeader = (scrollX: number, scrollY: number) => {
    const { startX, endX } = getViewportRange(scrollX, scrollY);
    console.log(startX, endX);
    return [];
  };

  calcCellsPosition();

  return {
    getTotalWidth,
    getTotalHeight,
    getViewportData,
    getViewportHeader,
  };
};
