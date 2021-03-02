import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'cy-header',
  styleUrl: 'header.scss',
  shadow: true,
})
export class header {
  @Prop() color: string = '';

  render() {
    return (
      <Host
        class={{
          [`cy-color-${this.color}`]: !!this.color,
        }}
      >
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
