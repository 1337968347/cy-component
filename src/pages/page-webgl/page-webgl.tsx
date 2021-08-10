import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-webgl',
  styleUrl: 'page-webgl.scss',
})
export class PageVirtual {
  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">webGL</h3>
          <a target="_blank"href="https://github.com/1337968347/SimpleRenderer" slot="end">
            <cy-icon name="github" />
          </a>
        </cy-header>
        <cy-content>
          WASD移动, 鼠标点击控制方向
          <iframe src="https://1337968347.github.io/SimpleRenderer" frameborder="0"></iframe>
        </cy-content>
      </div>
    );
  }
}
