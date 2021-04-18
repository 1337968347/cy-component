import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'page-virtual',
  styleUrl: 'page-virtual.scss',
})
export class PageVirtual {
  @State() dataList: any[] = [];
  @State() columns: any[] = [
    {
      prop: 'name',
      name: 'First',
    },
    {
      prop: 'details',
      name: 'Second',
    },
  ];

  connectedCallback() {
    for (let i = 0; i < 10000; i++) {
      this.dataList.push({
        name: 'New item' + i,
        details: 'Item description' + i,
      });
    }
    this.dataList = [...this.dataList];
  }

  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">虚拟列表</h3>
        </cy-header>
        <cy-content>
          <cy-virtual-table source={this.dataList} columns={this.columns}></cy-virtual-table>
        </cy-content>
      </div>
    );
  }
}
