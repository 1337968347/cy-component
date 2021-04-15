import { Component, Element, Prop, h, Host } from '@stencil/core';
import { createVirtualScanner } from './util';

@Component({
  tag: 'cy-virtual-scroll',
  styleUrl: 'virtual-scroll.scss',
})
export class VirtualScroll {
  @Element() el: HTMLElement;
  @Prop() items: any[] = [];
  @Prop() itemRenderFn: (cell: any, itemIndex: Number) => HTMLElement;
  vituralOper: any = null;

  componentWillLoad() {
    this.vituralOper = createVirtualScanner({ rowDatas: this.items, defaultHeight: 40, rootEl: this.el });
  }

  componentDidLoad() {
  }

  render() {
    return (
      <Host>
        <div class="vitural-viewport">
          {this.items.map((item, index) => {
            return this.itemRenderFn(item, index);
          })}
        </div>
        <div class="vertical-scroll">
          <div
            style={{
              height: this.vituralOper.getTotalHeight() + 'px',
            }}></div>
        </div>
      </Host>
    );
  }
}
