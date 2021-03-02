import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'cy-spinner',
  styleUrl: 'spinner.scss',
  shadow: true,
})
export class spinner {
  @Prop() color: string = '';

  render() {
    return (
      <Host
        class={{
          [`cy-color-${this.color}`]: !!this.color,
        }}
      >
        <svg version="1.1" viewBox="24 24 48 48">
          <circle cx="48" cy="48" r="20" stroke-width="5.6" fill="transparent" style={{ stroke: 'var(--cy-color-base)' }} />
        </svg>
      </Host>
    );
  }
}
