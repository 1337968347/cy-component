import { clamp } from '../../utils/helpers';
import { VituralOption, RenderCellData } from './interface';

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

    source.map((item, i) => {
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
    startX = positionX.findIndex(i => scrollX <= i);
    endX = clamp(startX, startX + Math.floor(vWidth / defaultWidth) + 1, column.length - 1);
    startY = positionY.findIndex(i => scrollY <= i);
    endY = clamp(startY, startY + Math.floor(vHeight / defaultHeight) + 1, source.length - 1);
    return { startX, endX, startY, endY };
  };

  const getViewportData = (scrollX: number, scrollY: number) => {
    const { startX, endX, startY, endY } = getViewportRange(scrollX, scrollY);
    const renderData: RenderCellData[][] = [];
    for (let i = startY; i <= endY; i++) {
      const rowData: RenderCellData[] = [];

      for (let j = startX; j <= endX; j++) {
        const cRenderData: RenderCellData = {
          position: {
            top: positionY[i],
            left: positionX[j],
            width: defaultWidth,
            height: defaultHeight,
          },
          data: source[i][column[j].prop],
        };
        rowData.push(cRenderData);
      }
      renderData.push(rowData);
    }
    return renderData;
  };

  calcCellsPosition();

  return {
    getTotalWidth,
    getTotalHeight,
    getViewportData,
  };
};
