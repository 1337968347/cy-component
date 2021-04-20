import { Component, Element, Prop, State, h, Host } from '@stencil/core';
import { createDataParse } from './parse';
import { CellData, DataParse, RowData } from './interface';
@Component({
  tag: 'cy-virtual-table',
  styleUrl: 'virtual-table.scss',
})
export class VirtualScroll {
  @Element() el: HTMLElement;
  @Prop() source: any[] = [];
  @Prop() columns: any[] = [];
  @State() scrollX: number = 0;
  @State() scrollY: number = 0;
  vituralParse: DataParse = null;

  componentWillLoad() {
    this.vituralParse = createDataParse({
      source: this.source,
      column: this.columns,
      defaultWidth: 180,
      defaultHeight: 40,
      rootEl: this.el,
    });
  }

  handleScroll(e: CustomEvent) {
    const { type, offset } = e.detail;
    switch (type) {
      case 'rows':
        this.scrollX = offset;
        break;

      case 'cols':
        this.scrollY = offset;
        break;
    }
  }

  render() {
    const renderHeader = () => {
      const headerCells: CellData[] = this.vituralParse.getViewportHeader(this.scrollX, this.scrollY);
      return (
        <div class="header-rows" slot="header" style={{ height: this.vituralParse.getViewportHeaderHeight() + 'px' }}>
          <div class="rows">
            {headerCells.map(row => {
              return renderCell(row);
            })}
          </div>
        </div>
      );
    };

    const renderContent = () => {
      const { rowsData, cellsData } = this.vituralParse.getViewportData(this.scrollX, this.scrollY);

      const getRowData = (rows: number, cellsData: CellData[]) => {
        return cellsData.filter(i => i.rows === rows);
      };

      return (
        <div slot="content">
          {rowsData.map(rows => (
            <div class="rows" style={{ transform: `translateY(${rows.position.offsetY}px)`, height: rows.position.height + 'px' }}>
              {getRowData(rows.rows, cellsData).map(row => {
                return renderCell(row);
              })}
            </div>
          ))}
        </div>
      );
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
      <Host>
        <div class="vitural-table">
          <cy-viewport-scroll
            onScrollChange={e => this.handleScroll(e)}
            contentHeight={this.vituralParse.getTotalHeight()}
            contentWidth={this.vituralParse.getTotalWidth()}>
            {renderHeader()}
            {renderContent()}
          </cy-viewport-scroll>
        </div>
      </Host>
    );
  }
}
