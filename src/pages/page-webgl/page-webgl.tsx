import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-webgl',
  styleUrl: 'page-webgl.scss',
})
export class PageVirtual {
  render() {
    return (
      <div class="cy-page">
        <a class="github-link" target="_blank" href="https://github.com/1337968347/SimpleRenderer">
          <cy-icon name="github" />
          <span class="link-text">查看源码</span>
        </a>
        <cy-content>
          <iframe src="/projects/SimpleRenderer/index.html" frameborder="0"></iframe>
        </cy-content>
      </div>
    );
  }
}
