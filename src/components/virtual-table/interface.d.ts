export type DimensionType = 'rows' | 'cols';

export interface DataParse {
  getTotalWidth: () => number;
  getTotalHeight: () => number;
  getViewportData: (scrollX: number, scrollY: number) => {
      rowsData: RowData[];
      cellsData: CellData[];
  };
  getViewportHeader: (scrollX: number, scrollY: number) => CellData[];
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
  source: any[];
  column: ColumnOption[];
  defaultWidth: number;
  defaultHeight: number;
  rootEl: HTMLElement;
}
