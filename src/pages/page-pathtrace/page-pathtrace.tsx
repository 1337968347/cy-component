import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-pathtrace',
  styleUrl: 'page-pathtrace.scss',
})
export class PageVirtual {
  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">路径追踪（待补充）</h3>
          <a target="_blank" href="https://github.com/1337968347/raytrace/blob/pathTrace/src/assets/shader/raytrace.frag" slot="end">
            <cy-icon name="github" />
          </a>
        </cy-header>
        <cy-content>
          <iframe src="https://1337968347.github.io/raytrace/" frameborder="0"></iframe>
        </cy-content>
      </div>
    );
  }
}
