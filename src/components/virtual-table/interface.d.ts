export type DimensionType = 'rows' | 'cols';

export interface CellPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface RenderCellData {
  position: CellPosition;
  data: any;
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
