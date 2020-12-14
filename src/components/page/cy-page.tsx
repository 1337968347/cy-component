import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'cy-page',
  styleUrl: 'cy-page.scss',
})
export class CyPage {
  render() {
    return (
      <Host class="cy-page">
        <slot />
      </Host>
    );
  }
}
