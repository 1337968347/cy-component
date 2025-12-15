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
        </a>
        <cy-content>
          <iframe src="https://1337968347.github.io/SimpleRenderer" frameborder="0"></iframe>
        </cy-content>
      </div>
    );
  }
}
