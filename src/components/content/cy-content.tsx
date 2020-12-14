import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'cy-content',
  styleUrl: 'cy-content.scss',
})
export class CyContent {
  render() {
    return (
      <Host class="cy-content">
        <main class="inner-scroll overscroll">
          <slot />
        </main>
        <slot name="fixed"></slot>
      </Host>
    );
  }
}
