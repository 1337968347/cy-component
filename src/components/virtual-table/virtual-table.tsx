import { Component, Element, Prop, State, h, Host } from '@stencil/core';
import { createDataParse } from './parse';

import { CellData } from './interface';

@Component({
  tag: 'cy-virtual-table',
  styleUrl: 'virtual-table.scss',
})
export class VirtualScroll {
  @Element() el: HTMLElement;
  @Prop() source: any[] = [];
  @Prop() columns: any[] = [];
  @State() startX: number = 0;
  @State() endX: number = 0;
  @State() startY: number = 0;
  @State() endY: number = 0;
  scrollX: number = 0;
  scrollY: number = 0;
  vituralParse = null;

  componentWillLoad() {
    this.vituralParse = createDataParse({
      sourceData: this.source,
      column: this.columns,
      defaultWidth: 100,
      defaultHeight: 42,
      rootEl: this.el,
    });
  }

  componentDidLoad() {
    this.updateViewPort();
  }

  handleScroll(e: CustomEvent) {
    const { dimension, coordinate } = e.detail;
    switch (dimension) {
      case 'rows':
        this.scrollX = coordinate;
        break;

      case 'cols':
        this.scrollY = coordinate;
        break;
    }
    this.updateViewPort();
  }

  updateViewPort() {
    const { startX, endX, startY, endY } = this.vituralParse.getViewportRange(this.scrollX, this.scrollY);
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }

  render() {
    const renderHeader = () => {
      const headerCells: CellData[] = this.vituralParse.getViewportHeader(this.startX, this.endX);
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
          {this.startX !== this.endX && this.startY !== this.endY ? (
            <cy-viewport-scroll
              onScrollChange={e => this.handleScroll(e)}
              contentHeight={this.vituralParse.getTotalHeight()}
              contentWidth={this.vituralParse.getTotalWidth()}>
              {renderHeader()}
              <cy-virtual-data
                slot="content"
                vituralParse={this.vituralParse}
                viewPortRange={{ startX: this.startX, startY: this.startY, endX: this.endX, endY: this.endY }}
              />
            </cy-viewport-scroll>
          ) : null}
        </div>
      </Host>
    );
  }
}
