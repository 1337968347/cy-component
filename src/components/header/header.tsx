import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'cy-header',
  styleUrl: 'header.scss',
  shadow: true,
})
export class header {
  render() {
    return (
      <Host>
        <div class="btn-box">
          <slot name="start" />
        </div>
        <div class="container">
          <slot />
        </div>
        <div class="btn-box">
          <slot name="end" />
        </div>
      </Host>
    );
  }
}
