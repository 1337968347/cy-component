import { Component, Element, Prop, State, h, Host } from '@stencil/core';
import { createDataParse } from './parse';
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
  vituralParse: any = null;

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
    const renderCell = item => {
      const { top, left, width, height } = item.position;
      return (
        <div class="table-cell" style={{ width: width + 'px', height: height + 'px', left: left + 'px', top: top + 'px' }}>
          {item.data}
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
            <div slot="content">
              {this.vituralParse.getViewportData(this.scrollX, this.scrollY).map(rowsData => (
                <div class="table-rows">
                  {rowsData.map(row => {
                    return renderCell(row);
                  })}
                </div>
              ))}
            </div>
          </cy-viewport-scroll>
        </div>
      </Host>
    );
  }
}
