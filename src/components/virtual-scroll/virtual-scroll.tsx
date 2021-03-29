import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'cy-virtual-scroll',
  styleUrl: 'virtual-scroll.scss',
})
export class VirtualScroll {
  @Prop() items: any[] = [];
  @Prop() itemRenderFn: (cell: any, itemIndex: Number) => HTMLElement;

  render() {
    return (
      <Host>
        {this.items.map((item, index) => {
          return this.itemRenderFn(item, index);
        })}
      </Host>
    );
  }
}
