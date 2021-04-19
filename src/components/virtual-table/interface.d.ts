export type DimensionType = 'rows' | 'cols';

export interface CellPosition {
  offsetX: number;
  width: number;
  cols: number;
}

export interface RenderCell {
  position: CellPosition;
  data: any;
}

export interface RenderRows {
  rows: number;
  offsetY: number;
  height: number;
  cells: RenderCell[];
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
