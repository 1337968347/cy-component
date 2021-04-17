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

export interface VituralOption {
  rowDatas: any[];
  defaultHeight: number;
  rootEl: HTMLElement;
}
