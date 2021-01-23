import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-root',
})
export class PageRoot {
  render() {
    return (
      <cy-app>
        <page-home />
      </cy-app>
    );
  }
}
