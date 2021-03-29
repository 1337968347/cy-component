import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'page-virtual',
  styleUrl: 'page-virtual.scss',
})
export class PageVirtual {
  @State() dataList: Number[] = [];

  connectedCallback() {
    for (let i = 0; i < 100; i++) {
      this.dataList.push(i);
    }
    this.dataList = [...this.dataList];
  }

  render() {
    const renderItem = item => <cy-item line>{item}</cy-item>;
    return (
      <div class="cy-page">
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">虚拟列表</h3>
        </cy-header>
        <cy-content>
          <cy-virtual-scroll items={this.dataList} itemRenderFn={renderItem.bind(this)}></cy-virtual-scroll>
        </cy-content>
      </div>
    );
  }
}
