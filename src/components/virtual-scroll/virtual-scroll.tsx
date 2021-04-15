import { Component, Prop, h, Host } from '@stencil/core';
import { createVirtualScanner } from './util';

@Component({
  tag: 'cy-virtual-scroll',
  styleUrl: 'virtual-scroll.scss',
})
export class VirtualScroll {
  @Prop() items: any[] = [];
  @Prop() itemRenderFn: (cell: any, itemIndex: Number) => HTMLElement;
  vituralOper: any = null;

  componentDidLoad() {
    this.vituralOper = createVirtualScanner({ rowDatas: this.items, defaultHeight: 40 });
  }

  render() {
    return (
      <Host>
        <div class="vitural-viewport">
          {this.items.map((item, index) => {
            return this.itemRenderFn(item, index);
          })}
        </div>
      </Host>
    );
  }
}
