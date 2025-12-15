import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-datascreen',
  styleUrl: 'page-datascreen.scss',
})
export class PageDataScreen {
  render() {
    return (
      <div class="cy-page">
        <a class="github-link" target="_blank" href="https://github.com/1337968347/DataScreen">
          <cy-icon name="github" />
        </a>
        <cy-content>
          <iframe src="https://1337968347.github.io/DataScreen/#/" frameborder="0"></iframe>
        </cy-content>
      </div>
    );
  }
}
