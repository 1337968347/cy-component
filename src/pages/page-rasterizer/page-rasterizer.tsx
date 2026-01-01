import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-rasterizer',
  styleUrl: 'page-rasterizer.scss',
})
export class PageRasterizer {
  render() {
    return (
      <div class="cy-page">
        <a class="github-link" target="_blank" href="https://github.com/1337968347/tinyrenderer">
          <cy-icon name="github" />
          <span class="link-text">查看源码</span>
        </a>
        <cy-content>
          <iframe src="/projects/tinyrenderer/index.html" frameborder="0"></iframe>
        </cy-content>
      </div>
    );
  }
}
