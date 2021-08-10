import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-datascreen',
  styleUrl: 'page-datascreen.scss',
})
export class PageDataScreen {
  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">数据可视化</h3>
          <a target="_blank"href="https://github.com/1337968347/DataScreen" slot="end">
            <cy-icon name="github" />
          </a>
        </cy-header>
        <cy-content>
            <div style={{"z-index": '3'}}>19年做的一个数据可视化的东西</div>
          <iframe src="https://1337968347.github.io/DataScreen/#/" frameborder="0"></iframe>
        </cy-content>
      </div>
    );
  }
}
