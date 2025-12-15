import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-pathtrace',
  styleUrl: 'page-pathtrace.scss',
})
export class PageVirtual {
  render() {
    return (
      <div class="cy-page">
        <a class="github-link" target="_blank" href="https://github.com/1337968347/raytrace/blob/pathTrace/src/assets/shader/raytrace.frag">
          <cy-icon name="github" />
          <span class="link-text">查看源码</span>
        </a>
        <cy-content>
          <iframe src="https://1337968347.github.io/raytrace/" frameborder="0"></iframe>
        </cy-content>
      </div>
    );
  }
}
