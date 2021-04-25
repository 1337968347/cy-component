import { Component, Prop, State, Watch, Host, h } from '@stencil/core';
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
  handleViewportChange() {
    this.setData();
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

    return (
      <Host>
        {this.rowsData.map(rows => (
          <vitural-row
            class="rows"
            key="rows"
            style={{ transform: `translateY(${rows.position.offsetY}px)`, height: rows.position.height + 'px' }}
            cellsData={getRowData(rows.rows, this.cellsData)}
          />
        ))}
      </Host>
    );
  }
}
