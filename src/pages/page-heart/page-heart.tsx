import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-heart',
  styleUrl: 'page-heart.scss',
})
export class PageHeart {
  render() {
    return (
      <div class="cy-page">
        <a class="github-link" target="_blank" href="https://1337968347.github.io/demo">
          <cy-icon name="github" />
        </a>
        <cy-content>
          <iframe src="https://1337968347.github.io/demo" frameborder="0"></iframe>
        </cy-content>
      </div>
    );
  }
}
