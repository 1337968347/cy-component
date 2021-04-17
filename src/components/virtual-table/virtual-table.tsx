import { Component, Element, Prop, State, h, Host } from '@stencil/core';
import { createDataParse } from './data';

@Component({
  tag: 'cy-virtual-table',
  styleUrl: 'virtual-table.scss',
})
export class VirtualScroll {
  @Element() el: HTMLElement;
  @Prop() items: any[] = [];
  @Prop() itemRenderFn: (cell: any, itemIndex: Number) => HTMLElement;
  @State() scrollX: number = 0;
  @State() scrollY: number = 0;
  vituralParse: any = null;

  componentWillLoad() {
    this.vituralParse = createDataParse({ rowDatas: this.items, defaultHeight: 40, rootEl: this.el });
  }

  componentDidLoad() {}

  handleScroll(e: CustomEvent) {
    console.log(e.detail);
    this.scrollY = e.detail;
  }

  render() {
    return (
      <Host>
        <div class="vitural-table">
          <cy-viewport-scroll onScrollChange={e => this.handleScroll(e)} contentHeight={this.vituralParse.getTotalHeight()}>
            {this.items.map((item, index) => {
              return this.itemRenderFn(item, index);
            })}
          </cy-viewport-scroll>

          <div class="vertical-scroll">
            <div
              style={{
                width: '1px',
                height: this.vituralParse.getTotalHeight() + 'px',
              }}></div>
          </div>
        </div>
      </Host>
    );
  }
}
