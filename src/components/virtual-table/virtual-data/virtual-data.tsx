import { Component, Prop, State, Watch, h } from '@stencil/core';
import { createDiff } from '../diff';
import { CellData, DataParse, RowData, ViewPortRange } from '../interface';

@Component({
  tag: 'cy-virtual-data',
  styleUrl: 'virtual-data.scss',
})
export class VirtualData {
  @Prop() vituralParse: DataParse;
  @Prop() viewPortRange: ViewPortRange;
  @Watch('viewPortRange')
  handleViewportChange(newViewPortRange: ViewPortRange) {
    if (JSON.stringify(newViewPortRange) !== JSON.stringify(this.viewPortRange)) {
      this.setData();
    }
  }
  @State() rowsData: RowData[] = [];
  @State() cellsData: CellData[] = [];

  rowsDiff = createDiff<RowData>();

  componentWillLoad() {
    this.setData();
  }

  setData() {
    const { rowsData, cellsData } = this.vituralParse.getViewportData(
      this.viewPortRange.startX,
      this.viewPortRange.endX,
      this.viewPortRange.startY,
      this.viewPortRange.endY,
    );
    this.cellsData = cellsData;
    this.rowsData = this.rowsDiff.diff(rowsData, 'rows');
  }

  render() {
    const getRowData = (rows: number, cellsData: CellData[]) => {
      return cellsData.filter(i => i.rows === rows);
    };

    const renderCell = (cell: CellData) => {
      const { offsetX, width } = cell.position;
      return (
        <div class="table-cell" style={{ width: width + 'px', transform: `translateX(${offsetX}px)` }}>
          {cell.data}
        </div>
      );
    };
    return (
      <div>
        {this.rowsData.map(rows => (
          <div class="rows" key="rows" style={{ transform: `translateY(${rows.position.offsetY}px)`, height: rows.position.height + 'px' }}>
            {getRowData(rows.rows, this.cellsData).map(row => {
              return renderCell(row);
            })}
          </div>
        ))}
      </div>
    );
  }
}
