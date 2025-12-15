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
        </a>
        <cy-content>
          <iframe src="https://1337968347.github.io/2d-noise" frameborder="0"></iframe>
        </cy-content>
      </div>
    );
  }
}
