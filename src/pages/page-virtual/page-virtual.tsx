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
        name: i,
      });
    }
    this.columns = [...this.columns];
    for (let i = 0; i < 3000; i++) {
      const rows = {};
      this.columns.map(column => {
        rows[column.prop] = i + ' - ' + column.name;
      });
      this.dataList.push(rows);
    }

    this.dataList = [...this.dataList];
  }

  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <h3 class="cy-title">虚拟表格</h3>
          <div slot="end">
            <a target="_blank" href="https://github.com/1337968347/cy-component/tree/master/src/components/virtual-table">
              <cy-icon name="github" />
            </a>
          </div>
        </cy-header>
        <cy-content>
          <div class="container">
            <cy-virtual-table source={this.dataList} columns={this.columns}></cy-virtual-table>
          </div>
        </cy-content>
      </div>
    );
  }
}
