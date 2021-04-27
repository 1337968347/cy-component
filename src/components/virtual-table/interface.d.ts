export * from './scroll';
export type DimensionType = 'rows' | 'cols';

export interface DataParse {
  getTotalWidth: () => number;
  getTotalHeight: () => number;
  getViewportRange: (
    scrollX: number,
    scrollY: number,
  ) => {
    startX: number;
    endX: number;
    startY: number;
    endY: number;
  };
  getViewportData: (
    startX: number,
    endX: number,
    startY: number,
    endY: number,
  ) => {
    rowsData: RowData[];
    cellsData: CellData[];
  };
  getViewportHeader: (startX: number, endX: number) => CellData[];
  getViewportHeaderHeight: () => number;
}

export interface CellPosition extends RowPosition {
  offsetX: number;
  width: number;
}

export interface CellData extends RowData {
  position: CellPosition;
  rows: number;
  cols: number;
  data: any;
}

export interface RowPosition {
  offsetY: number;
  height: number;
}
export interface RowData {
  rows: number;
  position: RowPosition;
}

export interface ColumnOption {
  prop: string;
  name: string;
  width?: number;
}

export interface VituralOption {
  sourceData: any[];
  column: ColumnOption[];
  defaultWidth: number;
  defaultHeight: number;
  rootEl: HTMLElement;
}

export type ViewPortRange = ViewPortRangeH & ViewPortRangeV;

export interface ViewPortRangeH {
  startX: number;
  endX: number;
}

export interface ViewPortRangeV {
  startY: number;
  endY: number;
}
