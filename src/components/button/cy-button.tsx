import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'cy-button',
  styleUrl: 'cy-button.scss',
  shadow: true,
})
export class CyButton {
  @Prop() color: string = '';
  @Prop() expend: 'default' | 'full' | 'block' = 'default';
  render() {
    return (
      <Host
        class={{
          [`cy-color-${this.color}`]: true,
          ['button-full']: this.expend === 'full',
          ['button-block']: this.expend === 'block',
          activatable: true,
        }}
      >
        <button class="button-native">
          <slot />
        </button>
        <cy-ripple />
      </Host>
    );
  }
}
