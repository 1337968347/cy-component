import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'page-virtual',
  styleUrl: 'page-virtual.scss',
})
export class PageVirtual {
  @State() dataList: any[] = [];
  @State() columns: any[] = [];

  connectedCallback() {
    for (let i = 0; i < 1000; i++) {
      this.columns.push({
        prop: 'details' + i,
        name: 'name' + i,
      });
    }
    this.columns = [...this.columns];
    for (let i = 0; i < 3000; i++) {
      const rows = {};
      this.columns.map(column => {
        rows[column.prop] = column.name + ' - ' + i;
      });
      this.dataList.push(rows);
    }

    this.dataList = [...this.dataList];
  }

  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">虚拟表格</h3>
        </cy-header>
        <cy-content>
          <cy-virtual-table source={this.dataList} columns={this.columns}></cy-virtual-table>
        </cy-content>
      </div>
    );
  }
}
