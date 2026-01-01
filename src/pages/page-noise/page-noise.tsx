import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-noise',
  styleUrl: 'page-noise.scss',
})
export class PageVirtual {
  render() {
    return (
      <div class="cy-page">
        <a class="github-link" target="_blank" href="https://github.com/1337968347/2d-noise">
          <cy-icon name="github" />
          <span class="link-text">查看源码</span>
        </a>
        <cy-content>
          <iframe src="/projects/2d-noise/index.html" frameborder="0"></iframe>
        </cy-content>
      </div>
    );
  }
}
